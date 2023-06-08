export function PublicInstanceProxyHandlers(instance) {
  instance.proxy = new Proxy(
    { _: instance },
    {
      get({ _: instance }, key) {
        if (key == "$slots") {
          return instance.slots;
        }
        if (Reflect.get(instance.setupState, key)) {
          return Reflect.get(instance.setupState, key);
        } else if (Reflect.get(instance.props, key)) {
          return Reflect.get(instance.props, key);
        }
      },
    }
  );
}
