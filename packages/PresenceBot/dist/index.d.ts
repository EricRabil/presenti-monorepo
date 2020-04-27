import "reflect-metadata";
import { TemplatedApp, WebSocket } from "uWebSockets.js";
import { MasterSupervisor } from "./supervisors/master-supervisor";
import { FIRST_PARTY_SCOPE } from "./structs/socket-api-base";
import { AdapterSupervisor } from "./supervisors/adapter-supervisor";
/**
 * Tracks global and scoped (per-user presence)
 */
export declare class PresenceService {
    private port;
    private userQuery;
    supervisor: MasterSupervisor;
    app: TemplatedApp;
    clients: Record<string, WebSocket[]>;
    idMap: Map<WebSocket, string>;
    scopedPayloads: Record<string, Record<string, any>>;
    globalPayload: Record<string, any>;
    adapterSupervisor: AdapterSupervisor;
    log: import("winston").Logger;
    constructor(port: number, userQuery: (token: string) => Promise<string | typeof FIRST_PARTY_SCOPE | null>);
    /**
     * Allocates resources to a websocket with a scope ID
     * @param id scope ID
     * @param socket socket
     */
    mountClient(id: string, socket: WebSocket): void;
    /**
     * Deallocates resources for a websocket
     * @param socket socket to deallocate
     */
    unmountClient(socket: WebSocket): void;
    /**
     * Registers all adapters with the supervisor
     */
    registerAdapters(): void;
    registerStates(): void;
    /**
     * Dispatches the latest presence state to the given selector
     * @param selector selector to dispatch to
     */
    dispatchToSelector(selector: string, refresh?: boolean): Promise<void>;
    payloadForSelector(selector: string, newSocket?: boolean, refresh?: boolean): Promise<Record<string, any>>;
    /**
     * Dispatches to a set of selectors, or all connected users
     * @param selector selectors to dispatch to
     */
    dispatch(selector?: string | string[], refresh?: boolean): Promise<Promise<void>[]>;
    /**
     * Starts the presence service
     */
    run(): Promise<void>;
}
