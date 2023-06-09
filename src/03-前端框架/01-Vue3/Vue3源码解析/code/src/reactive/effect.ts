import { extend } from "../share";

let activeEffect;
let shouldTrack = false;

export class effectImpl {
  deps: Set<effectImpl>[] = [];
  onStop;
  active = true;
  constructor(private fn, private scheduler) {}
  run() {
    if (!this.active) {
      return this.fn();
    }
    activeEffect = this;
    shouldTrack = true;
    const res = this.fn();
    shouldTrack = false;
    return res;
  }
  stop() {
    if (this.active) {
      this.active = false;
      this.onStop && this.onStop();
      this.deps.map((keys) => keys.delete(this));
      this.deps.length = 0;
    }
  }
}

export function effect(fn, options?) {
  const effectCls = new effectImpl(fn, options?.scheduler);
  extend(effectCls, options);
  effectCls.run();
  const runner: any = effectCls.run.bind(effectCls);
  runner._effect = effectCls;
  return runner;
}
export function stop(runner) {
  runner._effect.stop();
}

const targetMap = new Map();

export function track(target, key) {
  if (!isTracking()) return;
  let targetObj = targetMap.get(target);
  if (!targetObj) {
    targetObj = new Map();
    targetMap.set(target, targetObj);
  }
  let keys = targetObj.get(key);
  if (!keys) {
    keys = new Set();
    targetObj.set(key, keys);
  }
  trackEffect(keys);
}

export function trackEffect(keys) {
  if (!keys.has(activeEffect)) {
    keys.add(activeEffect);
    activeEffect.deps.push(keys);
  }
}

export function trigger(target, key) {
  const targetObj = targetMap.get(target);
  const keys = targetObj.get(key);
  triggerEffect(keys);
}

export function triggerEffect(keys) {
  for (let effect of keys) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}

export function isTracking() {
  if (activeEffect && shouldTrack) {
    return true;
  }
}
