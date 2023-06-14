(function (modules) { // webpackBootstrap
  // The module cache
  // 定义对象用于缓存已加载过的模块
  var installedModules = {};

  // The require function
  // webpack 自定义的一个加载方法，核心功能就是返回被加载模块中导出的内容（具体内部是如何实现的，后续再分析）
  function __webpack_require__(moduleId) {

    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
  }

  // expose the modules object (__webpack_modules__)
  // 将模块定义保存一份，通过 m 属性挂载到自定义的方法身上
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // Object.prototype.hasOwnProperty.call
  // 判断被传入的对象 obj 身上是否具有指定的属性 **** ,如果有则返回 true 
  __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    // 如果当前 exports 身上不具备 name 属性，则条件成立
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };

  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    // 下面的条件如果成立就说明是一个  esModule 
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      // Object.prototype.toString.call(exports)
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    // 如果条件不成立，我们也直接在 exports 对象的身上添加一个 __esModule 属性，它的值就是true 
    Object.defineProperty(exports, '__esModule', { value: true });
  };

  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  __webpack_require__.t = function (value, mode) {
    // 01 调用 t 方法之后，我们会拿到被加载模块中的内容 value 
    // 02 对于 value 来说我们可能会直接返回，也可能会处理之后再返回
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
    return ns;
  };

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ?
      function getDefault() { return module['default']; } :
      function getModuleExports() { return module; };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };

  // __webpack_public_path__
  __webpack_require__.p = "";

  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
  /************************************************************************/
  ({
    "./src/index.js":
      /*! no static exports found */
      (function (module, exports, __webpack_require__) {
        let name = __webpack_require__(/*! ./login.js */ "./src/login.js")
        console.log('index.js内容执行了')
        console.log(name)
      }),
    "./src/login.js":
      /*! no static exports found */
      (function (module, exports) {
        module.exports = '拉勾教育'
      })
  });