import { TemplatedApp } from "uWebSockets.js";
import Frontend from "./frontend";
import PresentiAPI from "./api/api";
import PresentiOAuthAPI from "./api/oauth-api";
export declare namespace WebRoutes {
    function initialize(app: TemplatedApp): {
        frontend: Frontend;
        api: PresentiAPI;
        oauthAPI: PresentiOAuthAPI;
    } | undefined;
}
