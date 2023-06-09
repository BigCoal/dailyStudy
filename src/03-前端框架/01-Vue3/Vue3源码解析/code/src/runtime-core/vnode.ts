import { isObject } from "../share/index";
import { ShapeFlags } from "../share/shapeFlags";
export const Text = Symbol("text");
export const Fragment = Symbol("Fragment");
export function createVnode(type, props = {}, children?) {
  let shapeFlags =
    typeof type == "string" ? ShapeFlags.IS_ELEMENT : ShapeFlags.IS_COMPONENT;
  if (children) {
    shapeFlags |= Array.isArray(children)
      ? ShapeFlags.IS_CHILD_ARR
      : ShapeFlags.IS_CHILD_TEXT;
  }
  if (isObject(children)) {
    shapeFlags |= ShapeFlags.IS_SLOTS;
  }
  return {
    type,
    props,
    children,
    shapeFlags,
  };
}

export function createTextVNode(text) {
  return createVnode(Text, {}, text);
}
