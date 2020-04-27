import { StateAdapter } from "../structs/state";
import { AdapterState, PresenceStruct } from "remote-presence-utils";
export interface BackgroundData {
    color: string;
    transition: number;
}
/**
 * This extension adds a color-rotation feature, implementing the "gradient" property in PresenceStructs
 *
 * It filters presences that opt-in to the gradient API, and then selects the presence with the highest-priority gradient
 *
 * There is typically an array of five colors, and it will be rotated at a pre-configured interval.
 * When the color shades change, an update is immediately sent with the first color from the new shade array, at a shorter transition time.
 */
export declare class BackgroundState extends StateAdapter {
    state: AdapterState;
    shades: {
        [scope: string]: string[];
    };
    rotationMap: {
        [scope: string]: number;
    };
    states: {
        [scope: string]: BackgroundData;
    };
    rotationTimers: {
        [scope: string]: ReturnType<typeof setInterval>;
    };
    /**
     * How long between color rotations
     */
    static readonly TRANSITION_TIME = 5000;
    static shadeCache: Record<string, string[]>;
    constructor();
    run(): Promise<void>;
    /**
     * Returns the background state of a given scope
     * @param scope scope to query background state for
     */
    data(scope: string, newSocket?: boolean): Promise<{
        gradient?: undefined;
    } | {
        gradient: {
            color: string;
            transition: number;
        };
    }>;
    /**
     * Returns data regarding the color shades for a given scope
     * @param scope scope to query for gradient shades
     */
    shadesForScope(scope: string): Promise<{
        shades: string[];
        currentShade: string;
        same: boolean;
    } | undefined>;
    /**
     * Re-schedules a color rotation, cancelling the previous one if scheduled
     * @param scope scope to re-schedule a rotation for
     */
    private resetRotationTimer;
    /**
     * Sets a timeout at a configured rate. Upon execution, the current color will increment and an update event will be emitted
     * @param scope scope to emit the update for
     */
    private runRotationTimer;
    /**
     * Finds the presence with the highest-priority gradient selection
     * @param scope scope to look for presences within
     */
    static gradientActivityForScope(scope: string): Promise<Partial<PresenceStruct>>;
    /**
     * Returns an array of dominant colors from a presence's image
     * @param presence presence to pull colors for
     */
    static shadeForPresence(presence: PresenceStruct | undefined): Promise<string[] | undefined>;
}