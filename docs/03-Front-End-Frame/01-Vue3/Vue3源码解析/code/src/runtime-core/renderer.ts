import { Fragment, Text } from "./vnode";
import { ShapeFlags } from "../share/shapeFlags";
import { createComponentInstance, setupComponent } from "./component";
import { createAppApi } from "./createApp";
export function createRenderer({
  createElement: hostCreateElement,
  patchProp: hostPatchProp,
  insert: hostInsert,
}) {
  function render(rootVnode, rootContainer) {
    patch(rootVnode, rootContainer, null);
  }

  function patch(vnode, container, parent) {
    if (vnode.type == Fragment) {
      mountChild(vnode.children, container, parent);
    } else if (vnode.type == Text) {
      processText(vnode.children, container);
    } else if (vnode.shapeFlags & ShapeFlags.IS_COMPONENT) {
      processComponent(vnode, container, parent);
    } else if (vnode.shapeFlags & ShapeFlags.IS_ELEMENT) {
      processElement(vnode, container, parent);
    }
  }

  function processComponent(vnode, container, parent) {
    mountComponent(vnode, container, parent);
  }

  function mountComponent(vnode, container, parent) {
    const instance = createComponentInstance(vnode, parent);
    setupComponent(instance);
    setupRenderEffect(instance, container);
  }

  function setupRenderEffect(instance, container) {
    const { render } = instance;
    const subTree = render.call(instance.proxy);
    patch(subTree, container, instance);
  }

  function processElement(vnode, container, parent) {
    mountElement(vnode, container, parent);
  }

  function mountElement(vnode, container, parent) {
    const { type, props, children } = vnode;
    const el = hostCreateElement(type);

    hostPatchProp(el, props);
    if (vnode.shapeFlags & ShapeFlags.IS_CHILD_TEXT) {
      el.textContent = children;
    } else if (vnode.shapeFlags & ShapeFlags.IS_CHILD_ARR) {
      mountChild(children, el, parent);
    }
    hostInsert(el, container);
  }

  function mountChild(children, container, parent) {
    children.map((item) => {
      patch(item, container, parent);
    });
  }

  function processText(text, container) {
    mountText(text, container);
  }

  function mountText(text, container) {
    const textNode = document.createTextNode(text);
    container.append(textNode);
  }

  return {
    createApp: createAppApi(render),
  };
}
