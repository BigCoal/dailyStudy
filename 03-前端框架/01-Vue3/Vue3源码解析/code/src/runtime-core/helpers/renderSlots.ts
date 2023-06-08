import { createVnode, Fragment } from "../vnode";

export function renderSlots(slots, name, param) {
  if (slots[name]) {
    const v = slots[name](param);
    return createVnode(Fragment, {}, Array.isArray(v) ? v : [v]);
  }
}
