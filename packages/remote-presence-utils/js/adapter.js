"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
class Evented {
    constructor() {
        this._listeners = {};
    }
    on(event, listener) {
        if (!this._listeners[event])
            this._listeners[event] = [];
        if (this._listeners[event] && this._listeners[event].includes(listener))
            return this;
        this._listeners[event].push(listener);
        return this;
    }
    off(event, listener) {
        if (!this._listeners[event] || !this._listeners[event].includes(listener))
            return this;
        this._listeners[event].splice(this._listeners[event].indexOf(listener), 1);
        if (this._listeners[event].length === 0)
            delete this._listeners[event];
        return this;
    }
    emit(event, ...args) {
        if (!this._listeners[event] || this._listeners[event].length === 0)
            return false;
        this._listeners[event].forEach(listener => listener.apply(this, args));
        return true;
    }
}
exports.Evented = Evented;
class PresenceAdapter extends Evented {
    constructor() {
        super(...arguments);
        this.state = types_1.AdapterState.READY;
    }
}
exports.PresenceAdapter = PresenceAdapter;
