export function emit(instance, methodName, ...args) {
  const { props } = instance;
  const normalizeMethodName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  let name = `on${normalizeMethodName(methodName)}`;
  name = name.replace(/-(\w)/g, ($1) => {
    return $1.slice(1).toUpperCase();
  });
  props[name] && props[name](...args);
}
