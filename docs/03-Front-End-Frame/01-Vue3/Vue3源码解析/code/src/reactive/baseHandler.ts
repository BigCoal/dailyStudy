import { isObject } from "../share";
import { track, trigger } from "./effect";
import { reactive, ReactiveState, readonly } from "./reactive";

function createGetter(isReadOnly = false, shallow = false) {
  return (target, key) => {
    if (key == ReactiveState.IS_REACTIVE || key == ReactiveState.IS_READONLY) {
      return true;
    }

    let res = Reflect.get(target, key);

    if (isObject(res) && !shallow) {
      res = isReadOnly ? readonly(res) : reactive(res); //?
    }

    if (!isReadOnly) {
      track(target, key);
    }
    return res;
  };
}

function createSetter() {
  return (target, key, value) => {
    const res = Reflect.set(target, key, value);
    trigger(target, key);
    return res;
  };
}

export const baseHandler = {
  get: createGetter(),
  set: createSetter(),
};

export const readonlyHandler = {
  get: createGetter(true),
  set: () => {
    console.warn("只读属性");
    return true;
  },
};

export const shallowReadonlyHandler = {
  get: createGetter(true, true),
  set: () => {
    console.warn("只读属性");
    return true;
  },
};
