import { Presence, PresenceStruct } from "./types";

export interface PresenceTransport {
  presence(presence: Presence[]): Promise<any>;
}

export class PresenceBuilder {
  public presence: PresenceStruct = {
    title: null!,
    largeText: null,
    smallTexts: [],
    image: null,
    timestamps: {
      duration: null,
      position: null
    },
    gradient: {
      priority: null,
      enabled: false
    },
    isPaused: null,
    effective: Date.now()
  }

  toString() {
    return JSON.stringify(this.presence);
  }

  largeText(text: string, link?: string | null) {
    this.presence.largeText = { text, link };
    return this;
  }

  smallText(text: string, link?: string | null) {
    this.presence.smallTexts!.push({ text, link });
    return this;
  }

  image(src: string | null, link?: string | null) {
    this.presence.image = src ? { src, link } : null;
    return this;
  }

  paused(state: boolean) {
    this.presence.isPaused = state;
    return this;
  }

  gradient(setting: boolean, priority?: number | null) {
    this.presence.gradient = {
      enabled: setting,
      priority
    };
    return this;
  }

  title(title: string) {
    this.presence.title = title;
    return this;
  }
  
  duration(duration: number | null) {
    this.presence.timestamps!.duration = duration;
    return this;
  }

  position(position: number | null) {
    this.presence.timestamps!.position = position;
    return this;
  }
}