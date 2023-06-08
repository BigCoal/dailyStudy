export * from "../runtime-core";
import { createRenderer } from "../runtime-core/renderer";

function createElement(tagName) {
  return document.createElement(tagName);
}

function patchProp(el, props) {
  for (const key in props) {
    const value = props[key];

    if (/^on\w/.test(key)) {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      el.setAttribute(key, value);
    }
  }
}

function insert(el, parentNode) {
  parentNode.append(el);
}

const render = createRenderer({
  createElement,
  patchProp,
  insert,
});

export function createApp(el) {
  return render.createApp(el);
}
