'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isObject = (obj) => typeof obj == "object";

const ShapeFlags = {
    IS_COMPONENT: 1,
    IS_ELEMENT: 1 << 1,
    IS_CHILD_TEXT: 1 << 2,
    IS_CHILD_ARR: 1 << 3,
    IS_SLOTS: 1 << 4,
};

const Text = Symbol("text");
const Fragment = Symbol("Fragment");
function createVnode(type, props = {}, children) {
    let shapeFlags = typeof type == "string" ? ShapeFlags.IS_ELEMENT : ShapeFlags.IS_COMPONENT;
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
function createTextVNode(text) {
    return createVnode(Text, {}, text);
}

let activeEffect;
const targetMap = new Map();
function track(target, key) {
    if (!isTracking())
        return;
    let targetObj = targetMap.get(target);
    if (!targetObj) {
        targetObj = new Map();
        targetMap.set(target, targetObj);
    }
    let keys = targetObj.get(key);
    if (!keys) {
        keys = new Set();
        targetObj.set(key, keys);
    }
    trackEffect(keys);
}
function trackEffect(keys) {
    if (!keys.has(activeEffect)) {
        keys.add(activeEffect);
        activeEffect.deps.push(keys);
    }
}
function trigger(target, key) {
    const targetObj = targetMap.get(target);
    const keys = targetObj.get(key);
    triggerEffect(keys);
}
function triggerEffect(keys) {
    for (let effect of keys) {
        if (effect.scheduler) {
            effect.scheduler();
        }
        else {
            effect.run();
        }
    }
}
function isTracking() {
}

function createGetter(isReadOnly = false, shallow = false) {
    return (target, key) => {
        if (key == ReactiveState.IS_REACTIVE || key == ReactiveState.IS_READONLY) {
            return true;
        }
        let res = Reflect.get(target, key);
        if (isObject(res) && !shallow) {
            res = isReadOnly ? readonly(res) : reactive(res); //?
        }
        if (!isReadOnly) {
            track(target, key);
        }
        return res;
    };
}
function createSetter() {
    return (target, key, value) => {
        const res = Reflect.set(target, key, value);
        trigger(target, key);
        return res;
    };
}
const baseHandler = {
    get: createGetter(),
    set: createSetter(),
};
const readonlyHandler = {
    get: createGetter(true),
    set: () => {
        console.warn("只读属性");
        return true;
    },
};
const shallowReadonlyHandler = {
    get: createGetter(true, true),
    set: () => {
        console.warn("只读属性");
        return true;
    },
};

var ReactiveState;
(function (ReactiveState) {
    ReactiveState["IS_REACTIVE"] = "__v_reactive";
    ReactiveState["IS_READONLY"] = "__v_readonly";
})(ReactiveState || (ReactiveState = {}));
function reactive(obj) {
    return new Proxy(obj, baseHandler);
}
function readonly(obj) {
    return new Proxy(obj, readonlyHandler);
}
function shallowReadonly(obj) {
    return new Proxy(obj, shallowReadonlyHandler);
}

function emit(instance, methodName, ...args) {
    const { props } = instance;
    const normalizeMethodName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    };
    let name = `on${normalizeMethodName(methodName)}`;
    name = name.replace(/-(\w)/g, ($1) => {
        return $1.slice(1).toUpperCase();
    });
    props[name] && props[name](...args);
}

function initProps(instance, props) {
    instance.props = props;
}

function PublicInstanceProxyHandlers(instance) {
    instance.proxy = new Proxy({ _: instance }, {
        get({ _: instance }, key) {
            if (key == "$slots") {
                return instance.slots;
            }
            if (Reflect.get(instance.setupState, key)) {
                return Reflect.get(instance.setupState, key);
            }
            else if (Reflect.get(instance.props, key)) {
                return Reflect.get(instance.props, key);
            }
        },
    });
}

function initSlots(instance, slots) {
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

let globalInstance;
function createComponentInstance(vnode, parent) {
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
        render: () => { },
    };
}
function setupComponent(instance) {
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
function getCurrentInstance() {
    return globalInstance;
}

function createAppApi(render) {
    return function createApp(rootComponent) {
        return {
            mount: (rootContainer) => {
                const vnode = createVnode(rootComponent);
                render(vnode, rootContainer);
            },
        };
    };
}

function createRenderer({ createElement: hostCreateElement, patchProp: hostPatchProp, insert: hostInsert, }) {
    function render(rootVnode, rootContainer) {
        patch(rootVnode, rootContainer, null);
    }
    function patch(vnode, container, parent) {
        if (vnode.type == Fragment) {
            mountChild(vnode.children, container, parent);
        }
        else if (vnode.type == Text) {
            processText(vnode.children, container);
        }
        else if (vnode.shapeFlags & ShapeFlags.IS_COMPONENT) {
            processComponent(vnode, container, parent);
        }
        else if (vnode.shapeFlags & ShapeFlags.IS_ELEMENT) {
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
        }
        else if (vnode.shapeFlags & ShapeFlags.IS_CHILD_ARR) {
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

function h(type, props, children) {
    return createVnode(type, props, children);
}

function renderSlots(slots, name, param) {
    if (slots[name]) {
        const v = slots[name](param);
        return createVnode(Fragment, {}, Array.isArray(v) ? v : [v]);
    }
}

function provide(name, value) {
    const instance = getCurrentInstance();
    if (instance) {
        if (!instance.isMounted) {
            instance.provides = Object.create(instance.provides);
        }
        instance.provides[name] = value;
    }
}
function inject(name, defaultValue) {
    const instance = getCurrentInstance();
    if (instance) {
        const { parent } = instance;
        return (parent.provides[name] ||
            (typeof defaultValue == "function" ? defaultValue() : defaultValue));
    }
}

function createElement(tagName) {
    return document.createElement(tagName);
}
function patchProp(el, props) {
    for (const key in props) {
        const value = props[key];
        if (/^on\w/.test(key)) {
            el.addEventListener(key.slice(2).toLowerCase(), value);
        }
        else {
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
function createApp(el) {
    return render.createApp(el);
}

exports.createApp = createApp;
exports.createRenderer = createRenderer;
exports.createTextVNode = createTextVNode;
exports.getCurrentInstance = getCurrentInstance;
exports.h = h;
exports.inject = inject;
exports.provide = provide;
exports.renderSlots = renderSlots;
