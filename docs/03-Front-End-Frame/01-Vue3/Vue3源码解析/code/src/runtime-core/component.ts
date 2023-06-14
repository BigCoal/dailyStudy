import { shallowReadonly } from "../reactive/reactive";
import { emit } from "./componentEmits";
import { initProps } from "./componentProps";
import { PublicInstanceProxyHandlers } from "./componentPublicInstance";
import { initSlots } from "./componentSlots";
let globalInstance;

export function createComponentInstance(vnode, parent) {
  return {
    el: null,
    vnode,
    type: vnode.type,
    isMounted: false,
    parent,
    provides: parent ? parent.provides : {},
    setupState: {},
    proxy: {},
    props: {},
    slots: {},
    render: () => {},
  };
}

export function setupComponent(instance) {
  initProps(instance, instance.vnode.props);
  initSlots(instance, instance.vnode.children);
  PublicInstanceProxyHandlers(instance);
  setupStateFulComponent(instance);
}

function setupStateFulComponent(instance) {
  const { setup } = instance.type;
  globalInstance = instance;
  const state = setup(shallowReadonly(instance.props), {
    emit: emit.bind(null, instance),
  });
  instance.isMounted = true;
  globalInstance = null;
  if (state) {
    instance.setupState = state;
  }

  finishComponentSetup(instance);
}

function finishComponentSetup(instance) {
  const { render } = instance.type;
  if (render) {
    instance.render = render;
  }
}

export function getCurrentInstance() {
  return globalInstance;
}
