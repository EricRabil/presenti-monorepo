import { PresenceAdapter, AdapterState, Presence, PresenceStruct } from "remote-presence-utils";
import { EventEmitter } from "events";
import { Activity } from "discord.js";
import { TemplatedApp } from "uWebSockets.js";
import { ScopedPresenceAdapter } from "../structs/scoped-adapter";
import { Supervisor } from "../structs/Supervisor";
import { PresentiKit, log } from "../utils";
import { PresenceDictionary, PresenceList } from "../utils/presence-magic";

export let SharedAdapterSupervisor: AdapterSupervisor;

/**
 * Data namespace for Presence Data
 */
export class AdapterSupervisor extends Supervisor<PresenceAdapter> {
  log = log.child({ name: "AdapterSupervisor" });

  constructor(private app: TemplatedApp) {
    super();
    SharedAdapterSupervisor = this;
  }

  async run() {
    await super.run();
  }

  scopedData(scope: string): Promise<{presences: Array<Partial<PresenceStruct>>}> {
    this.log.debug("Querying all adapters for presence data for scope", { scope });
    return <any>Promise.all(
      this.adapters.filter(adapter => (
        (adapter.state === AdapterState.RUNNING) && (adapter instanceof ScopedPresenceAdapter)
      )).map(adapter => (
        (adapter as ScopedPresenceAdapter).activityForUser(scope)
      ))
    ).then(activities => (
      activities.filter(activity => (
        !!activity
      )).map(activity => (
        Array.isArray(activity) ? activity : [activity]
      )).reduce((a, c) => a.concat(c), [])
    )).then(presences => ({ presences }))
  }

  async scopedDatas(): Promise<Record<string, {presences: PresenceList}>> {
    const activities = await Promise.all(this.adapters.filter(adapter => adapter instanceof ScopedPresenceAdapter).map((adapter) => (adapter as unknown as ScopedPresenceAdapter).activities()));
    return Object.entries(activities.reduce((acc, c) => {
      Object.entries(c).forEach(([scope, presences]) => {
        if (acc[scope]) acc[scope] = acc[scope].concat(presences);
        else acc[scope] = presences;
      });
      return acc;
    }, {})).reduce((acc, [scope, presences]) => Object.assign(acc, {[scope]: { presences }}), {} as Record<string, {presences: PresenceList}>);
  }

  globalData(): Promise<{presences: Array<Partial<PresenceStruct>>}> {
    return <any>Promise.all(
      this.adapters.filter(adapter => (
        adapter.state === AdapterState.RUNNING
      )).map(adapter => (
        !(adapter instanceof ScopedPresenceAdapter) ? adapter.activity() : []
      ))
    ).then(activities => (
      activities.filter(activity => (
        !!activity
      )).map(activity => (
        Array.isArray(activity) ? activity : [activity]
      )).reduce((a, c) => a.concat(c), [])
    ));
  }
}