/// <reference types="node" />
import { PresenceAdapter } from "./adapter";
import { EventEmitter } from "events";
import { Activity } from "discord.js";
import { TemplatedApp } from "uWebSockets.js";
export interface SupervisorUpdateEvent {
    $selector?: string;
}
export declare interface AdapterSupervisor {
    on(event: "updated", listener: (event: SupervisorUpdateEvent) => any): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
    emit(event: "updated", activities: SupervisorUpdateEvent): boolean;
    emit(event: string | symbol, ...args: any[]): boolean;
}
export declare class AdapterSupervisor extends EventEmitter {
    private app;
    adapters: PresenceAdapter[];
    constructor(app: TemplatedApp);
    register(adapter: PresenceAdapter): void;
    updated(id?: string): Promise<void>;
    initialize(): Promise<void[]>;
    scopedActivities(id: string): Promise<Array<Partial<Activity>>>;
    globalActivities(): Promise<Array<Partial<Activity>>>;
}
