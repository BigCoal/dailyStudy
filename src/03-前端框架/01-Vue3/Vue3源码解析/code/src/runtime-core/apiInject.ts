import { getCurrentInstance } from "./component";

export function provide(name, value) {
  const instance = getCurrentInstance();
  if (instance) {
    if (!instance.isMounted) {
      instance.provides = Object.create(instance.provides);
    }
    instance.provides[name] = value;
  }
}

export function inject(name, defaultValue) {
  const instance = getCurrentInstance();
  if (instance) {
    const { parent } = instance;

    return (
      parent.provides[name] ||
      (typeof defaultValue == "function" ? defaultValue() : defaultValue)
    );
  }
}
