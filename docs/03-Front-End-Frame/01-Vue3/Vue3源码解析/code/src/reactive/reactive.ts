import {
  baseHandler,
  readonlyHandler,
  shallowReadonlyHandler,
} from "./baseHandler";

export enum ReactiveState {
  IS_REACTIVE = "__v_reactive",
  IS_READONLY = "__v_readonly",
}

export function reactive(obj) {
  return new Proxy(obj, baseHandler);
}

export function readonly(obj) {
  return new Proxy(obj, readonlyHandler);
}

export function shallowReadonly(obj) {
  return new Proxy(obj, shallowReadonlyHandler);
}

export function isReactive(obj) {
  return !!obj[ReactiveState.IS_REACTIVE];
}

export function isReadonly(obj) {
  return !!obj[ReactiveState.IS_READONLY];
}

export function isProxy(obj) {
  return isReactive(obj) || isReadonly(obj);
}
