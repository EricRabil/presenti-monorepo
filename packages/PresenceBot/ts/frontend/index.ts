import fs from "fs-extra";
import path from "path";
import { TemplatedApp } from "uWebSockets.js";
import { handler as handlerWrapper } from "../adapters/RESTAdapter";
import { PBResponse, PBRequest, HTTPMethod, RequestHandler } from "./types";
import { wrapRequest, wrapResponse, runMiddleware } from "./utils";
import { SecurityKit } from "../security";
import { IdentityGuard, IdentityGuardFrontend, BodyParser, FirstPartyGuard } from "./middleware";
import { notFound } from "./canned-responses";
import { User } from "../database/entities";
import { UserLoader } from "./loaders";
import { CONFIG } from "../Configuration";

function Route(path: string, method: HTTPMethod, ...middleware: RequestHandler[]) {
  return function (target: any, property: string, descriptor: PropertyDescriptor) {
    Frontend.ROUTES.push({
      path,
      method,
      property,
      middleware
    });
  }
}

function Headers(...headers: string[]): any {
  return function (target: any, property: string, descriptor: PropertyDecorator) {
    const fn = target[property];
    fn.headers = headers;
  }
}

interface RouteData {
  path: string;
  method: HTTPMethod;
  property: string;
  middleware: RequestHandler[];
}

export class MiddlewareTimeoutError extends Error { }

export default class Frontend {
  static readonly VIEWS_DIRECTORY = path.resolve(__dirname, "..", "..", "frontend");
  static readonly STATIC_DIRECTORY = path.resolve(__dirname, "..", "..", "assets");
  static readonly PRESENTI_ASSET_DIRECTORY = path.resolve(__dirname, "..", "..", "node_modules", "presenti-renderer", "dist");
  static readonly ROUTES: RouteData[] = [];

  constructor(public readonly app: TemplatedApp) {
    this.loadRoutes();
  }

  loadRoutes() {
    Frontend.ROUTES.forEach(({ path, method, property, middleware }) => {
      const { [property]: handler } = this as any;
      middleware = middleware.concat(handler);
      this.app[method](path, Frontend.buildStack(middleware, handler.headers || []));
    });

    this.app.any('/*', Frontend.buildHandler((req, res) => {
      notFound(res);
    }));
  }

  static buildStack(middleware: RequestHandler[], headers: string[] = []) {
    const loaders = [
      UserLoader
    ];
    middleware = loaders.concat(middleware);
    return handlerWrapper(async (res, req) => {
      const nRes = wrapResponse(res, file => Frontend.resolve(file)), nReq = wrapRequest(req, nRes);

      await runMiddleware(nReq, nRes, middleware);
    }, ['content-type', 'cookie', 'authorization'].concat(headers || []))
  }

  static buildHandler(handler: RequestHandler, headers: string[] = []) {
    return this.buildStack([handler], headers);
  }

  @Route("/login", "get")
  loginView(req: PBRequest, res: PBResponse) {
    res.render('login', { signup: CONFIG.registration });
  }

  @Route("/signup", "get")
  signupView(req: PBRequest, res: PBResponse) {
    if (!CONFIG.registration) return notFound(res);
    res.render('signup');
  }

  @Route("/changepw", "get", IdentityGuardFrontend)
  changePassword(req: PBRequest, res: PBResponse) {
    res.render('changepw');
  }

  @Route("/changepw", "post", IdentityGuardFrontend, BodyParser)
  async changePasswordComplete(req: PBRequest, res: PBResponse) {
    const fail = (msg: string) => res.render('changepw', { error: msg });
    if (!req.body || !req.body.password || !req.body.newPassword) {
      return fail('Please fill out all required fields.');
    }

    const { password, newPassword } = req.body;
    if (!await res.user!.checkPassword(password)) {
      return fail('Please enter the correct old password.');
    }

    await res.user!.setPassword(newPassword);
    await res.user!.save();
    
    res.render('changepw', { message: 'Your password has been changed. All existing tokens have been invalidated.' });
  }

  @Route("/signup", "post", BodyParser)
  async signupComplete(req: PBRequest, res: PBResponse) {
    if (!CONFIG.registration) return notFound(res);
    const fail = (msg: string) => res.render('signup', { error: msg });
    if (!req.body || !req.body.id || !req.body.password) {
      return fail('Please fill out all required fields.');
    }

    const { id: userID, password } = req.body;
    let user = await User.findOne({ userID });
    if (user) return fail("A user with that ID already exists. Please select a different one.");

    user = await User.createUser(userID, password);
    await user.save();

    const token = await user.token(password);
    if (!token) return fail("Sorry, we couldn't finish logging you in.");

    res.setCookie('identity', token, { httpOnly: true });
    res.redirect('/');
  }

