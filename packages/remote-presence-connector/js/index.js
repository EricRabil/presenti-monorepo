"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("./socket");
__export(require("./RemoteClient"));
__export(require("./PresenceStream"));
var RemoteClient_1 = require("./RemoteClient");
exports.default = RemoteClient_1.RemoteClient;
