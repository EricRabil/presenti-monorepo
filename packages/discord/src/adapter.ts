import { AdapterState, Events, OAUTH_PLATFORM, PipeDirection, PresenceBuilder, PresenceDictionary, PresenceStruct, PresentiAPIClient, PresentiAPI } from "@presenti/utils";
import { Client, ClientApplication } from "discord.js";
import got from "got";
import Excludes from "./entity";
import { ScopedPresenceAdapter } from "@presenti/modules";
import logger from "@presenti/logging";
import { DiscordAdapterOptions } from "./types";

interface Tagged {
  id: string;
  name: string;
}

interface DiscordIconMap {
  id: string;
  name: string;
  icon: string;
  splash: string;
  overlay: boolean;
  overlayWarn: boolean;
  overlayCompatibilityHook: boolean;
  aliases: string[];
  publishers: Tagged[];
  developers: Tagged[];
  guildId: string | null;
  thirdPartySkus: Array<{ distributor: string, id: string, sku: string }>;
  executables: Array<{ name: string, os: string }>;
  hashes: any[];
  description: string;
  youtubeTrailerVideoId: string | null;
  eulaId: string | null;
  slug: string | null;
}

interface DiscordStorage {
  scopeBindings: {
    [scope: string]: string;
  };
  excludes: {
    [scope: string]: string[];
  };
  spotifyWhitelist: string[];
}

const DEFAULT_STORAGE: DiscordStorage = {
  scopeBindings: {},
  excludes: {},
  spotifyWhitelist: []
}

export class DiscordAdapter extends ScopedPresenceAdapter {
  client: Client;
  iconRegistry: Record<string, DiscordIconMap> = {};
  log = logger.child({ name: "DiscordAdapter" });
  clientData: ClientApplication;
  /** Map of <snowflake, scope> */
  pipeLedger: Record<string, string> = {};

  static configKey: string = "discord";
  private static _sharedAdapter: DiscordAdapter;

  static get sharedAdapter() {
    return this._sharedAdapter;
  }

  static set sharedAdapter(adapter) {
    if (this._sharedAdapter) throw new Error("Cannot re-declare shared adapter instance.");
    this._sharedAdapter = adapter;
  }

  constructor(public readonly options: DiscordAdapterOptions, private remoteClient: PresentiAPI) {
    super();
    DiscordAdapter.sharedAdapter = this;
  }

  state: AdapterState = AdapterState.READY;

  async run(): Promise<void> {
    this.log.debug("Connecting to Discord...");
    this.client = new Client();
    let ready = new Promise(resolve => this.client.once("ready", resolve));

    const data: DiscordIconMap[] = await got("https://gist.github.com/EricRabil/b8c959c0abfe0c5628c31ca85ac985dd/raw/").json();
    data.forEach(map => this.iconRegistry[map.id] = map);

    await this.reloadPipeLedger();
    this.log.info(`Loaded pipe ledger with ${Object.keys(this.pipeLedger).length} entry(s)`)
    await this.client.login(this.options.token);

    this.client.on("presenceUpdate", async (_, presence) => {
      const id = presence.user?.id || presence.member?.id || (presence as any)['userID'];
      if (!id) return;
      if (!this.pipeLedger[id]) return;
      this.emit("updated", this.pipeLedger[id]);
    });

    await ready;

    this.clientData = await this.client.fetchApplication();

    this.log.info("Connected to Discord.");

    this.state = AdapterState.RUNNING;
  }

  async reloadPipeLedger() {
    let pipes = await this.remoteClient.lookupLinksForPlatform(OAUTH_PLATFORM.DISCORD);
    if (!pipes) return;
    pipes = pipes.filter(pipe => pipe.pipeDirection === PipeDirection.PRESENTI || pipe.pipeDirection === PipeDirection.BIDIRECTIONAL);

    this.pipeLedger = pipes.reduce((acc, { platformID, scope }) => Object.assign(acc, { [platformID]: scope }), {});

    console.log(this.pipeLedger);
  }

  async discordSnowflakeForScope(scope: string) {
    const entry = Object.entries(this.pipeLedger).find(([, pipeScope]) => pipeScope === scope);
    return entry && entry[0] || null;
  }

  async discordPresences(scope: string) {
    const snowflake = await this.discordSnowflakeForScope(scope);
    if (!snowflake) return [];

    return this.client.users.resolve(snowflake)?.presence.activities;
  }

  async userExcludes(userUUID: string) {
    const excludes = await Excludes.findOne({ userUUID });

    return (excludes?.excludes || []).concat("spotify");
  }

  async activityForUser(scope: string): Promise<PresenceStruct[]> {
    const presences = await this.discordPresences(scope);
    const excludes = await this.userExcludes(scope);
    return presences?.filter(activity => !excludes.includes(activity.name.toLowerCase()))
      .map(activity => (
        new PresenceBuilder()
          .title(activity.name)
          .largeText(activity.details || activity.assets?.largeText!)
          .image((activity.assets?.largeImage || activity.assets?.smallImage) ? `https://cdn.discordapp.com/app-assets/${activity.applicationID}/${activity.assets?.largeImage || activity.assets?.smallImage}.png` : this.iconRegistry[activity.applicationID!]?.icon ? `https://cdn.discordapp.com/app-icons/${activity.applicationID}/${this.iconRegistry[activity.applicationID!].icon}.webp?size=256&keep_aspect_ratio=false` : null)
          .smallText(activity.state!)
          .start(activity.timestamps?.start?.getTime()!)
          .stop(activity.timestamps?.end?.getTime()!)
          .id(activity.applicationID)
          .presence
      )) || [];
  }

  /**
   * Returns all activities, useful for service initialization
   */
  async activities() {
    const presences: Record<string, PresenceStruct[]> = {};

    await Promise.all(Object.values(this.pipeLedger).map(async (scope) => presences[scope] = await this.activityForUser(scope)));

    return presences;
  }
}