  @Route("/logout", "get")
  logout(req: PBRequest, res: PBResponse) {
    res.setCookie('identity', '', { maxAge: 0 });
    res.redirect('/');
  }

  @Route("/login", "post", BodyParser)
  async loginComplete(req: PBRequest, res: PBResponse) {
    const fail = () => res.render('login', { error: 'Invalid credentials.' });
    if (!req.body || !req.body.id || !req.body.password) {
      return fail();
    }

    const { id: userID, password } = req.body;
    const user = await User.findOne({ userID });
    if (!user) return fail();

    const token = await user.token(password);
    if (!token) return fail();

    res.setCookie('identity', token, { httpOnly: true });
    res.redirect('/');
  }

  @Route("/", "any")
  rootHandler(req: PBRequest, res: PBResponse) {
    if (!res.user) {
      res.redirect('/login');
      return;
    }
    res.redirect('/panel');
  }

  @Route("/panel", "get", IdentityGuardFrontend)
  panelView(req: PBRequest, res: PBResponse) {
    res.render('panel');
  }

  @Route("/panel/api/linkcode", "get", IdentityGuard)
  async generateLinkCode(req: PBRequest, res: PBResponse) {
    const code = await res.user!.linkCode();

    res.json({ code });
  }

  @Route("/panel/api/apikey", "get", IdentityGuard)
  async generateAPIKey(req: PBRequest, res: PBResponse) {
    const components = new URLSearchParams(req.getQuery());

    const key = await res.user!.apiKey();

    res.json({ key });
  }

  @Route("/p-assets/*", "get")
  async presentiAssets(req: PBRequest, res: PBResponse) {
    const relative = req.getUrl().substring(1).split('/').slice(1).join('/');
    const absolute = await Frontend.resolvePresenti(relative).catch(e => null);
    
    if (!absolute || !await fs.pathExists(absolute).catch(e => false) || !await fs.stat(absolute).then(stat => stat.isFile()).catch(e => false)) {
      return notFound(res);
    }

    await res.file(absolute);
  }

  @Route("/renderer", "get")
  renderer(req: PBRequest, res: PBResponse) {
    const params = new URLSearchParams(req.getQuery());
    const options = {
      noCSS: params.has('nocss'),
      scope: params.get('scope'),
      host: `ws${CONFIG.web.host}/presence/`
    }
    res.render('presenti', options);
  }

  @Route("/jwt", "get")
  async jwtTester(req: PBRequest, res: PBResponse) {
    const search = new URLSearchParams(req.getQuery());

    if (search.has('clear')) {
      res.clearCookie('identity');
      res.json({ bye: true });
      return;
    }

    if (req.cookie('identity')) {
      const id = await SecurityKit.validate(req.cookie('identity')!);
      res.json({ id });
      return;
    }

    const token = await SecurityKit.token("eric", "letmein");

    if (!token) {
      return res.json({ ok: false });
    }

    res.setCookie('identity', token, { httpOnly: true });
    res.json({ ok: true });
  }

  @Route("/assets/*", "get")
  async staticAsset(req: PBRequest, res: PBResponse) {
    const relative = req.getUrl().substring(1).split('/').slice(1).join('/');
    const absolute = Frontend.resolveStatic(relative);

    if (!absolute || !await fs.pathExists(absolute) || !await fs.stat(absolute).then(stat => stat.isFile())) {
      return notFound(res);
    }

    await res.file(absolute);
  }

  static resolve(file: string) {
    if (!file.endsWith('.pug')) file = `${file}.pug`;
    return path.resolve(Frontend.VIEWS_DIRECTORY, file);
  }

  static resolveStatic(file: string) {
    const resolved = path.resolve(Frontend.STATIC_DIRECTORY, file);
    if (!resolved.startsWith(Frontend.STATIC_DIRECTORY)) return null;
    return resolved;
  }

  static async resolvePresenti(file: string) {
    let resolved = path.resolve(Frontend.PRESENTI_ASSET_DIRECTORY, file);
    if (!resolved.startsWith(Frontend.PRESENTI_ASSET_DIRECTORY)) return null;
    let [ name, subdir ] = resolved.split('/').reverse();
    if (subdir !== 'js' && subdir !== 'css') return null;
    const contents = await fs.readdir(path.resolve(Frontend.PRESENTI_ASSET_DIRECTORY, subdir));
    const [ prefix ] = name.split('.');
    name = contents.find(c => c.split('.')[0] === prefix)!;
    if (!name) return null;
    return path.resolve(Frontend.PRESENTI_ASSET_DIRECTORY, subdir, name);
  }
}