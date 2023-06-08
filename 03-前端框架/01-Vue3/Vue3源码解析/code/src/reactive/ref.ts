import { isObject } from "../share/index";
import { isTracking, trackEffect, triggerEffect } from "./effect";
import { isProxy, reactive } from "./reactive";

class refImpl {
  constructor(public v) {}
  deps = new Set();
  __is_ref = true;
  get value() {
    if (isTracking()) {
      trackEffect(this.deps);
    }
    this.v = isObject(this.v) ? reactive(this.v) : this.v;
    return this.v;
  }
  set value(value) {
    if (isProxy(value) && this.v == value) {
      return;
    }
    if (this.v == value) return;

    this.v = isObject(this.v) ? reactive(this.v) : value;
    triggerEffect(this.deps);
  }
}

export function ref(v) {
  return new refImpl(v);
}

export function isRef(ref) {
  return !!ref.__is_ref;
}
export function unRef(ref) {
  return isRef(ref) ? ref.value : ref;
}

export function proxyRefs(obj) {
  return new Proxy(obj, {
    get(target, key) {
      return unRef(Reflect.get(target, key));
    },
    set(target, key, value) {
      if (isRef(Reflect.get(target, key)) && !isRef(value)) {
        Reflect.get(target, key).value = value;
      } else {
        Reflect.set(target, key, value);
      }
      return true;
    },
  });
}
