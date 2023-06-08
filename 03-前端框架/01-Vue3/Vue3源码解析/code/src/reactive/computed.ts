import { effectImpl } from "./effect";

class computedRefImpl {
  computedFn;
  constructor(public fn) {
    this.computedFn = new effectImpl(fn, () => {
      this.active = true;
    });
  }
  active = true;
  get value() {
    if (this.active) {
      this.active = false;
      return this.computedFn.run();
    }
  }
}

export function computed(fn) {
  return new computedRefImpl(fn);
}
