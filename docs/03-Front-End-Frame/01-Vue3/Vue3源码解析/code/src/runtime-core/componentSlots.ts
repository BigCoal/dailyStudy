import { ShapeFlags } from "../share/shapeFlags";
export function initSlots(instance, slots) {
  const { shapeFlags } = instance.vnode;
  if (shapeFlags & ShapeFlags.IS_SLOTS) {
    const slotObj = {};
    for (const key in slots) {
      const value = slots[key];
      slotObj[key] = value;
    }
    instance.slots = slotObj;
  }
}
