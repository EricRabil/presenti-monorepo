import { ScopedPresenceAdapter } from "../structs/scoped-adapter";
import deepEqual from "deep-equal";
import { Evented, IEvented, PresenceStruct } from "remote-presence-utils";
import { log as logger } from "../utils";

export type PresenceList = Array<Partial<PresenceStruct>>;
export type PresenceDictionary = Record<string, PresenceList>;

export namespace PresenceMagic {
  const log = logger.child({ name: "PresenceMagic" });

  /**
   * Returns an array that will emit a changed event if the contents of it are changed.
   * @param evented event listener
   * @param scope 
   */
  export function createArrayProxy<T extends any[]>(changed: () => any): T {
    return new Proxy([] as any as T, {
      set(target: T, prop: keyof T, value: T extends (infer U)[] ? U : any, receiver: Function) {
        const oldExisted = !!target[prop];
        const result = Reflect.set(target, prop, value, receiver);
        if (!result) return result;

        if (!isNaN(+prop) && (oldExisted || value)) {
          // check for changes. if there was a change, emit it.
          if (!deepEqual(target[prop], value)) {
            changed();
          }
        }

        return result;
      },
      deleteProperty(target: T, prop: keyof T) {
        const oldExisted = !!target[prop];
        const result = Reflect.deleteProperty(target, prop);
        if (!result) return result;

        if (oldExisted) changed();

        return true;
      }
    });
  }

  /**
   * Returns a dictionary of presence arrays, and emits a changed event if the contents of it are changed.
   * @param evented 
   */
  export function createPresenceProxy<T extends Record<string, object>>(changed: (scope: string) => any): T {
    return new Proxy({} as any as T, {
      get(target: T, prop: keyof T, receiver: Function) {
        if (!target[prop]) {
          Reflect.set(target, prop, createArrayProxy(changed.bind(null, prop as string)));
        }

        return target[prop];
      },
      set(target: T, prop: keyof T, value: T extends Record<string, infer U> ? U : any, receiver: Function) {
        const oldExisted = !!target[prop];
        const result = Reflect.set(target, prop, value, receiver);
        if (!result) return result;

        if (Array.isArray(value) ? value.length === 0 : !value) return this.deleteProperty!(target as any, prop);

        if (oldExisted || value) {
          log.debug("Presence updated for scope", { scope: prop });
          changed(prop as string);
        }

        return result;
      },
      deleteProperty(target: T, prop: keyof T) {
        const result = Reflect.deleteProperty(target, prop);
        if (!result) return result;

        changed(prop as string);

        return true;
      }
    });
  }

  export function createPresenceDictCondenser(ledger: Record<string, PresenceDictionary>): Record<string, PresenceList> {
    return new Proxy(ledger, {
      get(target, prop, receiver) {
        return Object.values(target)
                     .map(p => p[prop as any])
                     .filter(p => !!p)
                     .reduce((a,c) => a.concat(c), [])
                     .filter(({id},i,a) => !id ? true : (a.findIndex(p => p.id === id) === i)) || [];
      },
      set(target, prop, value, receiver) {
        return false;
      },
      deleteProperty(target, prop) {
        return false;
      }
    }) as unknown as Record<string, PresenceList>;
  }
}