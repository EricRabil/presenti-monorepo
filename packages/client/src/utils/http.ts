import { BaseClient, BaseClientOptions } from "./base-client";
import { APIError } from "@presenti/utils";

export type ParamsStruct = Record<string, string | number | boolean | any>;
export type BodyStruct = object;

/**
 * Represents request options for AJAXKit.
 * 
 * The body properties differ as the serialization is done when the request is actually made, meaning
 * implementations can simply call .post('/url', { body: { myobject } });
 */
export interface RequestOptions extends Omit<RequestInit, "body"> {
  params?: ParamsStruct;
  body?: BodyStruct;
  headers?: Record<string, string>;
  base?: string;
  port?: string;
  protocol?: string;
  noAPIInject?: boolean;
}

/**
 * Core functions for making AJAX requests
 */
export namespace AJAXKit {
  export function get(url: string, opts: RequestOptions = {}) {
    return fetchJSON(url, "get", opts);
  }

  export function post(url: string, opts: RequestOptions = {}) {
    return fetchJSON(url, "post", opts);
  }

  export function del(url: string, opts: RequestOptions = {}) {
    return fetchJSON(url, "delete", opts);
  }

  export function patch(url: string, opts: RequestOptions = {}) {
    return fetchJSON(url, "patch", opts);
  }

  export async function fetchJSON(url: string, method: string, { params, body, headers, base, port, protocol, noAPIInject, ...options }: RequestOptions = {}) {
    method = method.toUpperCase();
    const prefix = noAPIInject ? '' : url.startsWith('/api') ? '' : '/api';
    const urlComponents = new URL(`${prefix}${url.startsWith('/') ? '' : '/'}${url}`, base);
    if (port) {
      urlComponents.port = port;
    }
    if (protocol) {
      urlComponents.protocol = protocol;
    }

    if (params) {
      Object.entries(params).forEach(([ key, value ]) => (typeof value !== "undefined") && urlComponents.searchParams.set(key, value.toString()));
    }
    
    const fetchOptions: RequestInit = {
      method,
      headers: body ? {
        'Content-Type': 'application/json',
        ...headers
      } : headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
      ...options
    };

    const result = await fetch(urlComponents.toString(), fetchOptions).then(res => res.json());
    if (result.error) {
      throw APIError.from(result);
    }
    return result;
  }
}

type AJAXProtocol = typeof AJAXKit;

export interface AJAXClientOptions extends BaseClientOptions {
  ajax?: RequestOptions;
  authorizationToken?: string;
}

/**
 * Makes Presenti AJAX requests, and calls AJAXKit while mixing in any configured options
 */
export class AJAXClient extends BaseClient<AJAXClientOptions> implements AJAXProtocol {
  delete: AJAXClient["del"];

  constructor(options: AJAXClientOptions) {
    super(options);

    this.delete = this.del;
  }

  get(url: string, opts: RequestOptions = {}) {
    return this.fetchJSON(url, "get", opts);
  }

  post(url: string, opts: RequestOptions = {}) {
    return this.fetchJSON(url, "post", opts);
  }

  del(url: string, opts: RequestOptions = {}) {
    return this.fetchJSON(url, "delete", opts);
  }

  patch(url: string, opts: RequestOptions = {}) {
    return this.fetchJSON(url, "patch", opts);
  }

  put(url: string, opts: RequestOptions = {}) {
    return this.fetchJSON(url, "put", opts);
  }

  async fetchJSON(url: string, method: string, options: RequestOptions = {}) {
    const headers = options.headers ? { ...options.headers, ...this.mixinHeaders } : this.mixinHeaders;
    return AJAXKit.fetchJSON(url, method, { ...options, ...this.ajax, headers, base: this.baseURL });
  }

  /**
   * The base URL for making requests
   */
  get baseURL() {
    return `${this.secure ? 'https' : 'http'}://${this.host}`;
  }

  /**
   * Options to be mixed in when making any requests
   */
  get ajax() {
    return this.options.ajax || {};
  }

  set ajax(ajax) {
    this.options.ajax = ajax;
  }

  /**
   * Headers to be mixed in when making any requests
   */
  get mixinHeaders() {
    var headers: Record<string, string> = {};
    if (this.options.authorizationToken) headers.authorization = this.options.authorizationToken;
    if (this.ajax && this.ajax.headers) headers = { ...headers, ...this.ajax.headers };
    return headers;
  }
}