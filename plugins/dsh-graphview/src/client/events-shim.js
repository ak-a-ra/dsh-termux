/**
 * Minimal EventEmitter for the browser bundle.
 *
 * sigma/graphology reach for node's `events` module; the dsh client module
 * loader has no platform seed for it, so the client build aliases `events`
 * to this shim instead of leaving `require("events")` unresolved.
 */
export class EventEmitter {
  constructor() {
    this.__listeners = new Map()
  }

  on(event, listener) {
    let set = this.__listeners.get(event)
    if (!set) {
      set = new Set()
      this.__listeners.set(event, set)
    }
    set.add(listener)
    return this
  }

  addListener(event, listener) {
    return this.on(event, listener)
  }

  prependListener(event, listener) {
    return this.on(event, listener)
  }

  once(event, listener) {
    const wrapped = (...args) => {
      this.off(event, wrapped)
      listener(...args)
    }
    wrapped.__original = listener
    return this.on(event, wrapped)
  }

  off(event, listener) {
    const set = this.__listeners.get(event)
    if (set) {
      for (const entry of Array.from(set)) {
        if (entry === listener || entry.__original === listener) set.delete(entry)
      }
      if (set.size === 0) this.__listeners.delete(event)
    }
    return this
  }

  removeListener(event, listener) {
    return this.off(event, listener)
  }

  removeAllListeners(event) {
    if (event === undefined) this.__listeners.clear()
    else this.__listeners.delete(event)
    return this
  }

  emit(event, ...args) {
    const set = this.__listeners.get(event)
    if (!set || set.size === 0) return false
    for (const listener of Array.from(set)) {
      try {
        listener(...args)
      } catch {
        /* a throwing listener must not break the other subscribers */
      }
    }
    return true
  }

  listeners(event) {
    const set = this.__listeners.get(event)
    return set ? Array.from(set, (entry) => entry.__original ?? entry) : []
  }

  listenerCount(event) {
    return this.__listeners.get(event)?.size ?? 0
  }

  eventNames() {
    return Array.from(this.__listeners.keys())
  }

  setMaxListeners() {
    return this
  }

  getMaxListeners() {
    return 0
  }
}

EventEmitter.EventEmitter = EventEmitter
EventEmitter.default = EventEmitter
export default EventEmitter
