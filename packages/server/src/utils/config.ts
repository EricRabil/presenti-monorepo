import fs from "fs-extra";
import path from "path";
import logger from "@presenti/logging";
import IORedis from "ioredis";

export interface ConfigurationStruct {
  port: number;
  registration: boolean;
  auth: {
    host: string;
    port: string;
  }
  discord: {
    clientID: string;
    clientSecret: string;
  } | null,
  web: {
    host: string;
    oauthSuccessRedirect: string;
    cookieDomain: string;
  };
  db: {
    host: string;
    port: number;
    name: string;
    username: string | null;
    password: string | null;
    cache?: any;
    logging?: boolean;
  };
  cache: IORedis.RedisOptions;
  elasticSearch?: import("@elastic/elasticsearch").ClientOptions;
  modules: Record<string, object>;
}

const DEFAULT_CONFIG: ConfigurationStruct = {
  port: 8138,
  registration: false,
  discord: null,
  auth: {
    host: process.env.AUTH_HOST || "http://127.0.0.1",
    port: process.env.AUTH_PORT || "8892"
  },
  web: {
    host: process.env.PUBLIC_HOST || "://localhost:8138",
    oauthSuccessRedirect: process.env.OAUTH_REDIRECT || "http://presenti.me",
    cookieDomain: process.env.COOKIE_DOMAIN || "presenti.me"
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT! || 5432,
    name: process.env.DB_NAME || 'presenti',
    username: process.env.DB_USERNAME || null,
    password: process.env.DB_PASSWORD || null,
    cache: process.env.REDIS_HOST ? {
      options: {
        host: process.env.REDIS_HOST
      }
    } : false,
    logging: false
  },
  cache: {
    host: "127.0.0.1",
    port: 6379
  },
  elasticSearch: {
    node: 'http://127.0.0.1:9200'
  },
  modules: {}
}

export const CONFIG_PATH = path.resolve(__dirname, "..", "..", "config.json");

export const CONFIG: ConfigurationStruct = fs.pathExistsSync(CONFIG_PATH) ? fs.readJsonSync(CONFIG_PATH) : (fs.writeJsonSync(CONFIG_PATH, DEFAULT_CONFIG, { spaces: 4 }), JSON.parse(JSON.stringify(DEFAULT_CONFIG)));
if (process.env.DB_HOST) CONFIG.db.host = process.env.DB_HOST;
if (process.env.DB_PORT) CONFIG.db.port = +process.env.DB_PORT;
if (process.env.DB_NAME) CONFIG.db.name = process.env.DB_NAME;
if (process.env.DB_USERNAME) CONFIG.db.username = process.env.DB_USERNAME;
if (process.env.DB_PASSWORD) CONFIG.db.password = process.env.DB_PASSWORD;
if (process.env.AUTH_HOST) CONFIG.auth.host = process.env.AUTH_HOST;
if (process.env.AUTH_PORT) CONFIG.auth.port = process.env.AUTH_PORT;
if (process.env.PUBLIC_HOST) CONFIG.web.host = process.env.PUBLIC_HOST;
if (process.env.OAUTH_REDIRECT) CONFIG.web.oauthSuccessRedirect = process.env.OAUTH_REDIRECT;
if (process.env.COOKIE_DOMAIN) CONFIG.web.cookieDomain = process.env.COOKIE_DOMAIN;
if (process.env.REDIS_HOST) {
  CONFIG.db.cache = {
    options: {
      host: process.env.REDIS_HOST
    }
  };
  CONFIG.cache = {
    host: process.env.REDIS_HOST
  }
}
if (process.env.ELASTIC_NODE) CONFIG.elasticSearch = {
  ...(CONFIG.elasticSearch || {}),
  node: process.env.ELASTIC_NODE
};

export const saveConfig = () => fs.writeJson(CONFIG_PATH, CONFIG, { spaces: 4 }).then(() => logger.info('Updated configuration file'));