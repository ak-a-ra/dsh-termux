window.__ModuleLoader__.load({ id: "dsh-graphview", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/events-shim.js
var events_shim_exports = {};
__export(events_shim_exports, {
  EventEmitter: () => EventEmitter,
  default: () => events_shim_default
});
var EventEmitter, events_shim_default;
var init_events_shim = __esm({
  "src/client/events-shim.js"() {
    "use strict";
    EventEmitter = class {
      constructor() {
        this.__listeners = /* @__PURE__ */ new Map();
      }
      on(event, listener) {
        let set = this.__listeners.get(event);
        if (!set) {
          set = /* @__PURE__ */ new Set();
          this.__listeners.set(event, set);
        }
        set.add(listener);
        return this;
      }
      addListener(event, listener) {
        return this.on(event, listener);
      }
      prependListener(event, listener) {
        return this.on(event, listener);
      }
      once(event, listener) {
        const wrapped = (...args) => {
          this.off(event, wrapped);
          listener(...args);
        };
        wrapped.__original = listener;
        return this.on(event, wrapped);
      }
      off(event, listener) {
        const set = this.__listeners.get(event);
        if (set) {
          for (const entry of Array.from(set)) {
            if (entry === listener || entry.__original === listener) set.delete(entry);
          }
          if (set.size === 0) this.__listeners.delete(event);
        }
        return this;
      }
      removeListener(event, listener) {
        return this.off(event, listener);
      }
      removeAllListeners(event) {
        if (event === void 0) this.__listeners.clear();
        else this.__listeners.delete(event);
        return this;
      }
      emit(event, ...args) {
        const set = this.__listeners.get(event);
        if (!set || set.size === 0) return false;
        for (const listener of Array.from(set)) {
          try {
            listener(...args);
          } catch {
          }
        }
        return true;
      }
      listeners(event) {
        const set = this.__listeners.get(event);
        return set ? Array.from(set, (entry) => entry.__original ?? entry) : [];
      }
      listenerCount(event) {
        return this.__listeners.get(event)?.size ?? 0;
      }
      eventNames() {
        return Array.from(this.__listeners.keys());
      }
      setMaxListeners() {
        return this;
      }
      getMaxListeners() {
        return 0;
      }
    };
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.default = EventEmitter;
    events_shim_default = EventEmitter;
  }
});

// node_modules/@yomguithereal/helpers/extend.js
var require_extend = __commonJS({
  "node_modules/@yomguithereal/helpers/extend.js"(exports2, module2) {
    module2.exports = function extend(array, values) {
      var l2 = values.length;
      if (l2 === 0)
        return;
      var l1 = array.length;
      array.length += l2;
      for (var i = 0; i < l2; i++)
        array[l1 + i] = values[i];
    };
  }
});

// node_modules/graphology-utils/is-graph.js
var require_is_graph = __commonJS({
  "node_modules/graphology-utils/is-graph.js"(exports2, module2) {
    module2.exports = function isGraph(value) {
      return value !== null && typeof value === "object" && typeof value.addUndirectedEdgeWithKey === "function" && typeof value.dropNode === "function" && typeof value.multi === "boolean";
    };
  }
});

// node_modules/sigma/utils/matrices.js
var require_matrices = __commonJS({
  "node_modules/sigma/utils/matrices.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.multiplyVec2 = exports2.multiply = exports2.translate = exports2.rotate = exports2.scale = exports2.identity = void 0;
    function identity() {
      return Float32Array.of(1, 0, 0, 0, 1, 0, 0, 0, 1);
    }
    exports2.identity = identity;
    function scale(m, x, y) {
      m[0] = x;
      m[4] = typeof y === "number" ? y : x;
      return m;
    }
    exports2.scale = scale;
    function rotate(m, r) {
      var s = Math.sin(r), c = Math.cos(r);
      m[0] = c;
      m[1] = s;
      m[3] = -s;
      m[4] = c;
      return m;
    }
    exports2.rotate = rotate;
    function translate(m, x, y) {
      m[6] = x;
      m[7] = y;
      return m;
    }
    exports2.translate = translate;
    function multiply(a, b) {
      var a00 = a[0], a01 = a[1], a02 = a[2];
      var a10 = a[3], a11 = a[4], a12 = a[5];
      var a20 = a[6], a21 = a[7], a22 = a[8];
      var b00 = b[0], b01 = b[1], b02 = b[2];
      var b10 = b[3], b11 = b[4], b12 = b[5];
      var b20 = b[6], b21 = b[7], b22 = b[8];
      a[0] = b00 * a00 + b01 * a10 + b02 * a20;
      a[1] = b00 * a01 + b01 * a11 + b02 * a21;
      a[2] = b00 * a02 + b01 * a12 + b02 * a22;
      a[3] = b10 * a00 + b11 * a10 + b12 * a20;
      a[4] = b10 * a01 + b11 * a11 + b12 * a21;
      a[5] = b10 * a02 + b11 * a12 + b12 * a22;
      a[6] = b20 * a00 + b21 * a10 + b22 * a20;
      a[7] = b20 * a01 + b21 * a11 + b22 * a21;
      a[8] = b20 * a02 + b21 * a12 + b22 * a22;
      return a;
    }
    exports2.multiply = multiply;
    function multiplyVec2(a, b, z) {
      if (z === void 0) {
        z = 1;
      }
      var a00 = a[0];
      var a01 = a[1];
      var a10 = a[3];
      var a11 = a[4];
      var a20 = a[6];
      var a21 = a[7];
      var b0 = b.x;
      var b1 = b.y;
      return { x: b0 * a00 + b1 * a10 + a20 * z, y: b0 * a01 + b1 * a11 + a21 * z };
    }
    exports2.multiplyVec2 = multiplyVec2;
  }
});

// node_modules/sigma/utils/data.js
var require_data = __commonJS({
  "node_modules/sigma/utils/data.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.HTML_COLORS = void 0;
    exports2.HTML_COLORS = {
      black: "#000000",
      silver: "#C0C0C0",
      gray: "#808080",
      grey: "#808080",
      white: "#FFFFFF",
      maroon: "#800000",
      red: "#FF0000",
      purple: "#800080",
      fuchsia: "#FF00FF",
      green: "#008000",
      lime: "#00FF00",
      olive: "#808000",
      yellow: "#FFFF00",
      navy: "#000080",
      blue: "#0000FF",
      teal: "#008080",
      aqua: "#00FFFF",
      darkblue: "#00008B",
      mediumblue: "#0000CD",
      darkgreen: "#006400",
      darkcyan: "#008B8B",
      deepskyblue: "#00BFFF",
      darkturquoise: "#00CED1",
      mediumspringgreen: "#00FA9A",
      springgreen: "#00FF7F",
      cyan: "#00FFFF",
      midnightblue: "#191970",
      dodgerblue: "#1E90FF",
      lightseagreen: "#20B2AA",
      forestgreen: "#228B22",
      seagreen: "#2E8B57",
      darkslategray: "#2F4F4F",
      darkslategrey: "#2F4F4F",
      limegreen: "#32CD32",
      mediumseagreen: "#3CB371",
      turquoise: "#40E0D0",
      royalblue: "#4169E1",
      steelblue: "#4682B4",
      darkslateblue: "#483D8B",
      mediumturquoise: "#48D1CC",
      indigo: "#4B0082",
      darkolivegreen: "#556B2F",
      cadetblue: "#5F9EA0",
      cornflowerblue: "#6495ED",
      rebeccapurple: "#663399",
      mediumaquamarine: "#66CDAA",
      dimgray: "#696969",
      dimgrey: "#696969",
      slateblue: "#6A5ACD",
      olivedrab: "#6B8E23",
      slategray: "#708090",
      slategrey: "#708090",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      mediumslateblue: "#7B68EE",
      lawngreen: "#7CFC00",
      chartreuse: "#7FFF00",
      aquamarine: "#7FFFD4",
      skyblue: "#87CEEB",
      lightskyblue: "#87CEFA",
      blueviolet: "#8A2BE2",
      darkred: "#8B0000",
      darkmagenta: "#8B008B",
      saddlebrown: "#8B4513",
      darkseagreen: "#8FBC8F",
      lightgreen: "#90EE90",
      mediumpurple: "#9370DB",
      darkviolet: "#9400D3",
      palegreen: "#98FB98",
      darkorchid: "#9932CC",
      yellowgreen: "#9ACD32",
      sienna: "#A0522D",
      brown: "#A52A2A",
      darkgray: "#A9A9A9",
      darkgrey: "#A9A9A9",
      lightblue: "#ADD8E6",
      greenyellow: "#ADFF2F",
      paleturquoise: "#AFEEEE",
      lightsteelblue: "#B0C4DE",
      powderblue: "#B0E0E6",
      firebrick: "#B22222",
      darkgoldenrod: "#B8860B",
      mediumorchid: "#BA55D3",
      rosybrown: "#BC8F8F",
      darkkhaki: "#BDB76B",
      mediumvioletred: "#C71585",
      indianred: "#CD5C5C",
      peru: "#CD853F",
      chocolate: "#D2691E",
      tan: "#D2B48C",
      lightgray: "#D3D3D3",
      lightgrey: "#D3D3D3",
      thistle: "#D8BFD8",
      orchid: "#DA70D6",
      goldenrod: "#DAA520",
      palevioletred: "#DB7093",
      crimson: "#DC143C",
      gainsboro: "#DCDCDC",
      plum: "#DDA0DD",
      burlywood: "#DEB887",
      lightcyan: "#E0FFFF",
      lavender: "#E6E6FA",
      darksalmon: "#E9967A",
      violet: "#EE82EE",
      palegoldenrod: "#EEE8AA",
      lightcoral: "#F08080",
      khaki: "#F0E68C",
      aliceblue: "#F0F8FF",
      honeydew: "#F0FFF0",
      azure: "#F0FFFF",
      sandybrown: "#F4A460",
      wheat: "#F5DEB3",
      beige: "#F5F5DC",
      whitesmoke: "#F5F5F5",
      mintcream: "#F5FFFA",
      ghostwhite: "#F8F8FF",
      salmon: "#FA8072",
      antiquewhite: "#FAEBD7",
      linen: "#FAF0E6",
      lightgoldenrodyellow: "#FAFAD2",
      oldlace: "#FDF5E6",
      magenta: "#FF00FF",
      deeppink: "#FF1493",
      orangered: "#FF4500",
      tomato: "#FF6347",
      hotpink: "#FF69B4",
      coral: "#FF7F50",
      darkorange: "#FF8C00",
      lightsalmon: "#FFA07A",
      orange: "#FFA500",
      lightpink: "#FFB6C1",
      pink: "#FFC0CB",
      gold: "#FFD700",
      peachpuff: "#FFDAB9",
      navajowhite: "#FFDEAD",
      moccasin: "#FFE4B5",
      bisque: "#FFE4C4",
      mistyrose: "#FFE4E1",
      blanchedalmond: "#FFEBCD",
      papayawhip: "#FFEFD5",
      lavenderblush: "#FFF0F5",
      seashell: "#FFF5EE",
      cornsilk: "#FFF8DC",
      lemonchiffon: "#FFFACD",
      floralwhite: "#FFFAF0",
      snow: "#FFFAFA",
      lightyellow: "#FFFFE0",
      ivory: "#FFFFF0"
    };
  }
});

// node_modules/sigma/utils/index.js
var require_utils = __commonJS({
  "node_modules/sigma/utils/index.js"(exports2) {
    "use strict";
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateGraph = exports2.canUse32BitsIndices = exports2.extractPixel = exports2.getMatrixImpact = exports2.matrixFromCamera = exports2.getCorrectionRatio = exports2.floatColor = exports2.floatArrayColor = exports2.parseColor = exports2.zIndexOrdering = exports2.createNormalizationFunction = exports2.graphExtent = exports2.getPixelRatio = exports2.createElement = exports2.cancelFrame = exports2.requestFrame = exports2.assignDeep = exports2.assign = exports2.isPlainObject = void 0;
    var is_graph_1 = __importDefault(require_is_graph());
    var matrices_1 = require_matrices();
    var data_1 = require_data();
    function isPlainObject2(value) {
      return typeof value === "object" && value !== null && value.constructor === Object;
    }
    exports2.isPlainObject = isPlainObject2;
    function assign2(target) {
      var objects = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        objects[_i - 1] = arguments[_i];
      }
      target = target || {};
      for (var i = 0, l = objects.length; i < l; i++) {
        var o = objects[i];
        if (!o)
          continue;
        Object.assign(target, o);
      }
      return target;
    }
    exports2.assign = assign2;
    function assignDeep(target) {
      var objects = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        objects[_i - 1] = arguments[_i];
      }
      target = target || {};
      for (var i = 0, l = objects.length; i < l; i++) {
        var o = objects[i];
        if (!o)
          continue;
        for (var k in o) {
          if (isPlainObject2(o[k])) {
            target[k] = assignDeep(target[k], o[k]);
          } else {
            target[k] = o[k];
          }
        }
      }
      return target;
    }
    exports2.assignDeep = assignDeep;
    exports2.requestFrame = typeof requestAnimationFrame !== "undefined" ? function(callback) {
      return requestAnimationFrame(callback);
    } : function(callback) {
      return setTimeout(callback, 0);
    };
    exports2.cancelFrame = typeof cancelAnimationFrame !== "undefined" ? function(requestID) {
      return cancelAnimationFrame(requestID);
    } : function(requestID) {
      return clearTimeout(requestID);
    };
    function createElement(tag, style, attributes) {
      var element = document.createElement(tag);
      if (style) {
        for (var k in style) {
          element.style[k] = style[k];
        }
      }
      if (attributes) {
        for (var k in attributes) {
          element.setAttribute(k, attributes[k]);
        }
      }
      return element;
    }
    exports2.createElement = createElement;
    function getPixelRatio() {
      if (typeof window.devicePixelRatio !== "undefined")
        return window.devicePixelRatio;
      return 1;
    }
    exports2.getPixelRatio = getPixelRatio;
    function graphExtent(graph) {
      if (!graph.order)
        return { x: [0, 1], y: [0, 1] };
      var xMin = Infinity;
      var xMax = -Infinity;
      var yMin = Infinity;
      var yMax = -Infinity;
      graph.forEachNode(function(_, attr) {
        var x = attr.x, y = attr.y;
        if (x < xMin)
          xMin = x;
        if (x > xMax)
          xMax = x;
        if (y < yMin)
          yMin = y;
        if (y > yMax)
          yMax = y;
      });
      return { x: [xMin, xMax], y: [yMin, yMax] };
    }
    exports2.graphExtent = graphExtent;
    function createNormalizationFunction(extent) {
      var _a = __read(extent.x, 2), minX = _a[0], maxX = _a[1], _b = __read(extent.y, 2), minY = _b[0], maxY = _b[1];
      var ratio = Math.max(maxX - minX, maxY - minY), dX = (maxX + minX) / 2, dY = (maxY + minY) / 2;
      if (ratio === 0 || Math.abs(ratio) === Infinity || isNaN(ratio))
        ratio = 1;
      if (isNaN(dX))
        dX = 0;
      if (isNaN(dY))
        dY = 0;
      var fn = function(data) {
        return {
          x: 0.5 + (data.x - dX) / ratio,
          y: 0.5 + (data.y - dY) / ratio
        };
      };
      fn.applyTo = function(data) {
        data.x = 0.5 + (data.x - dX) / ratio;
        data.y = 0.5 + (data.y - dY) / ratio;
      };
      fn.inverse = function(data) {
        return {
          x: dX + ratio * (data.x - 0.5),
          y: dY + ratio * (data.y - 0.5)
        };
      };
      fn.ratio = ratio;
      return fn;
    }
    exports2.createNormalizationFunction = createNormalizationFunction;
    function zIndexOrdering(extent, getter, elements) {
      return elements.sort(function(a, b) {
        var zA = getter(a) || 0, zB = getter(b) || 0;
        if (zA < zB)
          return -1;
        if (zA > zB)
          return 1;
        return 0;
      });
    }
    exports2.zIndexOrdering = zIndexOrdering;
    var INT8 = new Int8Array(4);
    var INT32 = new Int32Array(INT8.buffer, 0, 1);
    var FLOAT32 = new Float32Array(INT8.buffer, 0, 1);
    var RGBA_TEST_REGEX = /^\s*rgba?\s*\(/;
    var RGBA_EXTRACT_REGEX = /^\s*rgba?\s*\(\s*([0-9]*)\s*,\s*([0-9]*)\s*,\s*([0-9]*)(?:\s*,\s*(.*)?)?\)\s*$/;
    function parseColor(val) {
      var r = 0;
      var g = 0;
      var b = 0;
      var a = 1;
      if (val[0] === "#") {
        if (val.length === 4) {
          r = parseInt(val.charAt(1) + val.charAt(1), 16);
          g = parseInt(val.charAt(2) + val.charAt(2), 16);
          b = parseInt(val.charAt(3) + val.charAt(3), 16);
        } else {
          r = parseInt(val.charAt(1) + val.charAt(2), 16);
          g = parseInt(val.charAt(3) + val.charAt(4), 16);
          b = parseInt(val.charAt(5) + val.charAt(6), 16);
        }
        if (val.length === 9) {
          a = parseInt(val.charAt(7) + val.charAt(8), 16) / 255;
        }
      } else if (RGBA_TEST_REGEX.test(val)) {
        var match = val.match(RGBA_EXTRACT_REGEX);
        if (match) {
          r = +match[1];
          g = +match[2];
          b = +match[3];
          if (match[4])
            a = +match[4];
        }
      }
      return { r, g, b, a };
    }
    exports2.parseColor = parseColor;
    var FLOAT_COLOR_CACHE = {};
    for (htmlColor in data_1.HTML_COLORS) {
      FLOAT_COLOR_CACHE[htmlColor] = floatColor(data_1.HTML_COLORS[htmlColor]);
      FLOAT_COLOR_CACHE[data_1.HTML_COLORS[htmlColor]] = FLOAT_COLOR_CACHE[htmlColor];
    }
    var htmlColor;
    function floatArrayColor(val) {
      val = data_1.HTML_COLORS[val] || val;
      var _a = parseColor(val), r = _a.r, g = _a.g, b = _a.b, a = _a.a;
      return new Float32Array([r / 255, g / 255, b / 255, a]);
    }
    exports2.floatArrayColor = floatArrayColor;
    function floatColor(val) {
      if (typeof FLOAT_COLOR_CACHE[val] !== "undefined")
        return FLOAT_COLOR_CACHE[val];
      var parsed = parseColor(val);
      var r = parsed.r, g = parsed.g, b = parsed.b;
      var a = parsed.a;
      a = a * 255 | 0;
      INT32[0] = (a << 24 | b << 16 | g << 8 | r) & 4278190079;
      var color = FLOAT32[0];
      FLOAT_COLOR_CACHE[val] = color;
      return color;
    }
    exports2.floatColor = floatColor;
    function getCorrectionRatio(viewportDimensions, graphDimensions) {
      var viewportRatio = viewportDimensions.height / viewportDimensions.width;
      var graphRatio = graphDimensions.height / graphDimensions.width;
      if (viewportRatio < 1 && graphRatio > 1 || viewportRatio > 1 && graphRatio < 1) {
        return 1;
      }
      return Math.min(Math.max(graphRatio, 1 / graphRatio), Math.max(1 / viewportRatio, viewportRatio));
    }
    exports2.getCorrectionRatio = getCorrectionRatio;
    function matrixFromCamera(state, viewportDimensions, graphDimensions, padding, inverse) {
      var angle = state.angle, ratio = state.ratio, x = state.x, y = state.y;
      var width = viewportDimensions.width, height = viewportDimensions.height;
      var matrix = (0, matrices_1.identity)();
      var smallestDimension = Math.min(width, height) - 2 * padding;
      var correctionRatio = getCorrectionRatio(viewportDimensions, graphDimensions);
      if (!inverse) {
        (0, matrices_1.multiply)(matrix, (0, matrices_1.scale)((0, matrices_1.identity)(), 2 * (smallestDimension / width) * correctionRatio, 2 * (smallestDimension / height) * correctionRatio));
        (0, matrices_1.multiply)(matrix, (0, matrices_1.rotate)((0, matrices_1.identity)(), -angle));
        (0, matrices_1.multiply)(matrix, (0, matrices_1.scale)((0, matrices_1.identity)(), 1 / ratio));
        (0, matrices_1.multiply)(matrix, (0, matrices_1.translate)((0, matrices_1.identity)(), -x, -y));
      } else {
        (0, matrices_1.multiply)(matrix, (0, matrices_1.translate)((0, matrices_1.identity)(), x, y));
        (0, matrices_1.multiply)(matrix, (0, matrices_1.scale)((0, matrices_1.identity)(), ratio));
        (0, matrices_1.multiply)(matrix, (0, matrices_1.rotate)((0, matrices_1.identity)(), angle));
        (0, matrices_1.multiply)(matrix, (0, matrices_1.scale)((0, matrices_1.identity)(), width / smallestDimension / 2 / correctionRatio, height / smallestDimension / 2 / correctionRatio));
      }
      return matrix;
    }
    exports2.matrixFromCamera = matrixFromCamera;
    function getMatrixImpact(matrix, cameraState, viewportDimensions) {
      var _a = (0, matrices_1.multiplyVec2)(matrix, { x: Math.cos(cameraState.angle), y: Math.sin(cameraState.angle) }, 0), x = _a.x, y = _a.y;
      return 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / viewportDimensions.width;
    }
    exports2.getMatrixImpact = getMatrixImpact;
    function extractPixel(gl, x, y, array) {
      var data = array || new Uint8Array(4);
      gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, data);
      return data;
    }
    exports2.extractPixel = extractPixel;
    function canUse32BitsIndices(gl) {
      var webgl2 = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext;
      return webgl2 || !!gl.getExtension("OES_element_index_uint");
    }
    exports2.canUse32BitsIndices = canUse32BitsIndices;
    function validateGraph(graph) {
      if (!(0, is_graph_1.default)(graph))
        throw new Error("Sigma: invalid graph instance.");
      graph.forEachNode(function(key, attributes) {
        if (!Number.isFinite(attributes.x) || !Number.isFinite(attributes.y)) {
          throw new Error("Sigma: Coordinates of node ".concat(key, " are invalid. A node must have a numeric 'x' and 'y' attribute."));
        }
      });
    }
    exports2.validateGraph = validateGraph;
  }
});

// node_modules/sigma/utils/easings.js
var require_easings = __commonJS({
  "node_modules/sigma/utils/easings.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.cubicInOut = exports2.cubicOut = exports2.cubicIn = exports2.quadraticInOut = exports2.quadraticOut = exports2.quadraticIn = exports2.linear = void 0;
    var linear = function(k) {
      return k;
    };
    exports2.linear = linear;
    var quadraticIn = function(k) {
      return k * k;
    };
    exports2.quadraticIn = quadraticIn;
    var quadraticOut = function(k) {
      return k * (2 - k);
    };
    exports2.quadraticOut = quadraticOut;
    var quadraticInOut = function(k) {
      if ((k *= 2) < 1)
        return 0.5 * k * k;
      return -0.5 * (--k * (k - 2) - 1);
    };
    exports2.quadraticInOut = quadraticInOut;
    var cubicIn = function(k) {
      return k * k * k;
    };
    exports2.cubicIn = cubicIn;
    var cubicOut = function(k) {
      return --k * k * k + 1;
    };
    exports2.cubicOut = cubicOut;
    var cubicInOut = function(k) {
      if ((k *= 2) < 1)
        return 0.5 * k * k * k;
      return 0.5 * ((k -= 2) * k * k + 2);
    };
    exports2.cubicInOut = cubicInOut;
    var easings = {
      linear: exports2.linear,
      quadraticIn: exports2.quadraticIn,
      quadraticOut: exports2.quadraticOut,
      quadraticInOut: exports2.quadraticInOut,
      cubicIn: exports2.cubicIn,
      cubicOut: exports2.cubicOut,
      cubicInOut: exports2.cubicInOut
    };
    exports2.default = easings;
  }
});

// node_modules/sigma/utils/animate.js
var require_animate = __commonJS({
  "node_modules/sigma/utils/animate.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.animateNodes = exports2.ANIMATE_DEFAULTS = void 0;
    var index_1 = require_utils();
    var easings_1 = __importDefault(require_easings());
    exports2.ANIMATE_DEFAULTS = {
      easing: "quadraticInOut",
      duration: 150
    };
    function animateNodes(graph, targets, opts, callback) {
      var options = Object.assign({}, exports2.ANIMATE_DEFAULTS, opts);
      var easing = typeof options.easing === "function" ? options.easing : easings_1.default[options.easing];
      var start = Date.now();
      var startPositions = {};
      for (var node in targets) {
        var attrs = targets[node];
        startPositions[node] = {};
        for (var k in attrs)
          startPositions[node][k] = graph.getNodeAttribute(node, k);
      }
      var frame = null;
      var step = function() {
        frame = null;
        var p = (Date.now() - start) / options.duration;
        if (p >= 1) {
          for (var node2 in targets) {
            var attrs2 = targets[node2];
            for (var k2 in attrs2)
              graph.setNodeAttribute(node2, k2, attrs2[k2]);
          }
          if (typeof callback === "function")
            callback();
          return;
        }
        p = easing(p);
        for (var node2 in targets) {
          var attrs2 = targets[node2];
          var s = startPositions[node2];
          for (var k2 in attrs2)
            graph.setNodeAttribute(node2, k2, attrs2[k2] * p + s[k2] * (1 - p));
        }
        frame = (0, index_1.requestFrame)(step);
      };
      step();
      return function() {
        if (frame)
          (0, index_1.cancelFrame)(frame);
      };
    }
    exports2.animateNodes = animateNodes;
  }
});

// node_modules/sigma/types.js
var require_types = __commonJS({
  "node_modules/sigma/types.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TypedEventEmitter = void 0;
    var events_1 = (init_events_shim(), __toCommonJS(events_shim_exports));
    var TypedEventEmitter = (
      /** @class */
      (function(_super) {
        __extends(TypedEventEmitter2, _super);
        function TypedEventEmitter2() {
          var _this = _super.call(this) || this;
          _this.rawEmitter = _this;
          return _this;
        }
        return TypedEventEmitter2;
      })(events_1.EventEmitter)
    );
    exports2.TypedEventEmitter = TypedEventEmitter;
  }
});

// node_modules/sigma/core/camera.js
var require_camera = __commonJS({
  "node_modules/sigma/core/camera.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var animate_1 = require_animate();
    var easings_1 = __importDefault(require_easings());
    var utils_1 = require_utils();
    var types_1 = require_types();
    var DEFAULT_ZOOMING_RATIO = 1.5;
    var Camera = (
      /** @class */
      (function(_super) {
        __extends(Camera2, _super);
        function Camera2() {
          var _this = _super.call(this) || this;
          _this.x = 0.5;
          _this.y = 0.5;
          _this.angle = 0;
          _this.ratio = 1;
          _this.minRatio = null;
          _this.maxRatio = null;
          _this.nextFrame = null;
          _this.previousState = null;
          _this.enabled = true;
          _this.previousState = _this.getState();
          return _this;
        }
        Camera2.from = function(state) {
          var camera = new Camera2();
          return camera.setState(state);
        };
        Camera2.prototype.enable = function() {
          this.enabled = true;
          return this;
        };
        Camera2.prototype.disable = function() {
          this.enabled = false;
          return this;
        };
        Camera2.prototype.getState = function() {
          return {
            x: this.x,
            y: this.y,
            angle: this.angle,
            ratio: this.ratio
          };
        };
        Camera2.prototype.hasState = function(state) {
          return this.x === state.x && this.y === state.y && this.ratio === state.ratio && this.angle === state.angle;
        };
        Camera2.prototype.getPreviousState = function() {
          var state = this.previousState;
          if (!state)
            return null;
          return {
            x: state.x,
            y: state.y,
            angle: state.angle,
            ratio: state.ratio
          };
        };
        Camera2.prototype.getBoundedRatio = function(ratio) {
          var r = ratio;
          if (typeof this.minRatio === "number")
            r = Math.max(r, this.minRatio);
          if (typeof this.maxRatio === "number")
            r = Math.min(r, this.maxRatio);
          return r;
        };
        Camera2.prototype.validateState = function(state) {
          var validatedState = {};
          if (typeof state.x === "number")
            validatedState.x = state.x;
          if (typeof state.y === "number")
            validatedState.y = state.y;
          if (typeof state.angle === "number")
            validatedState.angle = state.angle;
          if (typeof state.ratio === "number")
            validatedState.ratio = this.getBoundedRatio(state.ratio);
          return validatedState;
        };
        Camera2.prototype.isAnimated = function() {
          return !!this.nextFrame;
        };
        Camera2.prototype.setState = function(state) {
          if (!this.enabled)
            return this;
          this.previousState = this.getState();
          var validState = this.validateState(state);
          if (typeof validState.x === "number")
            this.x = validState.x;
          if (typeof validState.y === "number")
            this.y = validState.y;
          if (typeof validState.angle === "number")
            this.angle = validState.angle;
          if (typeof validState.ratio === "number")
            this.ratio = validState.ratio;
          if (!this.hasState(this.previousState))
            this.emit("updated", this.getState());
          return this;
        };
        Camera2.prototype.updateState = function(updater) {
          this.setState(updater(this.getState()));
          return this;
        };
        Camera2.prototype.animate = function(state, opts, callback) {
          var _this = this;
          if (!this.enabled)
            return;
          var options = Object.assign({}, animate_1.ANIMATE_DEFAULTS, opts);
          var validState = this.validateState(state);
          var easing = typeof options.easing === "function" ? options.easing : easings_1.default[options.easing];
          var start = Date.now(), initialState = this.getState();
          var fn = function() {
            var t = (Date.now() - start) / options.duration;
            if (t >= 1) {
              _this.nextFrame = null;
              _this.setState(validState);
              if (_this.animationCallback) {
                _this.animationCallback.call(null);
                _this.animationCallback = void 0;
              }
              return;
            }
            var coefficient = easing(t);
            var newState = {};
            if (typeof validState.x === "number")
              newState.x = initialState.x + (validState.x - initialState.x) * coefficient;
            if (typeof validState.y === "number")
              newState.y = initialState.y + (validState.y - initialState.y) * coefficient;
            if (typeof validState.angle === "number")
              newState.angle = initialState.angle + (validState.angle - initialState.angle) * coefficient;
            if (typeof validState.ratio === "number")
              newState.ratio = initialState.ratio + (validState.ratio - initialState.ratio) * coefficient;
            _this.setState(newState);
            _this.nextFrame = (0, utils_1.requestFrame)(fn);
          };
          if (this.nextFrame) {
            (0, utils_1.cancelFrame)(this.nextFrame);
            if (this.animationCallback)
              this.animationCallback.call(null);
            this.nextFrame = (0, utils_1.requestFrame)(fn);
          } else {
            fn();
          }
          this.animationCallback = callback;
        };
        Camera2.prototype.animatedZoom = function(factorOrOptions) {
          if (!factorOrOptions) {
            this.animate({ ratio: this.ratio / DEFAULT_ZOOMING_RATIO });
          } else {
            if (typeof factorOrOptions === "number")
              return this.animate({ ratio: this.ratio / factorOrOptions });
            else
              this.animate({
                ratio: this.ratio / (factorOrOptions.factor || DEFAULT_ZOOMING_RATIO)
              }, factorOrOptions);
          }
        };
        Camera2.prototype.animatedUnzoom = function(factorOrOptions) {
          if (!factorOrOptions) {
            this.animate({ ratio: this.ratio * DEFAULT_ZOOMING_RATIO });
          } else {
            if (typeof factorOrOptions === "number")
              return this.animate({ ratio: this.ratio * factorOrOptions });
            else
              this.animate({
                ratio: this.ratio * (factorOrOptions.factor || DEFAULT_ZOOMING_RATIO)
              }, factorOrOptions);
          }
        };
        Camera2.prototype.animatedReset = function(options) {
          this.animate({
            x: 0.5,
            y: 0.5,
            ratio: 1,
            angle: 0
          }, options);
        };
        Camera2.prototype.copy = function() {
          return Camera2.from(this.getState());
        };
        return Camera2;
      })(types_1.TypedEventEmitter)
    );
    exports2.default = Camera;
  }
});

// node_modules/sigma/core/captors/captor.js
var require_captor = __commonJS({
  "node_modules/sigma/core/captors/captor.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __assign = exports2 && exports2.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getWheelDelta = exports2.getTouchCoords = exports2.getTouchesArray = exports2.getWheelCoords = exports2.getMouseCoords = exports2.getPosition = void 0;
    var types_1 = require_types();
    function getPosition(e, dom) {
      var bbox = dom.getBoundingClientRect();
      return {
        x: e.clientX - bbox.left,
        y: e.clientY - bbox.top
      };
    }
    exports2.getPosition = getPosition;
    function getMouseCoords(e, dom) {
      var res = __assign(__assign({}, getPosition(e, dom)), { sigmaDefaultPrevented: false, preventSigmaDefault: function() {
        res.sigmaDefaultPrevented = true;
      }, original: e });
      return res;
    }
    exports2.getMouseCoords = getMouseCoords;
    function getWheelCoords(e, dom) {
      return __assign(__assign({}, getMouseCoords(e, dom)), { delta: getWheelDelta(e) });
    }
    exports2.getWheelCoords = getWheelCoords;
    var MAX_TOUCHES = 2;
    function getTouchesArray(touches) {
      var arr = [];
      for (var i = 0, l = Math.min(touches.length, MAX_TOUCHES); i < l; i++)
        arr.push(touches[i]);
      return arr;
    }
    exports2.getTouchesArray = getTouchesArray;
    function getTouchCoords(e, dom) {
      return {
        touches: getTouchesArray(e.touches).map(function(touch) {
          return getPosition(touch, dom);
        }),
        original: e
      };
    }
    exports2.getTouchCoords = getTouchCoords;
    function getWheelDelta(e) {
      if (typeof e.deltaY !== "undefined")
        return e.deltaY * -3 / 360;
      if (typeof e.detail !== "undefined")
        return e.detail / -9;
      throw new Error("Captor: could not extract delta from event.");
    }
    exports2.getWheelDelta = getWheelDelta;
    var Captor = (
      /** @class */
      (function(_super) {
        __extends(Captor2, _super);
        function Captor2(container, renderer) {
          var _this = _super.call(this) || this;
          _this.container = container;
          _this.renderer = renderer;
          return _this;
        }
        return Captor2;
      })(types_1.TypedEventEmitter)
    );
    exports2.default = Captor;
  }
});

// node_modules/sigma/core/captors/mouse.js
var require_mouse = __commonJS({
  "node_modules/sigma/core/captors/mouse.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var captor_1 = __importStar(require_captor());
    var DRAG_TIMEOUT = 100;
    var DRAGGED_EVENTS_TOLERANCE = 3;
    var MOUSE_INERTIA_DURATION = 200;
    var MOUSE_INERTIA_RATIO = 3;
    var MOUSE_ZOOM_DURATION = 250;
    var ZOOMING_RATIO = 1.7;
    var DOUBLE_CLICK_TIMEOUT = 300;
    var DOUBLE_CLICK_ZOOMING_RATIO = 2.2;
    var DOUBLE_CLICK_ZOOMING_DURATION = 200;
    var MouseCaptor = (
      /** @class */
      (function(_super) {
        __extends(MouseCaptor2, _super);
        function MouseCaptor2(container, renderer) {
          var _this = _super.call(this, container, renderer) || this;
          _this.enabled = true;
          _this.draggedEvents = 0;
          _this.downStartTime = null;
          _this.lastMouseX = null;
          _this.lastMouseY = null;
          _this.isMouseDown = false;
          _this.isMoving = false;
          _this.movingTimeout = null;
          _this.startCameraState = null;
          _this.clicks = 0;
          _this.doubleClickTimeout = null;
          _this.currentWheelDirection = 0;
          _this.handleClick = _this.handleClick.bind(_this);
          _this.handleRightClick = _this.handleRightClick.bind(_this);
          _this.handleDown = _this.handleDown.bind(_this);
          _this.handleUp = _this.handleUp.bind(_this);
          _this.handleMove = _this.handleMove.bind(_this);
          _this.handleWheel = _this.handleWheel.bind(_this);
          _this.handleOut = _this.handleOut.bind(_this);
          container.addEventListener("click", _this.handleClick, false);
          container.addEventListener("contextmenu", _this.handleRightClick, false);
          container.addEventListener("mousedown", _this.handleDown, false);
          container.addEventListener("wheel", _this.handleWheel, false);
          container.addEventListener("mouseout", _this.handleOut, false);
          document.addEventListener("mousemove", _this.handleMove, false);
          document.addEventListener("mouseup", _this.handleUp, false);
          return _this;
        }
        MouseCaptor2.prototype.kill = function() {
          var container = this.container;
          container.removeEventListener("click", this.handleClick);
          container.removeEventListener("contextmenu", this.handleRightClick);
          container.removeEventListener("mousedown", this.handleDown);
          container.removeEventListener("wheel", this.handleWheel);
          container.removeEventListener("mouseout", this.handleOut);
          document.removeEventListener("mousemove", this.handleMove);
          document.removeEventListener("mouseup", this.handleUp);
        };
        MouseCaptor2.prototype.handleClick = function(e) {
          var _this = this;
          if (!this.enabled)
            return;
          this.clicks++;
          if (this.clicks === 2) {
            this.clicks = 0;
            if (typeof this.doubleClickTimeout === "number") {
              clearTimeout(this.doubleClickTimeout);
              this.doubleClickTimeout = null;
            }
            return this.handleDoubleClick(e);
          }
          setTimeout(function() {
            _this.clicks = 0;
            _this.doubleClickTimeout = null;
          }, DOUBLE_CLICK_TIMEOUT);
          if (this.draggedEvents < DRAGGED_EVENTS_TOLERANCE)
            this.emit("click", (0, captor_1.getMouseCoords)(e, this.container));
        };
        MouseCaptor2.prototype.handleRightClick = function(e) {
          if (!this.enabled)
            return;
          this.emit("rightClick", (0, captor_1.getMouseCoords)(e, this.container));
        };
        MouseCaptor2.prototype.handleDoubleClick = function(e) {
          if (!this.enabled)
            return;
          e.preventDefault();
          e.stopPropagation();
          var mouseCoords = (0, captor_1.getMouseCoords)(e, this.container);
          this.emit("doubleClick", mouseCoords);
          if (mouseCoords.sigmaDefaultPrevented)
            return;
          var camera = this.renderer.getCamera();
          var newRatio = camera.getBoundedRatio(camera.getState().ratio / DOUBLE_CLICK_ZOOMING_RATIO);
          camera.animate(this.renderer.getViewportZoomedState((0, captor_1.getPosition)(e, this.container), newRatio), {
            easing: "quadraticInOut",
            duration: DOUBLE_CLICK_ZOOMING_DURATION
          });
        };
        MouseCaptor2.prototype.handleDown = function(e) {
          if (!this.enabled)
            return;
          if (e.button === 0) {
            this.startCameraState = this.renderer.getCamera().getState();
            var _a = (0, captor_1.getPosition)(e, this.container), x = _a.x, y = _a.y;
            this.lastMouseX = x;
            this.lastMouseY = y;
            this.draggedEvents = 0;
            this.downStartTime = Date.now();
            this.isMouseDown = true;
          }
          this.emit("mousedown", (0, captor_1.getMouseCoords)(e, this.container));
        };
        MouseCaptor2.prototype.handleUp = function(e) {
          var _this = this;
          if (!this.enabled || !this.isMouseDown)
            return;
          var camera = this.renderer.getCamera();
          this.isMouseDown = false;
          if (typeof this.movingTimeout === "number") {
            clearTimeout(this.movingTimeout);
            this.movingTimeout = null;
          }
          var _a = (0, captor_1.getPosition)(e, this.container), x = _a.x, y = _a.y;
          var cameraState = camera.getState(), previousCameraState = camera.getPreviousState() || { x: 0, y: 0 };
          if (this.isMoving) {
            camera.animate({
              x: cameraState.x + MOUSE_INERTIA_RATIO * (cameraState.x - previousCameraState.x),
              y: cameraState.y + MOUSE_INERTIA_RATIO * (cameraState.y - previousCameraState.y)
            }, {
              duration: MOUSE_INERTIA_DURATION,
              easing: "quadraticOut"
            });
          } else if (this.lastMouseX !== x || this.lastMouseY !== y) {
            camera.setState({
              x: cameraState.x,
              y: cameraState.y
            });
          }
          this.isMoving = false;
          setTimeout(function() {
            _this.draggedEvents = 0;
            _this.renderer.refresh();
          }, 0);
          this.emit("mouseup", (0, captor_1.getMouseCoords)(e, this.container));
        };
        MouseCaptor2.prototype.handleMove = function(e) {
          var _this = this;
          if (!this.enabled)
            return;
          var mouseCoords = (0, captor_1.getMouseCoords)(e, this.container);
          this.emit("mousemovebody", mouseCoords);
          if (e.target === this.container) {
            this.emit("mousemove", mouseCoords);
          }
          if (mouseCoords.sigmaDefaultPrevented)
            return;
          if (this.isMouseDown) {
            this.isMoving = true;
            this.draggedEvents++;
            if (typeof this.movingTimeout === "number") {
              clearTimeout(this.movingTimeout);
            }
            this.movingTimeout = window.setTimeout(function() {
              _this.movingTimeout = null;
              _this.isMoving = false;
            }, DRAG_TIMEOUT);
            var camera = this.renderer.getCamera();
            var _a = (0, captor_1.getPosition)(e, this.container), eX = _a.x, eY = _a.y;
            var lastMouse = this.renderer.viewportToFramedGraph({
              x: this.lastMouseX,
              y: this.lastMouseY
            });
            var mouse = this.renderer.viewportToFramedGraph({ x: eX, y: eY });
            var offsetX = lastMouse.x - mouse.x, offsetY = lastMouse.y - mouse.y;
            var cameraState = camera.getState();
            var x = cameraState.x + offsetX, y = cameraState.y + offsetY;
            camera.setState({ x, y });
            this.lastMouseX = eX;
            this.lastMouseY = eY;
            e.preventDefault();
            e.stopPropagation();
          }
        };
        MouseCaptor2.prototype.handleWheel = function(e) {
          var _this = this;
          if (!this.enabled)
            return;
          e.preventDefault();
          e.stopPropagation();
          var delta = (0, captor_1.getWheelDelta)(e);
          if (!delta)
            return;
          var wheelCoords = (0, captor_1.getWheelCoords)(e, this.container);
          this.emit("wheel", wheelCoords);
          if (wheelCoords.sigmaDefaultPrevented)
            return;
          var ratioDiff = delta > 0 ? 1 / ZOOMING_RATIO : ZOOMING_RATIO;
          var camera = this.renderer.getCamera();
          var newRatio = camera.getBoundedRatio(camera.getState().ratio * ratioDiff);
          var wheelDirection = delta > 0 ? 1 : -1;
          var now = Date.now();
          if (this.currentWheelDirection === wheelDirection && this.lastWheelTriggerTime && now - this.lastWheelTriggerTime < MOUSE_ZOOM_DURATION / 5) {
            return;
          }
          camera.animate(this.renderer.getViewportZoomedState((0, captor_1.getPosition)(e, this.container), newRatio), {
            easing: "quadraticOut",
            duration: MOUSE_ZOOM_DURATION
          }, function() {
            _this.currentWheelDirection = 0;
          });
          this.currentWheelDirection = wheelDirection;
          this.lastWheelTriggerTime = now;
        };
        MouseCaptor2.prototype.handleOut = function() {
        };
        return MouseCaptor2;
      })(captor_1.default)
    );
    exports2.default = MouseCaptor;
  }
});

// node_modules/sigma/core/quadtree.js
var require_quadtree = __commonJS({
  "node_modules/sigma/core/quadtree.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.rectangleCollidesWithQuad = exports2.squareCollidesWithQuad = exports2.getCircumscribedAlignedRectangle = exports2.isRectangleAligned = void 0;
    var extend_1 = __importDefault(require_extend());
    var BLOCKS = 4;
    var MAX_LEVEL = 5;
    var OUTSIDE_BLOCK = 5460;
    var X_OFFSET = 0;
    var Y_OFFSET = 1;
    var WIDTH_OFFSET = 2;
    var HEIGHT_OFFSET = 3;
    var TOP_LEFT = 1;
    var TOP_RIGHT = 2;
    var BOTTOM_LEFT = 3;
    var BOTTOM_RIGHT = 4;
    var hasWarnedTooMuchOutside = false;
    function isRectangleAligned(rect) {
      return rect.x1 === rect.x2 || rect.y1 === rect.y2;
    }
    exports2.isRectangleAligned = isRectangleAligned;
    function getCircumscribedAlignedRectangle(rect) {
      var width = Math.sqrt(Math.pow(rect.x2 - rect.x1, 2) + Math.pow(rect.y2 - rect.y1, 2));
      var heightVector = {
        x: (rect.y1 - rect.y2) * rect.height / width,
        y: (rect.x2 - rect.x1) * rect.height / width
      };
      var tl = { x: rect.x1, y: rect.y1 };
      var tr = { x: rect.x2, y: rect.y2 };
      var bl = {
        x: rect.x1 + heightVector.x,
        y: rect.y1 + heightVector.y
      };
      var br = {
        x: rect.x2 + heightVector.x,
        y: rect.y2 + heightVector.y
      };
      var xL = Math.min(tl.x, tr.x, bl.x, br.x);
      var xR = Math.max(tl.x, tr.x, bl.x, br.x);
      var yT = Math.min(tl.y, tr.y, bl.y, br.y);
      var yB = Math.max(tl.y, tr.y, bl.y, br.y);
      return {
        x1: xL,
        y1: yT,
        x2: xR,
        y2: yT,
        height: yB - yT
      };
    }
    exports2.getCircumscribedAlignedRectangle = getCircumscribedAlignedRectangle;
    function squareCollidesWithQuad(x1, y1, w, qx, qy, qw, qh) {
      return x1 < qx + qw && x1 + w > qx && y1 < qy + qh && y1 + w > qy;
    }
    exports2.squareCollidesWithQuad = squareCollidesWithQuad;
    function rectangleCollidesWithQuad(x1, y1, w, h, qx, qy, qw, qh) {
      return x1 < qx + qw && x1 + w > qx && y1 < qy + qh && y1 + h > qy;
    }
    exports2.rectangleCollidesWithQuad = rectangleCollidesWithQuad;
    function pointIsInQuad(x, y, qx, qy, qw, qh) {
      var xmp = qx + qw / 2, ymp = qy + qh / 2, top = y < ymp, left = x < xmp;
      return top ? left ? TOP_LEFT : TOP_RIGHT : left ? BOTTOM_LEFT : BOTTOM_RIGHT;
    }
    function buildQuadrants(maxLevel, data) {
      var stack = [0, 0];
      while (stack.length) {
        var level = stack.pop(), block = stack.pop();
        var topLeftBlock = 4 * block + BLOCKS, topRightBlock = 4 * block + 2 * BLOCKS, bottomLeftBlock = 4 * block + 3 * BLOCKS, bottomRightBlock = 4 * block + 4 * BLOCKS;
        var x = data[block + X_OFFSET], y = data[block + Y_OFFSET], width = data[block + WIDTH_OFFSET], height = data[block + HEIGHT_OFFSET], hw = width / 2, hh = height / 2;
        data[topLeftBlock + X_OFFSET] = x;
        data[topLeftBlock + Y_OFFSET] = y;
        data[topLeftBlock + WIDTH_OFFSET] = hw;
        data[topLeftBlock + HEIGHT_OFFSET] = hh;
        data[topRightBlock + X_OFFSET] = x + hw;
        data[topRightBlock + Y_OFFSET] = y;
        data[topRightBlock + WIDTH_OFFSET] = hw;
        data[topRightBlock + HEIGHT_OFFSET] = hh;
        data[bottomLeftBlock + X_OFFSET] = x;
        data[bottomLeftBlock + Y_OFFSET] = y + hh;
        data[bottomLeftBlock + WIDTH_OFFSET] = hw;
        data[bottomLeftBlock + HEIGHT_OFFSET] = hh;
        data[bottomRightBlock + X_OFFSET] = x + hw;
        data[bottomRightBlock + Y_OFFSET] = y + hh;
        data[bottomRightBlock + WIDTH_OFFSET] = hw;
        data[bottomRightBlock + HEIGHT_OFFSET] = hh;
        if (level < maxLevel - 1) {
          stack.push(bottomRightBlock, level + 1);
          stack.push(bottomLeftBlock, level + 1);
          stack.push(topRightBlock, level + 1);
          stack.push(topLeftBlock, level + 1);
        }
      }
    }
    function insertNode(maxLevel, data, containers, key, x, y, size) {
      var x1 = x - size, y1 = y - size, w = size * 2;
      var level = 0, block = 0;
      while (true) {
        if (level >= maxLevel) {
          containers[block] = containers[block] || [];
          containers[block].push(key);
          return;
        }
        var topLeftBlock = 4 * block + BLOCKS, topRightBlock = 4 * block + 2 * BLOCKS, bottomLeftBlock = 4 * block + 3 * BLOCKS, bottomRightBlock = 4 * block + 4 * BLOCKS;
        var collidingWithTopLeft = squareCollidesWithQuad(x1, y1, w, data[topLeftBlock + X_OFFSET], data[topLeftBlock + Y_OFFSET], data[topLeftBlock + WIDTH_OFFSET], data[topLeftBlock + HEIGHT_OFFSET]);
        var collidingWithTopRight = squareCollidesWithQuad(x1, y1, w, data[topRightBlock + X_OFFSET], data[topRightBlock + Y_OFFSET], data[topRightBlock + WIDTH_OFFSET], data[topRightBlock + HEIGHT_OFFSET]);
        var collidingWithBottomLeft = squareCollidesWithQuad(x1, y1, w, data[bottomLeftBlock + X_OFFSET], data[bottomLeftBlock + Y_OFFSET], data[bottomLeftBlock + WIDTH_OFFSET], data[bottomLeftBlock + HEIGHT_OFFSET]);
        var collidingWithBottomRight = squareCollidesWithQuad(x1, y1, w, data[bottomRightBlock + X_OFFSET], data[bottomRightBlock + Y_OFFSET], data[bottomRightBlock + WIDTH_OFFSET], data[bottomRightBlock + HEIGHT_OFFSET]);
        var collisions = [
          collidingWithTopLeft,
          collidingWithTopRight,
          collidingWithBottomLeft,
          collidingWithBottomRight
        ].reduce(function(acc, current) {
          if (current)
            return acc + 1;
          else
            return acc;
        }, 0);
        if (collisions === 0 && level === 0) {
          containers[OUTSIDE_BLOCK].push(key);
          if (!hasWarnedTooMuchOutside && containers[OUTSIDE_BLOCK].length >= 5) {
            hasWarnedTooMuchOutside = true;
            console.warn("sigma/quadtree.insertNode: At least 5 nodes are outside the global quadtree zone. You might have a problem with the normalization function or the custom bounding box.");
          }
          return;
        }
        if (collisions === 0)
          throw new Error("sigma/quadtree.insertNode: no collision (level: ".concat(level, ", key: ").concat(key, ", x: ").concat(x, ", y: ").concat(y, ", size: ").concat(size, ")."));
        if (collisions === 3)
          throw new Error("sigma/quadtree.insertNode: 3 impossible collisions (level: ".concat(level, ", key: ").concat(key, ", x: ").concat(x, ", y: ").concat(y, ", size: ").concat(size, ")."));
        if (collisions > 1) {
          containers[block] = containers[block] || [];
          containers[block].push(key);
          return;
        } else {
          level++;
        }
        if (collidingWithTopLeft)
          block = topLeftBlock;
        if (collidingWithTopRight)
          block = topRightBlock;
        if (collidingWithBottomLeft)
          block = bottomLeftBlock;
        if (collidingWithBottomRight)
          block = bottomRightBlock;
      }
    }
    function getNodesInAxisAlignedRectangleArea(maxLevel, data, containers, x1, y1, w, h) {
      var stack = [0, 0];
      var collectedNodes = [];
      var container;
      while (stack.length) {
        var level = stack.pop(), block = stack.pop();
        container = containers[block];
        if (container)
          (0, extend_1.default)(collectedNodes, container);
        if (level >= maxLevel)
          continue;
        var topLeftBlock = 4 * block + BLOCKS, topRightBlock = 4 * block + 2 * BLOCKS, bottomLeftBlock = 4 * block + 3 * BLOCKS, bottomRightBlock = 4 * block + 4 * BLOCKS;
        var collidingWithTopLeft = rectangleCollidesWithQuad(x1, y1, w, h, data[topLeftBlock + X_OFFSET], data[topLeftBlock + Y_OFFSET], data[topLeftBlock + WIDTH_OFFSET], data[topLeftBlock + HEIGHT_OFFSET]);
        var collidingWithTopRight = rectangleCollidesWithQuad(x1, y1, w, h, data[topRightBlock + X_OFFSET], data[topRightBlock + Y_OFFSET], data[topRightBlock + WIDTH_OFFSET], data[topRightBlock + HEIGHT_OFFSET]);
        var collidingWithBottomLeft = rectangleCollidesWithQuad(x1, y1, w, h, data[bottomLeftBlock + X_OFFSET], data[bottomLeftBlock + Y_OFFSET], data[bottomLeftBlock + WIDTH_OFFSET], data[bottomLeftBlock + HEIGHT_OFFSET]);
        var collidingWithBottomRight = rectangleCollidesWithQuad(x1, y1, w, h, data[bottomRightBlock + X_OFFSET], data[bottomRightBlock + Y_OFFSET], data[bottomRightBlock + WIDTH_OFFSET], data[bottomRightBlock + HEIGHT_OFFSET]);
        if (collidingWithTopLeft)
          stack.push(topLeftBlock, level + 1);
        if (collidingWithTopRight)
          stack.push(topRightBlock, level + 1);
        if (collidingWithBottomLeft)
          stack.push(bottomLeftBlock, level + 1);
        if (collidingWithBottomRight)
          stack.push(bottomRightBlock, level + 1);
      }
      return collectedNodes;
    }
    var QuadTree = (
      /** @class */
      (function() {
        function QuadTree2(params) {
          var _a;
          if (params === void 0) {
            params = {};
          }
          this.containers = (_a = {}, _a[OUTSIDE_BLOCK] = [], _a);
          this.cache = null;
          this.lastRectangle = null;
          var L = Math.pow(4, MAX_LEVEL);
          this.data = new Float32Array(BLOCKS * ((4 * L - 1) / 3));
          if (params.boundaries)
            this.resize(params.boundaries);
          else
            this.resize({
              x: 0,
              y: 0,
              width: 1,
              height: 1
            });
        }
        QuadTree2.prototype.add = function(key, x, y, size) {
          insertNode(MAX_LEVEL, this.data, this.containers, key, x, y, size);
          return this;
        };
        QuadTree2.prototype.resize = function(boundaries) {
          this.clear();
          this.data[X_OFFSET] = boundaries.x;
          this.data[Y_OFFSET] = boundaries.y;
          this.data[WIDTH_OFFSET] = boundaries.width;
          this.data[HEIGHT_OFFSET] = boundaries.height;
          buildQuadrants(MAX_LEVEL, this.data);
        };
        QuadTree2.prototype.clear = function() {
          var _a;
          this.containers = (_a = {}, _a[OUTSIDE_BLOCK] = [], _a);
          return this;
        };
        QuadTree2.prototype.point = function(x, y) {
          var nodes = this.containers[OUTSIDE_BLOCK].slice();
          var block = 0, level = 0;
          do {
            if (this.containers[block])
              (0, extend_1.default)(nodes, this.containers[block]);
            var quad = pointIsInQuad(x, y, this.data[block + X_OFFSET], this.data[block + Y_OFFSET], this.data[block + WIDTH_OFFSET], this.data[block + HEIGHT_OFFSET]);
            block = 4 * block + quad * BLOCKS;
            level++;
          } while (level <= MAX_LEVEL);
          return nodes;
        };
        QuadTree2.prototype.rectangle = function(x1, y1, x2, y2, height) {
          var lr = this.lastRectangle;
          if (lr && x1 === lr.x1 && x2 === lr.x2 && y1 === lr.y1 && y2 === lr.y2 && height === lr.height) {
            return this.cache;
          }
          this.lastRectangle = {
            x1,
            y1,
            x2,
            y2,
            height
          };
          if (!isRectangleAligned(this.lastRectangle))
            this.lastRectangle = getCircumscribedAlignedRectangle(this.lastRectangle);
          this.cache = getNodesInAxisAlignedRectangleArea(MAX_LEVEL, this.data, this.containers, x1, y1, Math.abs(x1 - x2) || Math.abs(y1 - y2), height);
          (0, extend_1.default)(this.cache, this.containers[OUTSIDE_BLOCK]);
          return this.cache;
        };
        return QuadTree2;
      })()
    );
    exports2.default = QuadTree;
  }
});

// node_modules/sigma/core/labels.js
var require_labels = __commonJS({
  "node_modules/sigma/core/labels.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.edgeLabelsToDisplayFromNodes = exports2.LabelGrid = void 0;
    var LabelCandidate = (
      /** @class */
      (function() {
        function LabelCandidate2(key, size) {
          this.key = key;
          this.size = size;
        }
        LabelCandidate2.compare = function(first, second) {
          if (first.size > second.size)
            return -1;
          if (first.size < second.size)
            return 1;
          if (first.key > second.key)
            return 1;
          return -1;
        };
        return LabelCandidate2;
      })()
    );
    var LabelGrid = (
      /** @class */
      (function() {
        function LabelGrid2() {
          this.width = 0;
          this.height = 0;
          this.cellSize = 0;
          this.columns = 0;
          this.rows = 0;
          this.cells = {};
        }
        LabelGrid2.prototype.resizeAndClear = function(dimensions, cellSize) {
          this.width = dimensions.width;
          this.height = dimensions.height;
          this.cellSize = cellSize;
          this.columns = Math.ceil(dimensions.width / cellSize);
          this.rows = Math.ceil(dimensions.height / cellSize);
          this.cells = {};
        };
        LabelGrid2.prototype.getIndex = function(pos) {
          var xIndex = Math.floor(pos.x / this.cellSize);
          var yIndex = Math.floor(pos.y / this.cellSize);
          return yIndex * this.columns + xIndex;
        };
        LabelGrid2.prototype.add = function(key, size, pos) {
          var candidate = new LabelCandidate(key, size);
          var index = this.getIndex(pos);
          var cell = this.cells[index];
          if (!cell) {
            cell = [];
            this.cells[index] = cell;
          }
          cell.push(candidate);
        };
        LabelGrid2.prototype.organize = function() {
          for (var k in this.cells) {
            var cell = this.cells[k];
            cell.sort(LabelCandidate.compare);
          }
        };
        LabelGrid2.prototype.getLabelsToDisplay = function(ratio, density) {
          var cellArea = this.cellSize * this.cellSize;
          var scaledCellArea = cellArea / ratio / ratio;
          var scaledDensity = scaledCellArea * density / cellArea;
          var labelsToDisplayPerCell = Math.ceil(scaledDensity);
          var labels = [];
          for (var k in this.cells) {
            var cell = this.cells[k];
            for (var i = 0; i < Math.min(labelsToDisplayPerCell, cell.length); i++) {
              labels.push(cell[i].key);
            }
          }
          return labels;
        };
        return LabelGrid2;
      })()
    );
    exports2.LabelGrid = LabelGrid;
    function edgeLabelsToDisplayFromNodes(params) {
      var graph = params.graph, hoveredNode = params.hoveredNode, highlightedNodes = params.highlightedNodes, displayedNodeLabels = params.displayedNodeLabels;
      var worthyEdges = [];
      graph.forEachEdge(function(edge, _, source, target) {
        if (source === hoveredNode || target === hoveredNode || highlightedNodes.has(source) || highlightedNodes.has(target) || displayedNodeLabels.has(source) && displayedNodeLabels.has(target)) {
          worthyEdges.push(edge);
        }
      });
      return worthyEdges;
    }
    exports2.edgeLabelsToDisplayFromNodes = edgeLabelsToDisplayFromNodes;
  }
});

// node_modules/sigma/rendering/canvas/label.js
var require_label = __commonJS({
  "node_modules/sigma/rendering/canvas/label.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function drawLabel(context, data, settings) {
      if (!data.label)
        return;
      var size = settings.labelSize, font = settings.labelFont, weight = settings.labelWeight, color = settings.labelColor.attribute ? data[settings.labelColor.attribute] || settings.labelColor.color || "#000" : settings.labelColor.color;
      context.fillStyle = color;
      context.font = "".concat(weight, " ").concat(size, "px ").concat(font);
      context.fillText(data.label, data.x + data.size + 3, data.y + size / 3);
    }
    exports2.default = drawLabel;
  }
});

// node_modules/sigma/rendering/canvas/hover.js
var require_hover = __commonJS({
  "node_modules/sigma/rendering/canvas/hover.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var label_1 = __importDefault(require_label());
    function drawHover(context, data, settings) {
      var size = settings.labelSize, font = settings.labelFont, weight = settings.labelWeight;
      context.font = "".concat(weight, " ").concat(size, "px ").concat(font);
      context.fillStyle = "#FFF";
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.shadowBlur = 8;
      context.shadowColor = "#000";
      var PADDING = 2;
      if (typeof data.label === "string") {
        var textWidth = context.measureText(data.label).width, boxWidth = Math.round(textWidth + 5), boxHeight = Math.round(size + 2 * PADDING), radius = Math.max(data.size, size / 2) + PADDING;
        var angleRadian = Math.asin(boxHeight / 2 / radius);
        var xDeltaCoord = Math.sqrt(Math.abs(Math.pow(radius, 2) - Math.pow(boxHeight / 2, 2)));
        context.beginPath();
        context.moveTo(data.x + xDeltaCoord, data.y + boxHeight / 2);
        context.lineTo(data.x + radius + boxWidth, data.y + boxHeight / 2);
        context.lineTo(data.x + radius + boxWidth, data.y - boxHeight / 2);
        context.lineTo(data.x + xDeltaCoord, data.y - boxHeight / 2);
        context.arc(data.x, data.y, radius, angleRadian, -angleRadian);
        context.closePath();
        context.fill();
      } else {
        context.beginPath();
        context.arc(data.x, data.y, data.size + PADDING, 0, Math.PI * 2);
        context.closePath();
        context.fill();
      }
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      (0, label_1.default)(context, data, settings);
    }
    exports2.default = drawHover;
  }
});

// node_modules/sigma/rendering/canvas/edge-label.js
var require_edge_label = __commonJS({
  "node_modules/sigma/rendering/canvas/edge-label.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function drawEdgeLabel(context, edgeData, sourceData, targetData, settings) {
      var size = settings.edgeLabelSize, font = settings.edgeLabelFont, weight = settings.edgeLabelWeight, color = settings.edgeLabelColor.attribute ? edgeData[settings.edgeLabelColor.attribute] || settings.edgeLabelColor.color || "#000" : settings.edgeLabelColor.color;
      var label = edgeData.label;
      if (!label)
        return;
      context.fillStyle = color;
      context.font = "".concat(weight, " ").concat(size, "px ").concat(font);
      var sSize = sourceData.size;
      var tSize = targetData.size;
      var sx = sourceData.x;
      var sy = sourceData.y;
      var tx = targetData.x;
      var ty = targetData.y;
      var cx = (sx + tx) / 2;
      var cy = (sy + ty) / 2;
      var dx = tx - sx;
      var dy = ty - sy;
      var d = Math.sqrt(dx * dx + dy * dy);
      if (d < sSize + tSize)
        return;
      sx += dx * sSize / d;
      sy += dy * sSize / d;
      tx -= dx * tSize / d;
      ty -= dy * tSize / d;
      cx = (sx + tx) / 2;
      cy = (sy + ty) / 2;
      dx = tx - sx;
      dy = ty - sy;
      d = Math.sqrt(dx * dx + dy * dy);
      var textLength = context.measureText(label).width;
      if (textLength > d) {
        var ellipsis = "\u2026";
        label = label + ellipsis;
        textLength = context.measureText(label).width;
        while (textLength > d && label.length > 1) {
          label = label.slice(0, -2) + ellipsis;
          textLength = context.measureText(label).width;
        }
        if (label.length < 4)
          return;
      }
      var angle;
      if (dx > 0) {
        if (dy > 0)
          angle = Math.acos(dx / d);
        else
          angle = Math.asin(dy / d);
      } else {
        if (dy > 0)
          angle = Math.acos(dx / d) + Math.PI;
        else
          angle = Math.asin(dx / d) + Math.PI / 2;
      }
      context.save();
      context.translate(cx, cy);
      context.rotate(angle);
      context.fillText(label, -textLength / 2, edgeData.size / 2 + size);
      context.restore();
    }
    exports2.default = drawEdgeLabel;
  }
});

// node_modules/sigma/rendering/webgl/shaders/node.fast.vert.glsl.js
var require_node_fast_vert_glsl = __commonJS({
  "node_modules/sigma/rendering/webgl/shaders/node.fast.vert.glsl.js"(exports2, module2) {
    (() => {
      "use strict";
      var o = { d: (t2, e2) => {
        for (var n in e2) o.o(e2, n) && !o.o(t2, n) && Object.defineProperty(t2, n, { enumerable: true, get: e2[n] });
      }, o: (o2, t2) => Object.prototype.hasOwnProperty.call(o2, t2), r: (o2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(o2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(o2, "__esModule", { value: true });
      } }, t = {};
      o.r(t), o.d(t, { default: () => e });
      const e = "attribute vec2 a_position;\nattribute float a_size;\nattribute vec4 a_color;\n\nuniform float u_ratio;\nuniform float u_scale;\nuniform mat3 u_matrix;\n\nvarying vec4 v_color;\nvarying float v_border;\n\nconst float bias = 255.0 / 254.0;\n\nvoid main() {\n  gl_Position = vec4(\n    (u_matrix * vec3(a_position, 1)).xy,\n    0,\n    1\n  );\n\n  // Multiply the point size twice:\n  //  - x SCALING_RATIO to correct the canvas scaling\n  //  - x 2 to correct the formulae\n  gl_PointSize = a_size * u_ratio * u_scale * 2.0;\n\n  v_border = (1.0 / u_ratio) * (0.5 / a_size);\n\n  // Extract the color:\n  v_color = a_color;\n  v_color.a *= bias;\n}\n";
      module2.exports = t;
    })();
  }
});

// node_modules/sigma/rendering/webgl/shaders/node.fast.frag.glsl.js
var require_node_fast_frag_glsl = __commonJS({
  "node_modules/sigma/rendering/webgl/shaders/node.fast.frag.glsl.js"(exports2, module2) {
    (() => {
      "use strict";
      var e = { d: (n2, o2) => {
        for (var t in o2) e.o(o2, t) && !e.o(n2, t) && Object.defineProperty(n2, t, { enumerable: true, get: o2[t] });
      }, o: (e2, n2) => Object.prototype.hasOwnProperty.call(e2, n2), r: (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      } }, n = {};
      e.r(n), e.d(n, { default: () => o });
      const o = "precision mediump float;\n\nvarying vec4 v_color;\nvarying float v_border;\n\nconst float radius = 0.5;\nconst vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);\n\nvoid main(void) {\n  vec2 m = gl_PointCoord - vec2(0.5, 0.5);\n  float dist = radius - length(m);\n\n  float t = 0.0;\n  if (dist > v_border)\n    t = 1.0;\n  else if (dist > 0.0)\n    t = dist / v_border;\n\n  gl_FragColor = mix(transparent, v_color, t);\n}\n";
      module2.exports = n;
    })();
  }
});

// node_modules/sigma/rendering/webgl/shaders/utils.js
var require_utils2 = __commonJS({
  "node_modules/sigma/rendering/webgl/shaders/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.loadProgram = exports2.loadFragmentShader = exports2.loadVertexShader = void 0;
    function loadShader(type, gl, source) {
      var glType = type === "VERTEX" ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER;
      var shader = gl.createShader(glType);
      if (shader === null) {
        throw new Error("loadShader: error while creating the shader");
      }
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      var successfullyCompiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      if (!successfullyCompiled) {
        var infoLog = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error("loadShader: error while compiling the shader:\n".concat(infoLog, "\n").concat(source));
      }
      return shader;
    }
    function loadVertexShader(gl, source) {
      return loadShader("VERTEX", gl, source);
    }
    exports2.loadVertexShader = loadVertexShader;
    function loadFragmentShader(gl, source) {
      return loadShader("FRAGMENT", gl, source);
    }
    exports2.loadFragmentShader = loadFragmentShader;
    function loadProgram(gl, shaders) {
      var program = gl.createProgram();
      if (program === null) {
        throw new Error("loadProgram: error while creating the program.");
      }
      var i, l;
      for (i = 0, l = shaders.length; i < l; i++)
        gl.attachShader(program, shaders[i]);
      gl.linkProgram(program);
      var successfullyLinked = gl.getProgramParameter(program, gl.LINK_STATUS);
      if (!successfullyLinked) {
        gl.deleteProgram(program);
        throw new Error("loadProgram: error while linking the program.");
      }
      return program;
    }
    exports2.loadProgram = loadProgram;
  }
});

// node_modules/sigma/rendering/webgl/programs/common/program.js
var require_program = __commonJS({
  "node_modules/sigma/rendering/webgl/programs/common/program.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AbstractProgram = void 0;
    var utils_1 = require_utils2();
    var AbstractProgram = (
      /** @class */
      (function() {
        function AbstractProgram2(gl, vertexShaderSource, fragmentShaderSource, points, attributes) {
          this.array = new Float32Array();
          this.points = points;
          this.attributes = attributes;
          this.gl = gl;
          this.vertexShaderSource = vertexShaderSource;
          this.fragmentShaderSource = fragmentShaderSource;
          var buffer = gl.createBuffer();
          if (buffer === null)
            throw new Error("AbstractProgram: error while creating the buffer");
          this.buffer = buffer;
          gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
          this.vertexShader = (0, utils_1.loadVertexShader)(gl, this.vertexShaderSource);
          this.fragmentShader = (0, utils_1.loadFragmentShader)(gl, this.fragmentShaderSource);
          this.program = (0, utils_1.loadProgram)(gl, [this.vertexShader, this.fragmentShader]);
        }
        AbstractProgram2.prototype.bufferData = function() {
          var gl = this.gl;
          gl.bufferData(gl.ARRAY_BUFFER, this.array, gl.DYNAMIC_DRAW);
        };
        AbstractProgram2.prototype.allocate = function(capacity) {
          this.array = new Float32Array(this.points * this.attributes * capacity);
        };
        AbstractProgram2.prototype.hasNothingToRender = function() {
          return this.array.length === 0;
        };
        return AbstractProgram2;
      })()
    );
    exports2.AbstractProgram = AbstractProgram;
  }
});

// node_modules/sigma/rendering/webgl/programs/common/node.js
var require_node = __commonJS({
  "node_modules/sigma/rendering/webgl/programs/common/node.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createNodeCompoundProgram = exports2.AbstractNodeProgram = void 0;
    var program_1 = require_program();
    var AbstractNodeProgram = (
      /** @class */
      (function(_super) {
        __extends(AbstractNodeProgram2, _super);
        function AbstractNodeProgram2(gl, vertexShaderSource, fragmentShaderSource, points, attributes) {
          var _this = _super.call(this, gl, vertexShaderSource, fragmentShaderSource, points, attributes) || this;
          _this.positionLocation = gl.getAttribLocation(_this.program, "a_position");
          _this.sizeLocation = gl.getAttribLocation(_this.program, "a_size");
          _this.colorLocation = gl.getAttribLocation(_this.program, "a_color");
          var matrixLocation = gl.getUniformLocation(_this.program, "u_matrix");
          if (matrixLocation === null)
            throw new Error("AbstractNodeProgram: error while getting matrixLocation");
          _this.matrixLocation = matrixLocation;
          var ratioLocation = gl.getUniformLocation(_this.program, "u_ratio");
          if (ratioLocation === null)
            throw new Error("AbstractNodeProgram: error while getting ratioLocation");
          _this.ratioLocation = ratioLocation;
          var scaleLocation = gl.getUniformLocation(_this.program, "u_scale");
          if (scaleLocation === null)
            throw new Error("AbstractNodeProgram: error while getting scaleLocation");
          _this.scaleLocation = scaleLocation;
          return _this;
        }
        AbstractNodeProgram2.prototype.bind = function() {
          var gl = this.gl;
          gl.enableVertexAttribArray(this.positionLocation);
          gl.enableVertexAttribArray(this.sizeLocation);
          gl.enableVertexAttribArray(this.colorLocation);
          gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, this.attributes * Float32Array.BYTES_PER_ELEMENT, 0);
          gl.vertexAttribPointer(this.sizeLocation, 1, gl.FLOAT, false, this.attributes * Float32Array.BYTES_PER_ELEMENT, 8);
          gl.vertexAttribPointer(this.colorLocation, 4, gl.UNSIGNED_BYTE, true, this.attributes * Float32Array.BYTES_PER_ELEMENT, 12);
        };
        return AbstractNodeProgram2;
      })(program_1.AbstractProgram)
    );
    exports2.AbstractNodeProgram = AbstractNodeProgram;
    function createNodeCompoundProgram(programClasses) {
      return (
        /** @class */
        (function() {
          function NodeCompoundProgram(gl, renderer) {
            this.programs = programClasses.map(function(ProgramClass) {
              return new ProgramClass(gl, renderer);
            });
          }
          NodeCompoundProgram.prototype.bufferData = function() {
            this.programs.forEach(function(program) {
              return program.bufferData();
            });
          };
          NodeCompoundProgram.prototype.allocate = function(capacity) {
            this.programs.forEach(function(program) {
              return program.allocate(capacity);
            });
          };
          NodeCompoundProgram.prototype.bind = function() {
          };
          NodeCompoundProgram.prototype.render = function(params) {
            this.programs.forEach(function(program) {
              program.bind();
              program.bufferData();
              program.render(params);
            });
          };
          NodeCompoundProgram.prototype.process = function(data, hidden, offset) {
            this.programs.forEach(function(program) {
              return program.process(data, hidden, offset);
            });
          };
          return NodeCompoundProgram;
        })()
      );
    }
    exports2.createNodeCompoundProgram = createNodeCompoundProgram;
  }
});

// node_modules/sigma/rendering/webgl/programs/node.fast.js
var require_node_fast = __commonJS({
  "node_modules/sigma/rendering/webgl/programs/node.fast.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var utils_1 = require_utils();
    var node_fast_vert_glsl_1 = __importDefault(require_node_fast_vert_glsl());
    var node_fast_frag_glsl_1 = __importDefault(require_node_fast_frag_glsl());
    var node_1 = require_node();
    var POINTS = 1;
    var ATTRIBUTES = 4;
    var NodeFastProgram = (
      /** @class */
      (function(_super) {
        __extends(NodeFastProgram2, _super);
        function NodeFastProgram2(gl) {
          var _this = _super.call(this, gl, node_fast_vert_glsl_1.default, node_fast_frag_glsl_1.default, POINTS, ATTRIBUTES) || this;
          _this.bind();
          return _this;
        }
        NodeFastProgram2.prototype.process = function(data, hidden, offset) {
          var array = this.array;
          var i = offset * POINTS * ATTRIBUTES;
          if (hidden) {
            array[i++] = 0;
            array[i++] = 0;
            array[i++] = 0;
            array[i++] = 0;
            return;
          }
          var color = (0, utils_1.floatColor)(data.color);
          array[i++] = data.x;
          array[i++] = data.y;
          array[i++] = data.size;
          array[i] = color;
        };
        NodeFastProgram2.prototype.render = function(params) {
          if (this.hasNothingToRender())
            return;
          var gl = this.gl;
          var program = this.program;
          gl.useProgram(program);
          gl.uniform1f(this.ratioLocation, 1 / Math.sqrt(params.ratio));
          gl.uniform1f(this.scaleLocation, params.scalingRatio);
          gl.uniformMatrix3fv(this.matrixLocation, false, params.matrix);
          gl.drawArrays(gl.POINTS, 0, this.array.length / ATTRIBUTES);
        };
        return NodeFastProgram2;
      })(node_1.AbstractNodeProgram)
    );
    exports2.default = NodeFastProgram;
  }
});

// node_modules/sigma/rendering/webgl/shaders/edge.vert.glsl.js
var require_edge_vert_glsl = __commonJS({
  "node_modules/sigma/rendering/webgl/shaders/edge.vert.glsl.js"(exports2, module2) {
    (() => {
      "use strict";
      var e = { d: (n2, o2) => {
        for (var t in o2) e.o(o2, t) && !e.o(n2, t) && Object.defineProperty(n2, t, { enumerable: true, get: o2[t] });
      }, o: (e2, n2) => Object.prototype.hasOwnProperty.call(e2, n2), r: (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      } }, n = {};
      e.r(n), e.d(n, { default: () => o });
      const o = 'attribute vec4 a_color;\nattribute vec2 a_normal;\nattribute vec2 a_position;\n\nuniform mat3 u_matrix;\nuniform float u_sqrtZoomRatio;\nuniform float u_correctionRatio;\n\nvarying vec4 v_color;\nvarying vec2 v_normal;\nvarying float v_thickness;\n\nconst float minThickness = 1.7;\nconst float bias = 255.0 / 254.0;\n\nvoid main() {\n  float normalLength = length(a_normal);\n  vec2 unitNormal = a_normal / normalLength;\n\n  // We require edges to be at least `minThickness` pixels thick *on screen*\n  // (so we need to compensate the SQRT zoom ratio):\n  float pixelsThickness = max(normalLength, minThickness * u_sqrtZoomRatio);\n\n  // Then, we need to retrieve the normalized thickness of the edge in the WebGL\n  // referential (in a ([0, 1], [0, 1]) space), using our "magic" correction\n  // ratio:\n  float webGLThickness = pixelsThickness * u_correctionRatio;\n\n  // Finally, we adapt the edge thickness to the "SQRT rule" in sigma (so that\n  // items are not too big when zoomed in, and not too small when zoomed out).\n  // The exact computation should be `adapted = value * zoom / sqrt(zoom)`, but\n  // it\'s simpler like this:\n  float adaptedWebGLThickness = webGLThickness * u_sqrtZoomRatio;\n\n  // Here is the proper position of the vertex\n  gl_Position = vec4((u_matrix * vec3(a_position + unitNormal * adaptedWebGLThickness, 1)).xy, 0, 1);\n\n  // For the fragment shader though, we need a thickness that takes the "magic"\n  // correction ratio into account (as in webGLThickness), but so that the\n  // antialiasing effect does not depend on the zoom level. So here\'s yet\n  // another thickness version:\n  v_thickness = webGLThickness / u_sqrtZoomRatio;\n\n  v_normal = unitNormal;\n  v_color = a_color;\n  v_color.a *= bias;\n}\n';
      module2.exports = n;
    })();
  }
});

// node_modules/sigma/rendering/webgl/shaders/edge.frag.glsl.js
var require_edge_frag_glsl = __commonJS({
  "node_modules/sigma/rendering/webgl/shaders/edge.frag.glsl.js"(exports2, module2) {
    (() => {
      "use strict";
      var e = { d: (n2, t2) => {
        for (var o in t2) e.o(t2, o) && !e.o(n2, o) && Object.defineProperty(n2, o, { enumerable: true, get: t2[o] });
      }, o: (e2, n2) => Object.prototype.hasOwnProperty.call(e2, n2), r: (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      } }, n = {};
      e.r(n), e.d(n, { default: () => t });
      const t = "precision mediump float;\n\nvarying vec4 v_color;\nvarying vec2 v_normal;\nvarying float v_thickness;\n\nconst float feather = 0.001;\nconst vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);\n\nvoid main(void) {\n  float dist = length(v_normal) * v_thickness;\n\n  float t = smoothstep(\n    v_thickness - feather,\n    v_thickness,\n    dist\n  );\n\n  gl_FragColor = mix(v_color, transparent, t);\n}\n";
      module2.exports = n;
    })();
  }
});

// node_modules/sigma/rendering/webgl/programs/common/edge.js
var require_edge = __commonJS({
  "node_modules/sigma/rendering/webgl/programs/common/edge.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createEdgeCompoundProgram = exports2.AbstractEdgeProgram = void 0;
    var program_1 = require_program();
    var AbstractEdgeProgram = (
      /** @class */
      (function(_super) {
        __extends(AbstractEdgeProgram2, _super);
        function AbstractEdgeProgram2(gl, vertexShaderSource, fragmentShaderSource, points, attributes) {
          return _super.call(this, gl, vertexShaderSource, fragmentShaderSource, points, attributes) || this;
        }
        return AbstractEdgeProgram2;
      })(program_1.AbstractProgram)
    );
    exports2.AbstractEdgeProgram = AbstractEdgeProgram;
    function createEdgeCompoundProgram(programClasses) {
      return (
        /** @class */
        (function() {
          function EdgeCompoundProgram(gl, renderer) {
            this.programs = programClasses.map(function(ProgramClass) {
              return new ProgramClass(gl, renderer);
            });
          }
          EdgeCompoundProgram.prototype.bufferData = function() {
            this.programs.forEach(function(program) {
              return program.bufferData();
            });
          };
          EdgeCompoundProgram.prototype.allocate = function(capacity) {
            this.programs.forEach(function(program) {
              return program.allocate(capacity);
            });
          };
          EdgeCompoundProgram.prototype.bind = function() {
          };
          EdgeCompoundProgram.prototype.computeIndices = function() {
            this.programs.forEach(function(program) {
              return program.computeIndices();
            });
          };
          EdgeCompoundProgram.prototype.render = function(params) {
            this.programs.forEach(function(program) {
              program.bind();
              program.bufferData();
              program.render(params);
            });
          };
          EdgeCompoundProgram.prototype.process = function(sourceData, targetData, data, hidden, offset) {
            this.programs.forEach(function(program) {
              return program.process(sourceData, targetData, data, hidden, offset);
            });
          };
          return EdgeCompoundProgram;
        })()
      );
    }
    exports2.createEdgeCompoundProgram = createEdgeCompoundProgram;
  }
});

// node_modules/sigma/rendering/webgl/programs/edge.js
var require_edge2 = __commonJS({
  "node_modules/sigma/rendering/webgl/programs/edge.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var utils_1 = require_utils();
    var edge_vert_glsl_1 = __importDefault(require_edge_vert_glsl());
    var edge_frag_glsl_1 = __importDefault(require_edge_frag_glsl());
    var edge_1 = require_edge();
    var POINTS = 4;
    var ATTRIBUTES = 5;
    var STRIDE = POINTS * ATTRIBUTES;
    var EdgeProgram = (
      /** @class */
      (function(_super) {
        __extends(EdgeProgram2, _super);
        function EdgeProgram2(gl) {
          var _this = _super.call(this, gl, edge_vert_glsl_1.default, edge_frag_glsl_1.default, POINTS, ATTRIBUTES) || this;
          var indicesBuffer = gl.createBuffer();
          if (indicesBuffer === null)
            throw new Error("EdgeProgram: error while creating indicesBuffer");
          _this.indicesBuffer = indicesBuffer;
          _this.positionLocation = gl.getAttribLocation(_this.program, "a_position");
          _this.colorLocation = gl.getAttribLocation(_this.program, "a_color");
          _this.normalLocation = gl.getAttribLocation(_this.program, "a_normal");
          var matrixLocation = gl.getUniformLocation(_this.program, "u_matrix");
          if (matrixLocation === null)
            throw new Error("EdgeProgram: error while getting matrixLocation");
          _this.matrixLocation = matrixLocation;
          var correctionRatioLocation = gl.getUniformLocation(_this.program, "u_correctionRatio");
          if (correctionRatioLocation === null)
            throw new Error("EdgeProgram: error while getting correctionRatioLocation");
          _this.correctionRatioLocation = correctionRatioLocation;
          var sqrtZoomRatioLocation = gl.getUniformLocation(_this.program, "u_sqrtZoomRatio");
          if (sqrtZoomRatioLocation === null)
            throw new Error("EdgeProgram: error while getting sqrtZoomRatioLocation");
          _this.sqrtZoomRatioLocation = sqrtZoomRatioLocation;
          _this.canUse32BitsIndices = (0, utils_1.canUse32BitsIndices)(gl);
          _this.IndicesArray = _this.canUse32BitsIndices ? Uint32Array : Uint16Array;
          _this.indicesArray = new _this.IndicesArray();
          _this.indicesType = _this.canUse32BitsIndices ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT;
          _this.bind();
          return _this;
        }
        EdgeProgram2.prototype.bind = function() {
          var gl = this.gl;
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
          gl.enableVertexAttribArray(this.positionLocation);
          gl.enableVertexAttribArray(this.normalLocation);
          gl.enableVertexAttribArray(this.colorLocation);
          gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 0);
          gl.vertexAttribPointer(this.normalLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 8);
          gl.vertexAttribPointer(this.colorLocation, 4, gl.UNSIGNED_BYTE, true, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 16);
        };
        EdgeProgram2.prototype.computeIndices = function() {
          var l = this.array.length / ATTRIBUTES;
          var size = l + l / 2;
          var indices = new this.IndicesArray(size);
          for (var i = 0, c = 0; i < l; i += 4) {
            indices[c++] = i;
            indices[c++] = i + 1;
            indices[c++] = i + 2;
            indices[c++] = i + 2;
            indices[c++] = i + 1;
            indices[c++] = i + 3;
          }
          this.indicesArray = indices;
        };
        EdgeProgram2.prototype.bufferData = function() {
          _super.prototype.bufferData.call(this);
          var gl = this.gl;
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indicesArray, gl.STATIC_DRAW);
        };
        EdgeProgram2.prototype.process = function(sourceData, targetData, data, hidden, offset) {
          if (hidden) {
            for (var i_1 = offset * STRIDE, l = i_1 + STRIDE; i_1 < l; i_1++)
              this.array[i_1] = 0;
            return;
          }
          var thickness = data.size || 1, x1 = sourceData.x, y1 = sourceData.y, x2 = targetData.x, y2 = targetData.y, color = (0, utils_1.floatColor)(data.color);
          var dx = x2 - x1, dy = y2 - y1;
          var len = dx * dx + dy * dy, n1 = 0, n2 = 0;
          if (len) {
            len = 1 / Math.sqrt(len);
            n1 = -dy * len * thickness;
            n2 = dx * len * thickness;
          }
          var i = POINTS * ATTRIBUTES * offset;
          var array = this.array;
          array[i++] = x1;
          array[i++] = y1;
          array[i++] = n1;
          array[i++] = n2;
          array[i++] = color;
          array[i++] = x1;
          array[i++] = y1;
          array[i++] = -n1;
          array[i++] = -n2;
          array[i++] = color;
          array[i++] = x2;
          array[i++] = y2;
          array[i++] = n1;
          array[i++] = n2;
          array[i++] = color;
          array[i++] = x2;
          array[i++] = y2;
          array[i++] = -n1;
          array[i++] = -n2;
          array[i] = color;
        };
        EdgeProgram2.prototype.render = function(params) {
          if (this.hasNothingToRender())
            return;
          var gl = this.gl;
          var program = this.program;
          gl.useProgram(program);
          gl.uniformMatrix3fv(this.matrixLocation, false, params.matrix);
          gl.uniform1f(this.sqrtZoomRatioLocation, Math.sqrt(params.ratio));
          gl.uniform1f(this.correctionRatioLocation, params.correctionRatio);
          gl.drawElements(gl.TRIANGLES, this.indicesArray.length, this.indicesType, 0);
        };
        return EdgeProgram2;
      })(edge_1.AbstractEdgeProgram)
    );
    exports2.default = EdgeProgram;
  }
});

// node_modules/sigma/rendering/webgl/shaders/edge.arrowHead.vert.glsl.js
var require_edge_arrowHead_vert_glsl = __commonJS({
  "node_modules/sigma/rendering/webgl/shaders/edge.arrowHead.vert.glsl.js"(exports2, module2) {
    (() => {
      "use strict";
      var a = { d: (e2, t2) => {
        for (var o in t2) a.o(t2, o) && !a.o(e2, o) && Object.defineProperty(e2, o, { enumerable: true, get: t2[o] });
      }, o: (a2, e2) => Object.prototype.hasOwnProperty.call(a2, e2), r: (a2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(a2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(a2, "__esModule", { value: true });
      } }, e = {};
      a.r(e), a.d(e, { default: () => t });
      const t = "attribute vec2 a_position;\nattribute vec2 a_normal;\nattribute float a_radius;\nattribute vec4 a_color;\nattribute vec3 a_barycentric;\n\nuniform mat3 u_matrix;\nuniform float u_sqrtZoomRatio;\nuniform float u_correctionRatio;\n\nvarying vec4 v_color;\n\nconst float minThickness = 1.7;\nconst float bias = 255.0 / 254.0;\nconst float arrowHeadWidthLengthRatio = 0.66;\nconst float arrowHeadLengthThicknessRatio = 2.5;\n\nvoid main() {\n  float normalLength = length(a_normal);\n  vec2 unitNormal = a_normal / normalLength;\n\n  // These first computations are taken from edge.vert.glsl and\n  // edge.clamped.vert.glsl. Please read it to get better comments on what's\n  // happening:\n  float pixelsThickness = max(normalLength, minThickness * u_sqrtZoomRatio);\n  float webGLThickness = pixelsThickness * u_correctionRatio;\n  float adaptedWebGLThickness = webGLThickness * u_sqrtZoomRatio;\n  float adaptedWebGLNodeRadius = a_radius * 2.0 * u_correctionRatio * u_sqrtZoomRatio;\n  float adaptedWebGLArrowHeadLength = adaptedWebGLThickness * 2.0 * arrowHeadLengthThicknessRatio;\n  float adaptedWebGLArrowHeadHalfWidth = adaptedWebGLArrowHeadLength * arrowHeadWidthLengthRatio / 2.0;\n\n  float da = a_barycentric.x;\n  float db = a_barycentric.y;\n  float dc = a_barycentric.z;\n\n  vec2 delta = vec2(\n      da * (adaptedWebGLNodeRadius * unitNormal.y)\n    + db * ((adaptedWebGLNodeRadius + adaptedWebGLArrowHeadLength) * unitNormal.y + adaptedWebGLArrowHeadHalfWidth * unitNormal.x)\n    + dc * ((adaptedWebGLNodeRadius + adaptedWebGLArrowHeadLength) * unitNormal.y - adaptedWebGLArrowHeadHalfWidth * unitNormal.x),\n\n      da * (-adaptedWebGLNodeRadius * unitNormal.x)\n    + db * (-(adaptedWebGLNodeRadius + adaptedWebGLArrowHeadLength) * unitNormal.x + adaptedWebGLArrowHeadHalfWidth * unitNormal.y)\n    + dc * (-(adaptedWebGLNodeRadius + adaptedWebGLArrowHeadLength) * unitNormal.x - adaptedWebGLArrowHeadHalfWidth * unitNormal.y)\n  );\n\n  vec2 position = (u_matrix * vec3(a_position + delta, 1)).xy;\n\n  gl_Position = vec4(position, 0, 1);\n\n  // Extract the color:\n  v_color = a_color;\n  v_color.a *= bias;\n}\n";
      module2.exports = e;
    })();
  }
});

// node_modules/sigma/rendering/webgl/shaders/edge.arrowHead.frag.glsl.js
var require_edge_arrowHead_frag_glsl = __commonJS({
  "node_modules/sigma/rendering/webgl/shaders/edge.arrowHead.frag.glsl.js"(exports2, module2) {
    (() => {
      "use strict";
      var e = { d: (o2, r2) => {
        for (var t in r2) e.o(r2, t) && !e.o(o2, t) && Object.defineProperty(o2, t, { enumerable: true, get: r2[t] });
      }, o: (e2, o2) => Object.prototype.hasOwnProperty.call(e2, o2), r: (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      } }, o = {};
      e.r(o), e.d(o, { default: () => r });
      const r = "precision mediump float;\n\nvarying vec4 v_color;\n\nvoid main(void) {\n  gl_FragColor = v_color;\n}\n";
      module2.exports = o;
    })();
  }
});

// node_modules/sigma/rendering/webgl/programs/edge.arrowHead.js
var require_edge_arrowHead = __commonJS({
  "node_modules/sigma/rendering/webgl/programs/edge.arrowHead.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var utils_1 = require_utils();
    var edge_arrowHead_vert_glsl_1 = __importDefault(require_edge_arrowHead_vert_glsl());
    var edge_arrowHead_frag_glsl_1 = __importDefault(require_edge_arrowHead_frag_glsl());
    var edge_1 = require_edge();
    var POINTS = 3;
    var ATTRIBUTES = 9;
    var STRIDE = POINTS * ATTRIBUTES;
    var EdgeArrowHeadProgram = (
      /** @class */
      (function(_super) {
        __extends(EdgeArrowHeadProgram2, _super);
        function EdgeArrowHeadProgram2(gl) {
          var _this = _super.call(this, gl, edge_arrowHead_vert_glsl_1.default, edge_arrowHead_frag_glsl_1.default, POINTS, ATTRIBUTES) || this;
          _this.positionLocation = gl.getAttribLocation(_this.program, "a_position");
          _this.colorLocation = gl.getAttribLocation(_this.program, "a_color");
          _this.normalLocation = gl.getAttribLocation(_this.program, "a_normal");
          _this.radiusLocation = gl.getAttribLocation(_this.program, "a_radius");
          _this.barycentricLocation = gl.getAttribLocation(_this.program, "a_barycentric");
          var matrixLocation = gl.getUniformLocation(_this.program, "u_matrix");
          if (matrixLocation === null)
            throw new Error("EdgeArrowHeadProgram: error while getting matrixLocation");
          _this.matrixLocation = matrixLocation;
          var sqrtZoomRatioLocation = gl.getUniformLocation(_this.program, "u_sqrtZoomRatio");
          if (sqrtZoomRatioLocation === null)
            throw new Error("EdgeArrowHeadProgram: error while getting sqrtZoomRatioLocation");
          _this.sqrtZoomRatioLocation = sqrtZoomRatioLocation;
          var correctionRatioLocation = gl.getUniformLocation(_this.program, "u_correctionRatio");
          if (correctionRatioLocation === null)
            throw new Error("EdgeArrowHeadProgram: error while getting correctionRatioLocation");
          _this.correctionRatioLocation = correctionRatioLocation;
          _this.bind();
          return _this;
        }
        EdgeArrowHeadProgram2.prototype.bind = function() {
          var gl = this.gl;
          gl.enableVertexAttribArray(this.positionLocation);
          gl.enableVertexAttribArray(this.normalLocation);
          gl.enableVertexAttribArray(this.radiusLocation);
          gl.enableVertexAttribArray(this.colorLocation);
          gl.enableVertexAttribArray(this.barycentricLocation);
          gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 0);
          gl.vertexAttribPointer(this.normalLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 8);
          gl.vertexAttribPointer(this.radiusLocation, 1, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 16);
          gl.vertexAttribPointer(this.colorLocation, 4, gl.UNSIGNED_BYTE, true, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 20);
          gl.vertexAttribPointer(this.barycentricLocation, 3, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 24);
        };
        EdgeArrowHeadProgram2.prototype.computeIndices = function() {
        };
        EdgeArrowHeadProgram2.prototype.process = function(sourceData, targetData, data, hidden, offset) {
          if (hidden) {
            for (var i_1 = offset * STRIDE, l = i_1 + STRIDE; i_1 < l; i_1++)
              this.array[i_1] = 0;
            return;
          }
          var thickness = data.size || 1, radius = targetData.size || 1, x1 = sourceData.x, y1 = sourceData.y, x2 = targetData.x, y2 = targetData.y, color = (0, utils_1.floatColor)(data.color);
          var dx = x2 - x1, dy = y2 - y1;
          var len = dx * dx + dy * dy, n1 = 0, n2 = 0;
          if (len) {
            len = 1 / Math.sqrt(len);
            n1 = -dy * len * thickness;
            n2 = dx * len * thickness;
          }
          var i = POINTS * ATTRIBUTES * offset;
          var array = this.array;
          array[i++] = x2;
          array[i++] = y2;
          array[i++] = -n1;
          array[i++] = -n2;
          array[i++] = radius;
          array[i++] = color;
          array[i++] = 1;
          array[i++] = 0;
          array[i++] = 0;
          array[i++] = x2;
          array[i++] = y2;
          array[i++] = -n1;
          array[i++] = -n2;
          array[i++] = radius;
          array[i++] = color;
          array[i++] = 0;
          array[i++] = 1;
          array[i++] = 0;
          array[i++] = x2;
          array[i++] = y2;
          array[i++] = -n1;
          array[i++] = -n2;
          array[i++] = radius;
          array[i++] = color;
          array[i++] = 0;
          array[i++] = 0;
          array[i] = 1;
        };
        EdgeArrowHeadProgram2.prototype.render = function(params) {
          if (this.hasNothingToRender())
            return;
          var gl = this.gl;
          var program = this.program;
          gl.useProgram(program);
          gl.uniformMatrix3fv(this.matrixLocation, false, params.matrix);
          gl.uniform1f(this.sqrtZoomRatioLocation, Math.sqrt(params.ratio));
          gl.uniform1f(this.correctionRatioLocation, params.correctionRatio);
          gl.drawArrays(gl.TRIANGLES, 0, this.array.length / ATTRIBUTES);
        };
        return EdgeArrowHeadProgram2;
      })(edge_1.AbstractEdgeProgram)
    );
    exports2.default = EdgeArrowHeadProgram;
  }
});

// node_modules/sigma/rendering/webgl/shaders/edge.clamped.vert.glsl.js
var require_edge_clamped_vert_glsl = __commonJS({
  "node_modules/sigma/rendering/webgl/shaders/edge.clamped.vert.glsl.js"(exports2, module2) {
    (() => {
      "use strict";
      var e = { d: (o2, n2) => {
        for (var t in n2) e.o(n2, t) && !e.o(o2, t) && Object.defineProperty(o2, t, { enumerable: true, get: n2[t] });
      }, o: (e2, o2) => Object.prototype.hasOwnProperty.call(e2, o2), r: (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      } }, o = {};
      e.r(o), e.d(o, { default: () => n });
      const n = "attribute vec4 a_color;\nattribute vec2 a_normal;\nattribute vec2 a_position;\nattribute float a_radius;\n\nuniform mat3 u_matrix;\nuniform float u_sqrtZoomRatio;\nuniform float u_correctionRatio;\n\nvarying vec4 v_color;\nvarying vec2 v_normal;\nvarying float v_thickness;\n\nconst float minThickness = 1.7;\nconst float bias = 255.0 / 254.0;\nconst float arrowHeadLengthThicknessRatio = 2.5;\n\nvoid main() {\n  float normalLength = length(a_normal);\n  vec2 unitNormal = a_normal / normalLength;\n\n  // These first computations are taken from edge.vert.glsl. Please read it to\n  // get better comments on what's happening:\n  float pixelsThickness = max(normalLength, minThickness * u_sqrtZoomRatio);\n  float webGLThickness = pixelsThickness * u_correctionRatio;\n  float adaptedWebGLThickness = webGLThickness * u_sqrtZoomRatio;\n\n  // Here, we move the point to leave space for the arrow head:\n  float direction = sign(a_radius);\n  float adaptedWebGLNodeRadius = direction * a_radius * 2.0 * u_correctionRatio * u_sqrtZoomRatio;\n  float adaptedWebGLArrowHeadLength = adaptedWebGLThickness * 2.0 * arrowHeadLengthThicknessRatio;\n\n  vec2 compensationVector = vec2(-direction * unitNormal.y, direction * unitNormal.x) * (adaptedWebGLNodeRadius + adaptedWebGLArrowHeadLength);\n\n  // Here is the proper position of the vertex\n  gl_Position = vec4((u_matrix * vec3(a_position + unitNormal * adaptedWebGLThickness + compensationVector, 1)).xy, 0, 1);\n\n  v_thickness = webGLThickness / u_sqrtZoomRatio;\n\n  v_normal = unitNormal;\n  v_color = a_color;\n  v_color.a *= bias;\n}\n";
      module2.exports = o;
    })();
  }
});

// node_modules/sigma/rendering/webgl/programs/edge.clamped.js
var require_edge_clamped = __commonJS({
  "node_modules/sigma/rendering/webgl/programs/edge.clamped.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var edge_1 = require_edge();
    var utils_1 = require_utils();
    var edge_clamped_vert_glsl_1 = __importDefault(require_edge_clamped_vert_glsl());
    var edge_frag_glsl_1 = __importDefault(require_edge_frag_glsl());
    var POINTS = 4;
    var ATTRIBUTES = 6;
    var STRIDE = POINTS * ATTRIBUTES;
    var EdgeClampedProgram = (
      /** @class */
      (function(_super) {
        __extends(EdgeClampedProgram2, _super);
        function EdgeClampedProgram2(gl) {
          var _this = _super.call(this, gl, edge_clamped_vert_glsl_1.default, edge_frag_glsl_1.default, POINTS, ATTRIBUTES) || this;
          var indicesBuffer = gl.createBuffer();
          if (indicesBuffer === null)
            throw new Error("EdgeClampedProgram: error while getting resolutionLocation");
          _this.indicesBuffer = indicesBuffer;
          _this.positionLocation = gl.getAttribLocation(_this.program, "a_position");
          _this.colorLocation = gl.getAttribLocation(_this.program, "a_color");
          _this.normalLocation = gl.getAttribLocation(_this.program, "a_normal");
          _this.radiusLocation = gl.getAttribLocation(_this.program, "a_radius");
          var matrixLocation = gl.getUniformLocation(_this.program, "u_matrix");
          if (matrixLocation === null)
            throw new Error("EdgeClampedProgram: error while getting matrixLocation");
          _this.matrixLocation = matrixLocation;
          var sqrtZoomRatioLocation = gl.getUniformLocation(_this.program, "u_sqrtZoomRatio");
          if (sqrtZoomRatioLocation === null)
            throw new Error("EdgeClampedProgram: error while getting cameraRatioLocation");
          _this.sqrtZoomRatioLocation = sqrtZoomRatioLocation;
          var correctionRatioLocation = gl.getUniformLocation(_this.program, "u_correctionRatio");
          if (correctionRatioLocation === null)
            throw new Error("EdgeClampedProgram: error while getting viewportRatioLocation");
          _this.correctionRatioLocation = correctionRatioLocation;
          _this.canUse32BitsIndices = (0, utils_1.canUse32BitsIndices)(gl);
          _this.IndicesArray = _this.canUse32BitsIndices ? Uint32Array : Uint16Array;
          _this.indicesArray = new _this.IndicesArray();
          _this.indicesType = _this.canUse32BitsIndices ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT;
          _this.bind();
          return _this;
        }
        EdgeClampedProgram2.prototype.bind = function() {
          var gl = this.gl;
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
          gl.enableVertexAttribArray(this.positionLocation);
          gl.enableVertexAttribArray(this.normalLocation);
          gl.enableVertexAttribArray(this.colorLocation);
          gl.enableVertexAttribArray(this.radiusLocation);
          gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 0);
          gl.vertexAttribPointer(this.normalLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 8);
          gl.vertexAttribPointer(this.colorLocation, 4, gl.UNSIGNED_BYTE, true, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 16);
          gl.vertexAttribPointer(this.radiusLocation, 1, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 20);
        };
        EdgeClampedProgram2.prototype.process = function(sourceData, targetData, data, hidden, offset) {
          if (hidden) {
            for (var i_1 = offset * STRIDE, l = i_1 + STRIDE; i_1 < l; i_1++)
              this.array[i_1] = 0;
            return;
          }
          var thickness = data.size || 1, x1 = sourceData.x, y1 = sourceData.y, x2 = targetData.x, y2 = targetData.y, radius = targetData.size || 1, color = (0, utils_1.floatColor)(data.color);
          var dx = x2 - x1, dy = y2 - y1;
          var len = dx * dx + dy * dy, n1 = 0, n2 = 0;
          if (len) {
            len = 1 / Math.sqrt(len);
            n1 = -dy * len * thickness;
            n2 = dx * len * thickness;
          }
          var i = POINTS * ATTRIBUTES * offset;
          var array = this.array;
          array[i++] = x1;
          array[i++] = y1;
          array[i++] = n1;
          array[i++] = n2;
          array[i++] = color;
          array[i++] = 0;
          array[i++] = x1;
          array[i++] = y1;
          array[i++] = -n1;
          array[i++] = -n2;
          array[i++] = color;
          array[i++] = 0;
          array[i++] = x2;
          array[i++] = y2;
          array[i++] = n1;
          array[i++] = n2;
          array[i++] = color;
          array[i++] = radius;
          array[i++] = x2;
          array[i++] = y2;
          array[i++] = -n1;
          array[i++] = -n2;
          array[i++] = color;
          array[i] = -radius;
        };
        EdgeClampedProgram2.prototype.computeIndices = function() {
          var l = this.array.length / ATTRIBUTES;
          var size = l + l / 2;
          var indices = new this.IndicesArray(size);
          for (var i = 0, c = 0; i < l; i += 4) {
            indices[c++] = i;
            indices[c++] = i + 1;
            indices[c++] = i + 2;
            indices[c++] = i + 2;
            indices[c++] = i + 1;
            indices[c++] = i + 3;
          }
          this.indicesArray = indices;
        };
        EdgeClampedProgram2.prototype.bufferData = function() {
          _super.prototype.bufferData.call(this);
          var gl = this.gl;
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indicesArray, gl.STATIC_DRAW);
        };
        EdgeClampedProgram2.prototype.render = function(params) {
          if (this.hasNothingToRender())
            return;
          var gl = this.gl;
          var program = this.program;
          gl.useProgram(program);
          gl.uniformMatrix3fv(this.matrixLocation, false, params.matrix);
          gl.uniform1f(this.sqrtZoomRatioLocation, Math.sqrt(params.ratio));
          gl.uniform1f(this.correctionRatioLocation, params.correctionRatio);
          gl.drawElements(gl.TRIANGLES, this.indicesArray.length, this.indicesType, 0);
        };
        return EdgeClampedProgram2;
      })(edge_1.AbstractEdgeProgram)
    );
    exports2.default = EdgeClampedProgram;
  }
});

// node_modules/sigma/rendering/webgl/programs/edge.arrow.js
var require_edge_arrow = __commonJS({
  "node_modules/sigma/rendering/webgl/programs/edge.arrow.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var edge_1 = require_edge();
    var edge_arrowHead_1 = __importDefault(require_edge_arrowHead());
    var edge_clamped_1 = __importDefault(require_edge_clamped());
    var EdgeArrowProgram = (0, edge_1.createEdgeCompoundProgram)([edge_clamped_1.default, edge_arrowHead_1.default]);
    exports2.default = EdgeArrowProgram;
  }
});

// node_modules/sigma/settings.js
var require_settings = __commonJS({
  "node_modules/sigma/settings.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.resolveSettings = exports2.validateSettings = exports2.DEFAULT_EDGE_PROGRAM_CLASSES = exports2.DEFAULT_NODE_PROGRAM_CLASSES = exports2.DEFAULT_SETTINGS = void 0;
    var utils_1 = require_utils();
    var label_1 = __importDefault(require_label());
    var hover_1 = __importDefault(require_hover());
    var edge_label_1 = __importDefault(require_edge_label());
    var node_fast_1 = __importDefault(require_node_fast());
    var edge_1 = __importDefault(require_edge2());
    var edge_arrow_1 = __importDefault(require_edge_arrow());
    exports2.DEFAULT_SETTINGS = {
      // Performance
      hideEdgesOnMove: false,
      hideLabelsOnMove: false,
      renderLabels: true,
      renderEdgeLabels: false,
      enableEdgeClickEvents: false,
      enableEdgeWheelEvents: false,
      enableEdgeHoverEvents: false,
      // Component rendering
      defaultNodeColor: "#999",
      defaultNodeType: "circle",
      defaultEdgeColor: "#ccc",
      defaultEdgeType: "line",
      labelFont: "Arial",
      labelSize: 14,
      labelWeight: "normal",
      labelColor: { color: "#000" },
      edgeLabelFont: "Arial",
      edgeLabelSize: 14,
      edgeLabelWeight: "normal",
      edgeLabelColor: { attribute: "color" },
      stagePadding: 30,
      // Labels
      labelDensity: 1,
      labelGridCellSize: 100,
      labelRenderedSizeThreshold: 6,
      // Reducers
      nodeReducer: null,
      edgeReducer: null,
      // Features
      zIndex: false,
      minCameraRatio: null,
      maxCameraRatio: null,
      // Renderers
      labelRenderer: label_1.default,
      hoverRenderer: hover_1.default,
      edgeLabelRenderer: edge_label_1.default,
      // Lifecycle
      allowInvalidContainer: false,
      // Program classes
      nodeProgramClasses: {},
      nodeHoverProgramClasses: {},
      edgeProgramClasses: {}
    };
    exports2.DEFAULT_NODE_PROGRAM_CLASSES = {
      circle: node_fast_1.default
    };
    exports2.DEFAULT_EDGE_PROGRAM_CLASSES = {
      arrow: edge_arrow_1.default,
      line: edge_1.default
    };
    function validateSettings(settings) {
      if (typeof settings.labelDensity !== "number" || settings.labelDensity < 0) {
        throw new Error("Settings: invalid `labelDensity`. Expecting a positive number.");
      }
      var minCameraRatio = settings.minCameraRatio, maxCameraRatio = settings.maxCameraRatio;
      if (typeof minCameraRatio === "number" && typeof maxCameraRatio === "number" && maxCameraRatio < minCameraRatio) {
        throw new Error("Settings: invalid camera ratio boundaries. Expecting `maxCameraRatio` to be greater than `minCameraRatio`.");
      }
    }
    exports2.validateSettings = validateSettings;
    function resolveSettings(settings) {
      var resolvedSettings = (0, utils_1.assign)({}, exports2.DEFAULT_SETTINGS, settings);
      resolvedSettings.nodeProgramClasses = (0, utils_1.assign)({}, exports2.DEFAULT_NODE_PROGRAM_CLASSES, resolvedSettings.nodeProgramClasses);
      resolvedSettings.edgeProgramClasses = (0, utils_1.assign)({}, exports2.DEFAULT_EDGE_PROGRAM_CLASSES, resolvedSettings.edgeProgramClasses);
      return resolvedSettings;
    }
    exports2.resolveSettings = resolveSettings;
  }
});

// node_modules/sigma/core/captors/touch.js
var require_touch = __commonJS({
  "node_modules/sigma/core/captors/touch.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __read = exports2 && exports2.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var captor_1 = __importStar(require_captor());
    var DRAG_TIMEOUT = 200;
    var TOUCH_INERTIA_RATIO = 3;
    var TOUCH_INERTIA_DURATION = 200;
    var TouchCaptor = (
      /** @class */
      (function(_super) {
        __extends(TouchCaptor2, _super);
        function TouchCaptor2(container, renderer) {
          var _this = _super.call(this, container, renderer) || this;
          _this.enabled = true;
          _this.isMoving = false;
          _this.hasMoved = false;
          _this.touchMode = 0;
          _this.startTouchesPositions = [];
          _this.handleStart = _this.handleStart.bind(_this);
          _this.handleLeave = _this.handleLeave.bind(_this);
          _this.handleMove = _this.handleMove.bind(_this);
          container.addEventListener("touchstart", _this.handleStart, false);
          container.addEventListener("touchend", _this.handleLeave, false);
          container.addEventListener("touchcancel", _this.handleLeave, false);
          container.addEventListener("touchmove", _this.handleMove, false);
          return _this;
        }
        TouchCaptor2.prototype.kill = function() {
          var container = this.container;
          container.removeEventListener("touchstart", this.handleStart);
          container.removeEventListener("touchend", this.handleLeave);
          container.removeEventListener("touchcancel", this.handleLeave);
          container.removeEventListener("touchmove", this.handleMove);
        };
        TouchCaptor2.prototype.getDimensions = function() {
          return {
            width: this.container.offsetWidth,
            height: this.container.offsetHeight
          };
        };
        TouchCaptor2.prototype.dispatchRelatedMouseEvent = function(type, e, touch, emitter) {
          var mousePosition = touch || e.touches[0];
          var mouseEvent = new MouseEvent(type, {
            clientX: mousePosition.clientX,
            clientY: mousePosition.clientY,
            altKey: e.altKey,
            ctrlKey: e.ctrlKey
          });
          mouseEvent.isFakeSigmaMouseEvent = true;
          (emitter || this.container).dispatchEvent(mouseEvent);
        };
        TouchCaptor2.prototype.handleStart = function(e) {
          var _this = this;
          if (!this.enabled)
            return;
          e.preventDefault();
          if (e.touches.length === 1)
            this.dispatchRelatedMouseEvent("mousedown", e);
          var touches = (0, captor_1.getTouchesArray)(e.touches);
          this.touchMode = touches.length;
          this.startCameraState = this.renderer.getCamera().getState();
          this.startTouchesPositions = touches.map(function(touch) {
            return (0, captor_1.getPosition)(touch, _this.container);
          });
          this.lastTouches = touches;
          this.lastTouchesPositions = this.startTouchesPositions;
          if (this.touchMode === 2) {
            var _a = __read(this.startTouchesPositions, 2), _b = _a[0], x0 = _b.x, y0 = _b.y, _c = _a[1], x1 = _c.x, y1 = _c.y;
            this.startTouchesAngle = Math.atan2(y1 - y0, x1 - x0);
            this.startTouchesDistance = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
          }
          this.emit("touchdown", (0, captor_1.getTouchCoords)(e, this.container));
        };
        TouchCaptor2.prototype.handleLeave = function(e) {
          if (!this.enabled)
            return;
          e.preventDefault();
          if (e.touches.length === 0 && this.lastTouches && this.lastTouches.length) {
            this.dispatchRelatedMouseEvent("mouseup", e, this.lastTouches[0], document);
            if (!this.hasMoved) {
              this.dispatchRelatedMouseEvent("click", e, this.lastTouches[0]);
            }
          }
          if (this.movingTimeout) {
            this.isMoving = false;
            clearTimeout(this.movingTimeout);
          }
          switch (this.touchMode) {
            case 2:
              if (e.touches.length === 1) {
                this.handleStart(e);
                e.preventDefault();
                break;
              }
            /* falls through */
            case 1:
              if (this.isMoving) {
                var camera = this.renderer.getCamera();
                var cameraState = camera.getState(), previousCameraState = camera.getPreviousState() || { x: 0, y: 0 };
                camera.animate({
                  x: cameraState.x + TOUCH_INERTIA_RATIO * (cameraState.x - previousCameraState.x),
                  y: cameraState.y + TOUCH_INERTIA_RATIO * (cameraState.y - previousCameraState.y)
                }, {
                  duration: TOUCH_INERTIA_DURATION,
                  easing: "quadraticOut"
                });
              }
              this.hasMoved = false;
              this.isMoving = false;
              this.touchMode = 0;
              break;
          }
          this.emit("touchup", (0, captor_1.getTouchCoords)(e, this.container));
        };
        TouchCaptor2.prototype.handleMove = function(e) {
          var _a;
          var _this = this;
          if (!this.enabled)
            return;
          e.preventDefault();
          if (e.touches.length === 1)
            this.dispatchRelatedMouseEvent("mousemove", e);
          var touches = (0, captor_1.getTouchesArray)(e.touches);
          var touchesPositions = touches.map(function(touch) {
            return (0, captor_1.getPosition)(touch, _this.container);
          });
          this.lastTouches = touches;
          this.lastTouchesPositions = touchesPositions;
          this.hasMoved || (this.hasMoved = touchesPositions.some(function(position, idx) {
            var startPosition = _this.startTouchesPositions[idx];
            return position.x !== startPosition.x || position.y !== startPosition.y;
          }));
          if (!this.hasMoved) {
            return;
          }
          this.isMoving = true;
          if (this.movingTimeout)
            clearTimeout(this.movingTimeout);
          this.movingTimeout = window.setTimeout(function() {
            _this.isMoving = false;
          }, DRAG_TIMEOUT);
          var camera = this.renderer.getCamera();
          var startCameraState = this.startCameraState;
          switch (this.touchMode) {
            case 1: {
              var _b = this.renderer.viewportToFramedGraph((this.startTouchesPositions || [])[0]), xStart = _b.x, yStart = _b.y;
              var _c = this.renderer.viewportToFramedGraph(touchesPositions[0]), x = _c.x, y = _c.y;
              camera.setState({
                x: startCameraState.x + xStart - x,
                y: startCameraState.y + yStart - y
              });
              break;
            }
            case 2: {
              var newCameraState = {};
              var _d = touchesPositions[0], x0 = _d.x, y0 = _d.y;
              var _e = touchesPositions[1], x1 = _e.x, y1 = _e.y;
              var angleDiff = Math.atan2(y1 - y0, x1 - x0) - this.startTouchesAngle;
              var ratioDiff = Math.hypot(y1 - y0, x1 - x0) / this.startTouchesDistance;
              var newRatio = camera.getBoundedRatio(startCameraState.ratio / ratioDiff);
              newCameraState.ratio = newRatio;
              newCameraState.angle = startCameraState.angle + angleDiff;
              var dimensions = this.getDimensions();
              var touchGraphPosition = this.renderer.viewportToFramedGraph((this.startTouchesPositions || [])[0], { cameraState: startCameraState });
              var smallestDimension = Math.min(dimensions.width, dimensions.height);
              var dx = smallestDimension / dimensions.width;
              var dy = smallestDimension / dimensions.height;
              var ratio = newRatio / smallestDimension;
              var x = x0 - smallestDimension / 2 / dx;
              var y = y0 - smallestDimension / 2 / dy;
              _a = __read([
                x * Math.cos(-newCameraState.angle) - y * Math.sin(-newCameraState.angle),
                y * Math.cos(-newCameraState.angle) + x * Math.sin(-newCameraState.angle)
              ], 2), x = _a[0], y = _a[1];
              newCameraState.x = touchGraphPosition.x - x * ratio;
              newCameraState.y = touchGraphPosition.y + y * ratio;
              camera.setState(newCameraState);
              break;
            }
          }
          this.emit("touchmove", (0, captor_1.getTouchCoords)(e, this.container));
        };
        return TouchCaptor2;
      })(captor_1.default)
    );
    exports2.default = TouchCaptor;
  }
});

// node_modules/sigma/utils/edge-collisions.js
var require_edge_collisions = __commonJS({
  "node_modules/sigma/utils/edge-collisions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.doEdgeCollideWithPoint = exports2.isPixelColored = void 0;
    function isPixelColored(gl, x, y) {
      var pixels = new Uint8Array(4);
      gl.readPixels(x, gl.drawingBufferHeight - y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
      return pixels[3] > 0;
    }
    exports2.isPixelColored = isPixelColored;
    function doEdgeCollideWithPoint(x, y, xS, yS, xT, yT, thickness) {
      if (x < xS - thickness && x < xT - thickness)
        return false;
      if (y < yS - thickness && y < yT - thickness)
        return false;
      if (x > xS + thickness && x > xT + thickness)
        return false;
      if (y > yS + thickness && y > yT + thickness)
        return false;
      var distance = Math.abs((xT - xS) * (yS - y) - (xS - x) * (yT - yS)) / Math.sqrt(Math.pow(xT - xS, 2) + Math.pow(yT - yS, 2));
      return distance < thickness / 2;
    }
    exports2.doEdgeCollideWithPoint = doEdgeCollideWithPoint;
  }
});

// node_modules/sigma/sigma.js
var require_sigma = __commonJS({
  "node_modules/sigma/sigma.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __assign = exports2 && exports2.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __values = exports2 && exports2.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var extend_1 = __importDefault(require_extend());
    var camera_1 = __importDefault(require_camera());
    var mouse_1 = __importDefault(require_mouse());
    var quadtree_1 = __importDefault(require_quadtree());
    var types_1 = require_types();
    var utils_1 = require_utils();
    var labels_1 = require_labels();
    var settings_1 = require_settings();
    var touch_1 = __importDefault(require_touch());
    var matrices_1 = require_matrices();
    var edge_collisions_1 = require_edge_collisions();
    var X_LABEL_MARGIN = 150;
    var Y_LABEL_MARGIN = 50;
    function applyNodeDefaults(settings, key, data) {
      if (!data.hasOwnProperty("x") || !data.hasOwnProperty("y"))
        throw new Error('Sigma: could not find a valid position (x, y) for node "'.concat(key, '". All your nodes must have a number "x" and "y". Maybe your forgot to apply a layout or your "nodeReducer" is not returning the correct data?'));
      if (!data.color)
        data.color = settings.defaultNodeColor;
      if (!data.label && data.label !== "")
        data.label = null;
      if (data.label !== void 0 && data.label !== null)
        data.label = "" + data.label;
      else
        data.label = null;
      if (!data.size)
        data.size = 2;
      if (!data.hasOwnProperty("hidden"))
        data.hidden = false;
      if (!data.hasOwnProperty("highlighted"))
        data.highlighted = false;
      if (!data.hasOwnProperty("forceLabel"))
        data.forceLabel = false;
      if (!data.type || data.type === "")
        data.type = settings.defaultNodeType;
      if (!data.zIndex)
        data.zIndex = 0;
      return data;
    }
    function applyEdgeDefaults(settings, key, data) {
      if (!data.color)
        data.color = settings.defaultEdgeColor;
      if (!data.label)
        data.label = "";
      if (!data.size)
        data.size = 0.5;
      if (!data.hasOwnProperty("hidden"))
        data.hidden = false;
      if (!data.hasOwnProperty("forceLabel"))
        data.forceLabel = false;
      if (!data.type || data.type === "")
        data.type = settings.defaultEdgeType;
      if (!data.zIndex)
        data.zIndex = 0;
      return data;
    }
    var Sigma2 = (
      /** @class */
      (function(_super) {
        __extends(Sigma3, _super);
        function Sigma3(graph, container, settings) {
          if (settings === void 0) {
            settings = {};
          }
          var _this = _super.call(this) || this;
          _this.elements = {};
          _this.canvasContexts = {};
          _this.webGLContexts = {};
          _this.activeListeners = {};
          _this.quadtree = new quadtree_1.default();
          _this.labelGrid = new labels_1.LabelGrid();
          _this.nodeDataCache = {};
          _this.edgeDataCache = {};
          _this.nodesWithForcedLabels = [];
          _this.edgesWithForcedLabels = [];
          _this.nodeExtent = { x: [0, 1], y: [0, 1] };
          _this.matrix = (0, matrices_1.identity)();
          _this.invMatrix = (0, matrices_1.identity)();
          _this.correctionRatio = 1;
          _this.customBBox = null;
          _this.normalizationFunction = (0, utils_1.createNormalizationFunction)({
            x: [0, 1],
            y: [0, 1]
          });
          _this.cameraSizeRatio = 1;
          _this.width = 0;
          _this.height = 0;
          _this.pixelRatio = (0, utils_1.getPixelRatio)();
          _this.displayedLabels = /* @__PURE__ */ new Set();
          _this.highlightedNodes = /* @__PURE__ */ new Set();
          _this.hoveredNode = null;
          _this.hoveredEdge = null;
          _this.renderFrame = null;
          _this.renderHighlightedNodesFrame = null;
          _this.needToProcess = false;
          _this.needToSoftProcess = false;
          _this.checkEdgesEventsFrame = null;
          _this.nodePrograms = {};
          _this.nodeHoverPrograms = {};
          _this.edgePrograms = {};
          _this.settings = (0, settings_1.resolveSettings)(settings);
          (0, settings_1.validateSettings)(_this.settings);
          (0, utils_1.validateGraph)(graph);
          if (!(container instanceof HTMLElement))
            throw new Error("Sigma: container should be an html element.");
          _this.graph = graph;
          _this.container = container;
          _this.createWebGLContext("edges", { preserveDrawingBuffer: true });
          _this.createCanvasContext("edgeLabels");
          _this.createWebGLContext("nodes");
          _this.createCanvasContext("labels");
          _this.createCanvasContext("hovers");
          _this.createWebGLContext("hoverNodes");
          _this.createCanvasContext("mouse");
          for (var key in _this.webGLContexts) {
            var gl = _this.webGLContexts[key];
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.enable(gl.BLEND);
          }
          for (var type in _this.settings.nodeProgramClasses) {
            var NodeProgramClass = _this.settings.nodeProgramClasses[type];
            _this.nodePrograms[type] = new NodeProgramClass(_this.webGLContexts.nodes, _this);
            var NodeHoverProgram = NodeProgramClass;
            if (type in _this.settings.nodeHoverProgramClasses) {
              NodeHoverProgram = _this.settings.nodeHoverProgramClasses[type];
            }
            _this.nodeHoverPrograms[type] = new NodeHoverProgram(_this.webGLContexts.hoverNodes, _this);
          }
          for (var type in _this.settings.edgeProgramClasses) {
            var EdgeProgramClass = _this.settings.edgeProgramClasses[type];
            _this.edgePrograms[type] = new EdgeProgramClass(_this.webGLContexts.edges, _this);
          }
          _this.resize();
          _this.camera = new camera_1.default();
          _this.bindCameraHandlers();
          _this.mouseCaptor = new mouse_1.default(_this.elements.mouse, _this);
          _this.touchCaptor = new touch_1.default(_this.elements.mouse, _this);
          _this.bindEventHandlers();
          _this.bindGraphHandlers();
          _this.handleSettingsUpdate();
          _this.process();
          _this.render();
          return _this;
        }
        Sigma3.prototype.createCanvas = function(id) {
          var canvas = (0, utils_1.createElement)("canvas", {
            position: "absolute"
          }, {
            class: "sigma-".concat(id)
          });
          this.elements[id] = canvas;
          this.container.appendChild(canvas);
          return canvas;
        };
        Sigma3.prototype.createCanvasContext = function(id) {
          var canvas = this.createCanvas(id);
          var contextOptions = {
            preserveDrawingBuffer: false,
            antialias: false
          };
          this.canvasContexts[id] = canvas.getContext("2d", contextOptions);
          return this;
        };
        Sigma3.prototype.createWebGLContext = function(id, options) {
          var canvas = this.createCanvas(id);
          var contextOptions = __assign({ preserveDrawingBuffer: false, antialias: false }, options || {});
          var context;
          context = canvas.getContext("webgl2", contextOptions);
          if (!context)
            context = canvas.getContext("webgl", contextOptions);
          if (!context)
            context = canvas.getContext("experimental-webgl", contextOptions);
          this.webGLContexts[id] = context;
          return this;
        };
        Sigma3.prototype.bindCameraHandlers = function() {
          var _this = this;
          this.activeListeners.camera = function() {
            _this._scheduleRefresh();
          };
          this.camera.on("updated", this.activeListeners.camera);
          return this;
        };
        Sigma3.prototype.mouseIsOnNode = function(_a, _b, size) {
          var x = _a.x, y = _a.y;
          var nodeX = _b.x, nodeY = _b.y;
          return x > nodeX - size && x < nodeX + size && y > nodeY - size && y < nodeY + size && Math.sqrt(Math.pow(x - nodeX, 2) + Math.pow(y - nodeY, 2)) < size;
        };
        Sigma3.prototype.getQuadNodes = function(position) {
          var mouseGraphPosition = this.viewportToFramedGraph(position);
          return this.quadtree.point(mouseGraphPosition.x, 1 - mouseGraphPosition.y);
        };
        Sigma3.prototype.getNodeAtPosition = function(position) {
          var x = position.x, y = position.y;
          var quadNodes = this.getQuadNodes(position);
          var minDistance = Infinity, nodeAtPosition = null;
          for (var i = 0, l = quadNodes.length; i < l; i++) {
            var node = quadNodes[i];
            var data = this.nodeDataCache[node];
            var nodePosition = this.framedGraphToViewport(data);
            var size = this.scaleSize(data.size);
            if (!data.hidden && this.mouseIsOnNode(position, nodePosition, size)) {
              var distance = Math.sqrt(Math.pow(x - nodePosition.x, 2) + Math.pow(y - nodePosition.y, 2));
              if (distance < minDistance) {
                minDistance = distance;
                nodeAtPosition = node;
              }
            }
          }
          return nodeAtPosition;
        };
        Sigma3.prototype.bindEventHandlers = function() {
          var _this = this;
          this.activeListeners.handleResize = function() {
            _this.needToSoftProcess = true;
            _this._scheduleRefresh();
          };
          window.addEventListener("resize", this.activeListeners.handleResize);
          this.activeListeners.handleMove = function(e) {
            var baseEvent = {
              event: e,
              preventSigmaDefault: function() {
                e.preventSigmaDefault();
              }
            };
            var nodeToHover = _this.getNodeAtPosition(e);
            if (nodeToHover && _this.hoveredNode !== nodeToHover && !_this.nodeDataCache[nodeToHover].hidden) {
              if (_this.hoveredNode)
                _this.emit("leaveNode", __assign(__assign({}, baseEvent), { node: _this.hoveredNode }));
              _this.hoveredNode = nodeToHover;
              _this.emit("enterNode", __assign(__assign({}, baseEvent), { node: nodeToHover }));
              _this.scheduleHighlightedNodesRender();
              return;
            }
            if (_this.hoveredNode) {
              var data = _this.nodeDataCache[_this.hoveredNode];
              var pos = _this.framedGraphToViewport(data);
              var size = _this.scaleSize(data.size);
              if (!_this.mouseIsOnNode(e, pos, size)) {
                var node = _this.hoveredNode;
                _this.hoveredNode = null;
                _this.emit("leaveNode", __assign(__assign({}, baseEvent), { node }));
                _this.scheduleHighlightedNodesRender();
                return;
              }
            }
            if (_this.settings.enableEdgeHoverEvents === true) {
              _this.checkEdgeHoverEvents(baseEvent);
            } else if (_this.settings.enableEdgeHoverEvents === "debounce") {
              if (!_this.checkEdgesEventsFrame)
                _this.checkEdgesEventsFrame = (0, utils_1.requestFrame)(function() {
                  _this.checkEdgeHoverEvents(baseEvent);
                  _this.checkEdgesEventsFrame = null;
                });
            }
          };
          var createMouseListener = function(eventType) {
            return function(e) {
              var baseEvent = {
                event: e,
                preventSigmaDefault: function() {
                  e.preventSigmaDefault();
                }
              };
              var isFakeSigmaMouseEvent = e.original.isFakeSigmaMouseEvent;
              var nodeAtPosition = isFakeSigmaMouseEvent ? _this.getNodeAtPosition(e) : _this.hoveredNode;
              if (nodeAtPosition)
                return _this.emit("".concat(eventType, "Node"), __assign(__assign({}, baseEvent), { node: nodeAtPosition }));
              if (eventType === "wheel" ? _this.settings.enableEdgeWheelEvents : _this.settings.enableEdgeClickEvents) {
                var edge = _this.getEdgeAtPoint(e.x, e.y);
                if (edge)
                  return _this.emit("".concat(eventType, "Edge"), __assign(__assign({}, baseEvent), { edge }));
              }
              return _this.emit("".concat(eventType, "Stage"), baseEvent);
            };
          };
          this.activeListeners.handleClick = createMouseListener("click");
          this.activeListeners.handleRightClick = createMouseListener("rightClick");
          this.activeListeners.handleDoubleClick = createMouseListener("doubleClick");
          this.activeListeners.handleWheel = createMouseListener("wheel");
          this.activeListeners.handleDown = createMouseListener("down");
          this.mouseCaptor.on("mousemove", this.activeListeners.handleMove);
          this.mouseCaptor.on("click", this.activeListeners.handleClick);
          this.mouseCaptor.on("rightClick", this.activeListeners.handleRightClick);
          this.mouseCaptor.on("doubleClick", this.activeListeners.handleDoubleClick);
          this.mouseCaptor.on("wheel", this.activeListeners.handleWheel);
          this.mouseCaptor.on("mousedown", this.activeListeners.handleDown);
          return this;
        };
        Sigma3.prototype.bindGraphHandlers = function() {
          var _this = this;
          var graph = this.graph;
          this.activeListeners.graphUpdate = function() {
            _this.needToProcess = true;
            _this._scheduleRefresh();
          };
          this.activeListeners.softGraphUpdate = function() {
            _this.needToSoftProcess = true;
            _this._scheduleRefresh();
          };
          this.activeListeners.dropNodeGraphUpdate = function(e) {
            delete _this.nodeDataCache[e.key];
            if (_this.hoveredNode === e.key)
              _this.hoveredNode = null;
            _this.activeListeners.graphUpdate();
          };
          this.activeListeners.dropEdgeGraphUpdate = function(e) {
            delete _this.edgeDataCache[e.key];
            if (_this.hoveredEdge === e.key)
              _this.hoveredEdge = null;
            _this.activeListeners.graphUpdate();
          };
          this.activeListeners.clearEdgesGraphUpdate = function() {
            _this.edgeDataCache = {};
            _this.hoveredEdge = null;
            _this.activeListeners.graphUpdate();
          };
          this.activeListeners.clearGraphUpdate = function() {
            _this.nodeDataCache = {};
            _this.hoveredNode = null;
            _this.activeListeners.clearEdgesGraphUpdate();
          };
          graph.on("nodeAdded", this.activeListeners.graphUpdate);
          graph.on("nodeDropped", this.activeListeners.dropNodeGraphUpdate);
          graph.on("nodeAttributesUpdated", this.activeListeners.softGraphUpdate);
          graph.on("eachNodeAttributesUpdated", this.activeListeners.graphUpdate);
          graph.on("edgeAdded", this.activeListeners.graphUpdate);
          graph.on("edgeDropped", this.activeListeners.dropEdgeGraphUpdate);
          graph.on("edgeAttributesUpdated", this.activeListeners.softGraphUpdate);
          graph.on("eachEdgeAttributesUpdated", this.activeListeners.graphUpdate);
          graph.on("edgesCleared", this.activeListeners.clearEdgesGraphUpdate);
          graph.on("cleared", this.activeListeners.clearGraphUpdate);
          return this;
        };
        Sigma3.prototype.unbindGraphHandlers = function() {
          var graph = this.graph;
          graph.removeListener("nodeAdded", this.activeListeners.graphUpdate);
          graph.removeListener("nodeDropped", this.activeListeners.dropNodeGraphUpdate);
          graph.removeListener("nodeAttributesUpdated", this.activeListeners.softGraphUpdate);
          graph.removeListener("eachNodeAttributesUpdated", this.activeListeners.graphUpdate);
          graph.removeListener("edgeAdded", this.activeListeners.graphUpdate);
          graph.removeListener("edgeDropped", this.activeListeners.dropEdgeGraphUpdate);
          graph.removeListener("edgeAttributesUpdated", this.activeListeners.softGraphUpdate);
          graph.removeListener("eachEdgeAttributesUpdated", this.activeListeners.graphUpdate);
          graph.removeListener("edgesCleared", this.activeListeners.clearEdgesGraphUpdate);
          graph.removeListener("cleared", this.activeListeners.clearGraphUpdate);
        };
        Sigma3.prototype.checkEdgeHoverEvents = function(payload) {
          var edgeToHover = this.hoveredNode ? null : this.getEdgeAtPoint(payload.event.x, payload.event.y);
          if (edgeToHover !== this.hoveredEdge) {
            if (this.hoveredEdge)
              this.emit("leaveEdge", __assign(__assign({}, payload), { edge: this.hoveredEdge }));
            if (edgeToHover)
              this.emit("enterEdge", __assign(__assign({}, payload), { edge: edgeToHover }));
            this.hoveredEdge = edgeToHover;
          }
          return this;
        };
        Sigma3.prototype.getEdgeAtPoint = function(x, y) {
          var e_1, _a;
          var _this = this;
          var _b = this, edgeDataCache = _b.edgeDataCache, nodeDataCache = _b.nodeDataCache;
          if (!(0, edge_collisions_1.isPixelColored)(this.webGLContexts.edges, x * this.pixelRatio, y * this.pixelRatio))
            return null;
          var _c = this.viewportToGraph({ x, y }), graphX = _c.x, graphY = _c.y;
          var transformationRatio = 0;
          this.graph.someEdge(function(key, _, sourceId, targetId, _a2, _b2) {
            var xs = _a2.x, ys = _a2.y;
            var xt = _b2.x, yt = _b2.y;
            if (edgeDataCache[key].hidden || nodeDataCache[sourceId].hidden || nodeDataCache[targetId].hidden)
              return false;
            if (xs !== xt || ys !== yt) {
              var graphLength = Math.sqrt(Math.pow(xt - xs, 2) + Math.pow(yt - ys, 2));
              var _c2 = _this.graphToViewport({ x: xs, y: ys }), vp_xs = _c2.x, vp_ys = _c2.y;
              var _d = _this.graphToViewport({ x: xt, y: yt }), vp_xt = _d.x, vp_yt = _d.y;
              var viewportLength = Math.sqrt(Math.pow(vp_xt - vp_xs, 2) + Math.pow(vp_yt - vp_ys, 2));
              transformationRatio = graphLength / viewportLength;
              return true;
            }
          });
          if (!transformationRatio)
            return null;
          var edges = this.graph.filterEdges(function(key, edgeAttributes, sourceId, targetId, sourcePosition, targetPosition) {
            if (edgeDataCache[key].hidden || nodeDataCache[sourceId].hidden || nodeDataCache[targetId].hidden)
              return false;
            if ((0, edge_collisions_1.doEdgeCollideWithPoint)(
              graphX,
              graphY,
              sourcePosition.x,
              sourcePosition.y,
              targetPosition.x,
              targetPosition.y,
              // Adapt the edge size to the zoom ratio:
              edgeDataCache[key].size * transformationRatio / _this.cameraSizeRatio
            )) {
              return true;
            }
          });
          if (edges.length === 0)
            return null;
          var selectedEdge = edges[edges.length - 1];
          var highestZIndex = -Infinity;
          try {
            for (var edges_1 = __values(edges), edges_1_1 = edges_1.next(); !edges_1_1.done; edges_1_1 = edges_1.next()) {
              var edge = edges_1_1.value;
              var zIndex = this.graph.getEdgeAttribute(edge, "zIndex");
              if (zIndex >= highestZIndex) {
                selectedEdge = edge;
                highestZIndex = zIndex;
              }
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (edges_1_1 && !edges_1_1.done && (_a = edges_1.return)) _a.call(edges_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
          return selectedEdge;
        };
        Sigma3.prototype.process = function(keepArrays) {
          var _this = this;
          if (keepArrays === void 0) {
            keepArrays = false;
          }
          var graph = this.graph;
          var settings = this.settings;
          var dimensions = this.getDimensions();
          var nodeZExtent = [Infinity, -Infinity];
          var edgeZExtent = [Infinity, -Infinity];
          this.quadtree.clear();
          this.labelGrid.resizeAndClear(dimensions, settings.labelGridCellSize);
          this.highlightedNodes = /* @__PURE__ */ new Set();
          this.nodeExtent = (0, utils_1.graphExtent)(graph);
          this.nodesWithForcedLabels = [];
          this.edgesWithForcedLabels = [];
          var nullCamera = new camera_1.default();
          var nullCameraMatrix = (0, utils_1.matrixFromCamera)(nullCamera.getState(), this.getDimensions(), this.getGraphDimensions(), this.getSetting("stagePadding") || 0);
          this.normalizationFunction = (0, utils_1.createNormalizationFunction)(this.customBBox || this.nodeExtent);
          var nodesPerPrograms = {};
          var nodes = graph.nodes();
          for (var i = 0, l = nodes.length; i < l; i++) {
            var node = nodes[i];
            var attr = Object.assign({}, graph.getNodeAttributes(node));
            if (settings.nodeReducer)
              attr = settings.nodeReducer(node, attr);
            var data = applyNodeDefaults(this.settings, node, attr);
            nodesPerPrograms[data.type] = (nodesPerPrograms[data.type] || 0) + 1;
            this.nodeDataCache[node] = data;
            this.normalizationFunction.applyTo(data);
            if (data.forceLabel)
              this.nodesWithForcedLabels.push(node);
            if (this.settings.zIndex) {
              if (data.zIndex < nodeZExtent[0])
                nodeZExtent[0] = data.zIndex;
              if (data.zIndex > nodeZExtent[1])
                nodeZExtent[1] = data.zIndex;
            }
          }
          for (var type in this.nodePrograms) {
            if (!this.nodePrograms.hasOwnProperty(type)) {
              throw new Error('Sigma: could not find a suitable program for node type "'.concat(type, '"!'));
            }
            if (!keepArrays)
              this.nodePrograms[type].allocate(nodesPerPrograms[type] || 0);
            nodesPerPrograms[type] = 0;
          }
          if (this.settings.zIndex && nodeZExtent[0] !== nodeZExtent[1])
            nodes = (0, utils_1.zIndexOrdering)(nodeZExtent, function(node2) {
              return _this.nodeDataCache[node2].zIndex;
            }, nodes);
          for (var i = 0, l = nodes.length; i < l; i++) {
            var node = nodes[i];
            var data = this.nodeDataCache[node];
            this.quadtree.add(node, data.x, 1 - data.y, data.size / this.width);
            if (typeof data.label === "string" && !data.hidden)
              this.labelGrid.add(node, data.size, this.framedGraphToViewport(data, { matrix: nullCameraMatrix }));
            var nodeProgram = this.nodePrograms[data.type];
            if (!nodeProgram)
              throw new Error('Sigma: could not find a suitable program for node type "'.concat(data.type, '"!'));
            nodeProgram.process(data, data.hidden, nodesPerPrograms[data.type]++);
            if (data.highlighted && !data.hidden)
              this.highlightedNodes.add(node);
          }
          this.labelGrid.organize();
          var edgesPerPrograms = {};
          var edges = graph.edges();
          for (var i = 0, l = edges.length; i < l; i++) {
            var edge = edges[i];
            var attr = Object.assign({}, graph.getEdgeAttributes(edge));
            if (settings.edgeReducer)
              attr = settings.edgeReducer(edge, attr);
            var data = applyEdgeDefaults(this.settings, edge, attr);
            edgesPerPrograms[data.type] = (edgesPerPrograms[data.type] || 0) + 1;
            this.edgeDataCache[edge] = data;
            if (data.forceLabel && !data.hidden)
              this.edgesWithForcedLabels.push(edge);
            if (this.settings.zIndex) {
              if (data.zIndex < edgeZExtent[0])
                edgeZExtent[0] = data.zIndex;
              if (data.zIndex > edgeZExtent[1])
                edgeZExtent[1] = data.zIndex;
            }
          }
          for (var type in this.edgePrograms) {
            if (!this.edgePrograms.hasOwnProperty(type)) {
              throw new Error('Sigma: could not find a suitable program for edge type "'.concat(type, '"!'));
            }
            if (!keepArrays)
              this.edgePrograms[type].allocate(edgesPerPrograms[type] || 0);
            edgesPerPrograms[type] = 0;
          }
          if (this.settings.zIndex && edgeZExtent[0] !== edgeZExtent[1])
            edges = (0, utils_1.zIndexOrdering)(edgeZExtent, function(edge2) {
              return _this.edgeDataCache[edge2].zIndex;
            }, edges);
          for (var i = 0, l = edges.length; i < l; i++) {
            var edge = edges[i];
            var data = this.edgeDataCache[edge];
            var extremities = graph.extremities(edge), sourceData = this.nodeDataCache[extremities[0]], targetData = this.nodeDataCache[extremities[1]];
            var hidden = data.hidden || sourceData.hidden || targetData.hidden;
            this.edgePrograms[data.type].process(sourceData, targetData, data, hidden, edgesPerPrograms[data.type]++);
          }
          for (var type in this.edgePrograms) {
            var program = this.edgePrograms[type];
            if (!keepArrays && typeof program.computeIndices === "function")
              program.computeIndices();
          }
          return this;
        };
        Sigma3.prototype.handleSettingsUpdate = function() {
          this.camera.minRatio = this.settings.minCameraRatio;
          this.camera.maxRatio = this.settings.maxCameraRatio;
          this.camera.setState(this.camera.validateState(this.camera.getState()));
          return this;
        };
        Sigma3.prototype._refresh = function() {
          if (this.needToProcess) {
            this.process();
          } else if (this.needToSoftProcess) {
            this.process(true);
          }
          this.needToProcess = false;
          this.needToSoftProcess = false;
          this.render();
          return this;
        };
        Sigma3.prototype._scheduleRefresh = function() {
          var _this = this;
          if (!this.renderFrame) {
            this.renderFrame = (0, utils_1.requestFrame)(function() {
              _this._refresh();
              _this.renderFrame = null;
            });
          }
          return this;
        };
        Sigma3.prototype.renderLabels = function() {
          if (!this.settings.renderLabels)
            return this;
          var cameraState = this.camera.getState();
          var labelsToDisplay = this.labelGrid.getLabelsToDisplay(cameraState.ratio, this.settings.labelDensity);
          (0, extend_1.default)(labelsToDisplay, this.nodesWithForcedLabels);
          this.displayedLabels = /* @__PURE__ */ new Set();
          var context = this.canvasContexts.labels;
          for (var i = 0, l = labelsToDisplay.length; i < l; i++) {
            var node = labelsToDisplay[i];
            var data = this.nodeDataCache[node];
            if (this.displayedLabels.has(node))
              continue;
            if (data.hidden)
              continue;
            var _a = this.framedGraphToViewport(data), x = _a.x, y = _a.y;
            var size = this.scaleSize(data.size);
            if (!data.forceLabel && size < this.settings.labelRenderedSizeThreshold)
              continue;
            if (x < -X_LABEL_MARGIN || x > this.width + X_LABEL_MARGIN || y < -Y_LABEL_MARGIN || y > this.height + Y_LABEL_MARGIN)
              continue;
            this.displayedLabels.add(node);
            this.settings.labelRenderer(context, __assign(__assign({ key: node }, data), { size, x, y }), this.settings);
          }
          return this;
        };
        Sigma3.prototype.renderEdgeLabels = function() {
          if (!this.settings.renderEdgeLabels)
            return this;
          var context = this.canvasContexts.edgeLabels;
          context.clearRect(0, 0, this.width, this.height);
          var edgeLabelsToDisplay = (0, labels_1.edgeLabelsToDisplayFromNodes)({
            graph: this.graph,
            hoveredNode: this.hoveredNode,
            displayedNodeLabels: this.displayedLabels,
            highlightedNodes: this.highlightedNodes
          }).concat(this.edgesWithForcedLabels);
          var displayedLabels = /* @__PURE__ */ new Set();
          for (var i = 0, l = edgeLabelsToDisplay.length; i < l; i++) {
            var edge = edgeLabelsToDisplay[i], extremities = this.graph.extremities(edge), sourceData = this.nodeDataCache[extremities[0]], targetData = this.nodeDataCache[extremities[1]], edgeData = this.edgeDataCache[edge];
            if (displayedLabels.has(edge))
              continue;
            if (edgeData.hidden || sourceData.hidden || targetData.hidden) {
              continue;
            }
            this.settings.edgeLabelRenderer(context, __assign(__assign({ key: edge }, edgeData), { size: this.scaleSize(edgeData.size) }), __assign(__assign(__assign({ key: extremities[0] }, sourceData), this.framedGraphToViewport(sourceData)), { size: this.scaleSize(sourceData.size) }), __assign(__assign(__assign({ key: extremities[1] }, targetData), this.framedGraphToViewport(targetData)), { size: this.scaleSize(targetData.size) }), this.settings);
            displayedLabels.add(edge);
          }
          return this;
        };
        Sigma3.prototype.renderHighlightedNodes = function() {
          var _this = this;
          var context = this.canvasContexts.hovers;
          context.clearRect(0, 0, this.width, this.height);
          var render = function(node) {
            var data = _this.nodeDataCache[node];
            var _a = _this.framedGraphToViewport(data), x = _a.x, y = _a.y;
            var size = _this.scaleSize(data.size);
            _this.settings.hoverRenderer(context, __assign(__assign({ key: node }, data), { size, x, y }), _this.settings);
          };
          var nodesToRender = [];
          if (this.hoveredNode && !this.nodeDataCache[this.hoveredNode].hidden) {
            nodesToRender.push(this.hoveredNode);
          }
          this.highlightedNodes.forEach(function(node) {
            if (node !== _this.hoveredNode)
              nodesToRender.push(node);
          });
          nodesToRender.forEach(function(node) {
            return render(node);
          });
          var nodesPerPrograms = {};
          nodesToRender.forEach(function(node) {
            var type2 = _this.nodeDataCache[node].type;
            nodesPerPrograms[type2] = (nodesPerPrograms[type2] || 0) + 1;
          });
          for (var type in this.nodeHoverPrograms) {
            this.nodeHoverPrograms[type].allocate(nodesPerPrograms[type] || 0);
            nodesPerPrograms[type] = 0;
          }
          nodesToRender.forEach(function(node) {
            var data = _this.nodeDataCache[node];
            _this.nodeHoverPrograms[data.type].process(data, data.hidden, nodesPerPrograms[data.type]++);
          });
          this.webGLContexts.hoverNodes.clear(this.webGLContexts.hoverNodes.COLOR_BUFFER_BIT);
          for (var type in this.nodeHoverPrograms) {
            var program = this.nodeHoverPrograms[type];
            program.bind();
            program.bufferData();
            program.render({
              matrix: this.matrix,
              width: this.width,
              height: this.height,
              ratio: this.camera.ratio,
              correctionRatio: this.correctionRatio / this.camera.ratio,
              scalingRatio: this.pixelRatio
            });
          }
        };
        Sigma3.prototype.scheduleHighlightedNodesRender = function() {
          var _this = this;
          if (this.renderHighlightedNodesFrame || this.renderFrame)
            return;
          this.renderHighlightedNodesFrame = (0, utils_1.requestFrame)(function() {
            _this.renderHighlightedNodesFrame = null;
            _this.renderHighlightedNodes();
            _this.renderEdgeLabels();
          });
        };
        Sigma3.prototype.render = function() {
          var _this = this;
          this.emit("beforeRender");
          var exitRender = function() {
            _this.emit("afterRender");
            return _this;
          };
          if (this.renderFrame) {
            (0, utils_1.cancelFrame)(this.renderFrame);
            this.renderFrame = null;
            this.needToProcess = false;
            this.needToSoftProcess = false;
          }
          this.resize();
          this.clear();
          this.updateCachedValues();
          if (!this.graph.order)
            return exitRender();
          var mouseCaptor = this.mouseCaptor;
          var moving = this.camera.isAnimated() || mouseCaptor.isMoving || mouseCaptor.draggedEvents || mouseCaptor.currentWheelDirection;
          var cameraState = this.camera.getState();
          var viewportDimensions = this.getDimensions();
          var graphDimensions = this.getGraphDimensions();
          var padding = this.getSetting("stagePadding") || 0;
          this.matrix = (0, utils_1.matrixFromCamera)(cameraState, viewportDimensions, graphDimensions, padding);
          this.invMatrix = (0, utils_1.matrixFromCamera)(cameraState, viewportDimensions, graphDimensions, padding, true);
          this.correctionRatio = (0, utils_1.getMatrixImpact)(this.matrix, cameraState, viewportDimensions);
          for (var type in this.nodePrograms) {
            var program = this.nodePrograms[type];
            program.bind();
            program.bufferData();
            program.render({
              matrix: this.matrix,
              width: this.width,
              height: this.height,
              ratio: cameraState.ratio,
              correctionRatio: this.correctionRatio / cameraState.ratio,
              scalingRatio: this.pixelRatio
            });
          }
          if (!this.settings.hideEdgesOnMove || !moving) {
            for (var type in this.edgePrograms) {
              var program = this.edgePrograms[type];
              program.bind();
              program.bufferData();
              program.render({
                matrix: this.matrix,
                width: this.width,
                height: this.height,
                ratio: cameraState.ratio,
                correctionRatio: this.correctionRatio / cameraState.ratio,
                scalingRatio: this.pixelRatio
              });
            }
          }
          if (this.settings.hideLabelsOnMove && moving)
            return exitRender();
          this.renderLabels();
          this.renderEdgeLabels();
          this.renderHighlightedNodes();
          return exitRender();
        };
        Sigma3.prototype.updateCachedValues = function() {
          var ratio = this.camera.getState().ratio;
          this.cameraSizeRatio = Math.sqrt(ratio);
        };
        Sigma3.prototype.getCamera = function() {
          return this.camera;
        };
        Sigma3.prototype.getContainer = function() {
          return this.container;
        };
        Sigma3.prototype.getGraph = function() {
          return this.graph;
        };
        Sigma3.prototype.setGraph = function(graph) {
          if (graph === this.graph)
            return;
          this.unbindGraphHandlers();
          this.nodeDataCache = {};
          this.edgeDataCache = {};
          this.displayedLabels.clear();
          this.highlightedNodes.clear();
          this.hoveredNode = null;
          this.hoveredEdge = null;
          this.nodesWithForcedLabels.length = 0;
          this.edgesWithForcedLabels.length = 0;
          if (this.checkEdgesEventsFrame !== null) {
            (0, utils_1.cancelFrame)(this.checkEdgesEventsFrame);
            this.checkEdgesEventsFrame = null;
          }
          this.graph = graph;
          this.bindGraphHandlers();
          this.process();
          this.render();
        };
        Sigma3.prototype.getMouseCaptor = function() {
          return this.mouseCaptor;
        };
        Sigma3.prototype.getTouchCaptor = function() {
          return this.touchCaptor;
        };
        Sigma3.prototype.getDimensions = function() {
          return { width: this.width, height: this.height };
        };
        Sigma3.prototype.getGraphDimensions = function() {
          var extent = this.customBBox || this.nodeExtent;
          return {
            width: extent.x[1] - extent.x[0] || 1,
            height: extent.y[1] - extent.y[0] || 1
          };
        };
        Sigma3.prototype.getNodeDisplayData = function(key) {
          var node = this.nodeDataCache[key];
          return node ? Object.assign({}, node) : void 0;
        };
        Sigma3.prototype.getEdgeDisplayData = function(key) {
          var edge = this.edgeDataCache[key];
          return edge ? Object.assign({}, edge) : void 0;
        };
        Sigma3.prototype.getSettings = function() {
          return __assign({}, this.settings);
        };
        Sigma3.prototype.getSetting = function(key) {
          return this.settings[key];
        };
        Sigma3.prototype.setSetting = function(key, value) {
          this.settings[key] = value;
          (0, settings_1.validateSettings)(this.settings);
          this.handleSettingsUpdate();
          this.needToProcess = true;
          this._scheduleRefresh();
          return this;
        };
        Sigma3.prototype.updateSetting = function(key, updater) {
          this.settings[key] = updater(this.settings[key]);
          (0, settings_1.validateSettings)(this.settings);
          this.handleSettingsUpdate();
          this.needToProcess = true;
          this._scheduleRefresh();
          return this;
        };
        Sigma3.prototype.resize = function() {
          var previousWidth = this.width, previousHeight = this.height;
          this.width = this.container.offsetWidth;
          this.height = this.container.offsetHeight;
          this.pixelRatio = (0, utils_1.getPixelRatio)();
          if (this.width === 0) {
            if (this.settings.allowInvalidContainer)
              this.width = 1;
            else
              throw new Error("Sigma: Container has no width. You can set the allowInvalidContainer setting to true to stop seeing this error.");
          }
          if (this.height === 0) {
            if (this.settings.allowInvalidContainer)
              this.height = 1;
            else
              throw new Error("Sigma: Container has no height. You can set the allowInvalidContainer setting to true to stop seeing this error.");
          }
          if (previousWidth === this.width && previousHeight === this.height)
            return this;
          this.emit("resize");
          for (var id in this.elements) {
            var element = this.elements[id];
            element.style.width = this.width + "px";
            element.style.height = this.height + "px";
          }
          for (var id in this.canvasContexts) {
            this.elements[id].setAttribute("width", this.width * this.pixelRatio + "px");
            this.elements[id].setAttribute("height", this.height * this.pixelRatio + "px");
            if (this.pixelRatio !== 1)
              this.canvasContexts[id].scale(this.pixelRatio, this.pixelRatio);
          }
          for (var id in this.webGLContexts) {
            this.elements[id].setAttribute("width", this.width * this.pixelRatio + "px");
            this.elements[id].setAttribute("height", this.height * this.pixelRatio + "px");
            this.webGLContexts[id].viewport(0, 0, this.width * this.pixelRatio, this.height * this.pixelRatio);
          }
          return this;
        };
        Sigma3.prototype.clear = function() {
          this.webGLContexts.nodes.clear(this.webGLContexts.nodes.COLOR_BUFFER_BIT);
          this.webGLContexts.edges.clear(this.webGLContexts.edges.COLOR_BUFFER_BIT);
          this.webGLContexts.hoverNodes.clear(this.webGLContexts.hoverNodes.COLOR_BUFFER_BIT);
          this.canvasContexts.labels.clearRect(0, 0, this.width, this.height);
          this.canvasContexts.hovers.clearRect(0, 0, this.width, this.height);
          this.canvasContexts.edgeLabels.clearRect(0, 0, this.width, this.height);
          return this;
        };
        Sigma3.prototype.refresh = function() {
          this.needToProcess = true;
          this._refresh();
          return this;
        };
        Sigma3.prototype.scheduleRefresh = function() {
          this.needToProcess = true;
          this._scheduleRefresh();
          return this;
        };
        Sigma3.prototype.getViewportZoomedState = function(viewportTarget, newRatio) {
          var _a = this.camera.getState(), ratio = _a.ratio, angle = _a.angle, x = _a.x, y = _a.y;
          var ratioDiff = newRatio / ratio;
          var center = {
            x: this.width / 2,
            y: this.height / 2
          };
          var graphMousePosition = this.viewportToFramedGraph(viewportTarget);
          var graphCenterPosition = this.viewportToFramedGraph(center);
          return {
            angle,
            x: (graphMousePosition.x - graphCenterPosition.x) * (1 - ratioDiff) + x,
            y: (graphMousePosition.y - graphCenterPosition.y) * (1 - ratioDiff) + y,
            ratio: newRatio
          };
        };
        Sigma3.prototype.viewRectangle = function() {
          var marginX = 0 * this.width / 8, marginY = 0 * this.height / 8;
          var p1 = this.viewportToFramedGraph({ x: 0 - marginX, y: 0 - marginY }), p2 = this.viewportToFramedGraph({ x: this.width + marginX, y: 0 - marginY }), h = this.viewportToFramedGraph({ x: 0, y: this.height + marginY });
          return {
            x1: p1.x,
            y1: p1.y,
            x2: p2.x,
            y2: p2.y,
            height: p2.y - h.y
          };
        };
        Sigma3.prototype.framedGraphToViewport = function(coordinates, override) {
          if (override === void 0) {
            override = {};
          }
          var recomputeMatrix = !!override.cameraState || !!override.viewportDimensions || !!override.graphDimensions;
          var matrix = override.matrix ? override.matrix : recomputeMatrix ? (0, utils_1.matrixFromCamera)(override.cameraState || this.camera.getState(), override.viewportDimensions || this.getDimensions(), override.graphDimensions || this.getGraphDimensions(), override.padding || this.getSetting("stagePadding") || 0) : this.matrix;
          var viewportPos = (0, matrices_1.multiplyVec2)(matrix, coordinates);
          return {
            x: (1 + viewportPos.x) * this.width / 2,
            y: (1 - viewportPos.y) * this.height / 2
          };
        };
        Sigma3.prototype.viewportToFramedGraph = function(coordinates, override) {
          if (override === void 0) {
            override = {};
          }
          var recomputeMatrix = !!override.cameraState || !!override.viewportDimensions || !override.graphDimensions;
          var invMatrix = override.matrix ? override.matrix : recomputeMatrix ? (0, utils_1.matrixFromCamera)(override.cameraState || this.camera.getState(), override.viewportDimensions || this.getDimensions(), override.graphDimensions || this.getGraphDimensions(), override.padding || this.getSetting("stagePadding") || 0, true) : this.invMatrix;
          var res = (0, matrices_1.multiplyVec2)(invMatrix, {
            x: coordinates.x / this.width * 2 - 1,
            y: 1 - coordinates.y / this.height * 2
          });
          if (isNaN(res.x))
            res.x = 0;
          if (isNaN(res.y))
            res.y = 0;
          return res;
        };
        Sigma3.prototype.viewportToGraph = function(viewportPoint, override) {
          if (override === void 0) {
            override = {};
          }
          return this.normalizationFunction.inverse(this.viewportToFramedGraph(viewportPoint, override));
        };
        Sigma3.prototype.graphToViewport = function(graphPoint, override) {
          if (override === void 0) {
            override = {};
          }
          return this.framedGraphToViewport(this.normalizationFunction(graphPoint), override);
        };
        Sigma3.prototype.getBBox = function() {
          return (0, utils_1.graphExtent)(this.graph);
        };
        Sigma3.prototype.getCustomBBox = function() {
          return this.customBBox;
        };
        Sigma3.prototype.setCustomBBox = function(customBBox) {
          this.customBBox = customBBox;
          this._scheduleRefresh();
          return this;
        };
        Sigma3.prototype.kill = function() {
          this.emit("kill");
          this.removeAllListeners();
          this.camera.removeListener("updated", this.activeListeners.camera);
          window.removeEventListener("resize", this.activeListeners.handleResize);
          this.mouseCaptor.kill();
          this.touchCaptor.kill();
          this.unbindGraphHandlers();
          this.quadtree = new quadtree_1.default();
          this.nodeDataCache = {};
          this.edgeDataCache = {};
          this.nodesWithForcedLabels = [];
          this.edgesWithForcedLabels = [];
          this.highlightedNodes.clear();
          if (this.renderFrame) {
            (0, utils_1.cancelFrame)(this.renderFrame);
            this.renderFrame = null;
          }
          if (this.renderHighlightedNodesFrame) {
            (0, utils_1.cancelFrame)(this.renderHighlightedNodesFrame);
            this.renderHighlightedNodesFrame = null;
          }
          var container = this.container;
          while (container.firstChild)
            container.removeChild(container.firstChild);
        };
        Sigma3.prototype.scaleSize = function(size) {
          return size / this.cameraSizeRatio;
        };
        Sigma3.prototype.getCanvases = function() {
          return __assign({}, this.elements);
        };
        return Sigma3;
      })(types_1.TypedEventEmitter)
    );
    exports2.default = Sigma2;
  }
});

// node_modules/sigma/index.js
var require_sigma2 = __commonJS({
  "node_modules/sigma/index.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Sigma = exports2.MouseCaptor = exports2.QuadTree = exports2.Camera = void 0;
    var sigma_1 = __importDefault(require_sigma());
    exports2.Sigma = sigma_1.default;
    var camera_1 = __importDefault(require_camera());
    exports2.Camera = camera_1.default;
    var quadtree_1 = __importDefault(require_quadtree());
    exports2.QuadTree = quadtree_1.default;
    var mouse_1 = __importDefault(require_mouse());
    exports2.MouseCaptor = mouse_1.default;
    exports2.default = sigma_1.default;
  }
});

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  fetchSnapshot: () => fetchSnapshot,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");

// node_modules/graphology/dist/graphology.mjs
init_events_shim();
function assignPolyfill() {
  const target = arguments[0];
  for (let i = 1, l = arguments.length; i < l; i++) {
    if (!arguments[i]) continue;
    for (const k in arguments[i]) target[k] = arguments[i][k];
  }
  return target;
}
var assign = assignPolyfill;
if (typeof Object.assign === "function") assign = Object.assign;
function getMatchingEdge(graph, source, target, type) {
  const sourceData = graph._nodes.get(source);
  let edge = null;
  if (!sourceData) return edge;
  if (type === "mixed") {
    edge = sourceData.out && sourceData.out[target] || sourceData.undirected && sourceData.undirected[target];
  } else if (type === "directed") {
    edge = sourceData.out && sourceData.out[target];
  } else {
    edge = sourceData.undirected && sourceData.undirected[target];
  }
  return edge;
}
function isPlainObject(value) {
  return typeof value === "object" && value !== null;
}
function isEmpty(o) {
  let k;
  for (k in o) return false;
  return true;
}
function privateProperty(target, name, value) {
  Object.defineProperty(target, name, {
    enumerable: false,
    configurable: false,
    writable: true,
    value
  });
}
function readOnlyProperty(target, name, value) {
  const descriptor = {
    enumerable: true,
    configurable: true
  };
  if (typeof value === "function") {
    descriptor.get = value;
  } else {
    descriptor.value = value;
    descriptor.writable = false;
  }
  Object.defineProperty(target, name, descriptor);
}
function validateHints(hints) {
  if (!isPlainObject(hints)) return false;
  if (hints.attributes && !Array.isArray(hints.attributes)) return false;
  return true;
}
function incrementalIdStartingFromRandomByte() {
  let i = Math.floor(Math.random() * 256) & 255;
  return () => {
    return i++;
  };
}
function chain() {
  const iterables = arguments;
  let current = null;
  let i = -1;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let step = null;
      do {
        if (current === null) {
          i++;
          if (i >= iterables.length) return { done: true };
          current = iterables[i][Symbol.iterator]();
        }
        step = current.next();
        if (step.done) {
          current = null;
          continue;
        }
        break;
      } while (true);
      return step;
    }
  };
}
function emptyIterator() {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return { done: true };
    }
  };
}
var GraphError = class extends Error {
  constructor(message) {
    super();
    this.name = "GraphError";
    this.message = message;
  }
};
var InvalidArgumentsGraphError = class _InvalidArgumentsGraphError extends GraphError {
  constructor(message) {
    super(message);
    this.name = "InvalidArgumentsGraphError";
    if (typeof Error.captureStackTrace === "function")
      Error.captureStackTrace(
        this,
        _InvalidArgumentsGraphError.prototype.constructor
      );
  }
};
var NotFoundGraphError = class _NotFoundGraphError extends GraphError {
  constructor(message) {
    super(message);
    this.name = "NotFoundGraphError";
    if (typeof Error.captureStackTrace === "function")
      Error.captureStackTrace(this, _NotFoundGraphError.prototype.constructor);
  }
};
var UsageGraphError = class _UsageGraphError extends GraphError {
  constructor(message) {
    super(message);
    this.name = "UsageGraphError";
    if (typeof Error.captureStackTrace === "function")
      Error.captureStackTrace(this, _UsageGraphError.prototype.constructor);
  }
};
function MixedNodeData(key, attributes) {
  this.key = key;
  this.attributes = attributes;
  this.clear();
}
MixedNodeData.prototype.clear = function() {
  this.inDegree = 0;
  this.outDegree = 0;
  this.undirectedDegree = 0;
  this.undirectedLoops = 0;
  this.directedLoops = 0;
  this.in = {};
  this.out = {};
  this.undirected = {};
};
function DirectedNodeData(key, attributes) {
  this.key = key;
  this.attributes = attributes;
  this.clear();
}
DirectedNodeData.prototype.clear = function() {
  this.inDegree = 0;
  this.outDegree = 0;
  this.directedLoops = 0;
  this.in = {};
  this.out = {};
};
function UndirectedNodeData(key, attributes) {
  this.key = key;
  this.attributes = attributes;
  this.clear();
}
UndirectedNodeData.prototype.clear = function() {
  this.undirectedDegree = 0;
  this.undirectedLoops = 0;
  this.undirected = {};
};
function EdgeData(undirected, key, source, target, attributes) {
  this.key = key;
  this.attributes = attributes;
  this.undirected = undirected;
  this.source = source;
  this.target = target;
}
EdgeData.prototype.attach = function() {
  let outKey = "out";
  let inKey = "in";
  if (this.undirected) outKey = inKey = "undirected";
  const source = this.source.key;
  const target = this.target.key;
  this.source[outKey][target] = this;
  if (this.undirected && source === target) return;
  this.target[inKey][source] = this;
};
EdgeData.prototype.attachMulti = function() {
  let outKey = "out";
  let inKey = "in";
  const source = this.source.key;
  const target = this.target.key;
  if (this.undirected) outKey = inKey = "undirected";
  const adj = this.source[outKey];
  const head = adj[target];
  if (typeof head === "undefined") {
    adj[target] = this;
    if (!(this.undirected && source === target)) {
      this.target[inKey][source] = this;
    }
    return;
  }
  head.previous = this;
  this.next = head;
  adj[target] = this;
  this.target[inKey][source] = this;
};
EdgeData.prototype.detach = function() {
  const source = this.source.key;
  const target = this.target.key;
  let outKey = "out";
  let inKey = "in";
  if (this.undirected) outKey = inKey = "undirected";
  delete this.source[outKey][target];
  delete this.target[inKey][source];
};
EdgeData.prototype.detachMulti = function() {
  const source = this.source.key;
  const target = this.target.key;
  let outKey = "out";
  let inKey = "in";
  if (this.undirected) outKey = inKey = "undirected";
  if (this.previous === void 0) {
    if (this.next === void 0) {
      delete this.source[outKey][target];
      delete this.target[inKey][source];
    } else {
      this.next.previous = void 0;
      this.source[outKey][target] = this.next;
      this.target[inKey][source] = this.next;
    }
  } else {
    this.previous.next = this.next;
    if (this.next !== void 0) {
      this.next.previous = this.previous;
    }
  }
};
var NODE = 0;
var SOURCE = 1;
var TARGET = 2;
var OPPOSITE = 3;
function findRelevantNodeData(graph, method, mode, nodeOrEdge, nameOrEdge, add1, add2) {
  let nodeData, edgeData, arg1, arg2;
  nodeOrEdge = "" + nodeOrEdge;
  if (mode === NODE) {
    nodeData = graph._nodes.get(nodeOrEdge);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.${method}: could not find the "${nodeOrEdge}" node in the graph.`
      );
    arg1 = nameOrEdge;
    arg2 = add1;
  } else if (mode === OPPOSITE) {
    nameOrEdge = "" + nameOrEdge;
    edgeData = graph._edges.get(nameOrEdge);
    if (!edgeData)
      throw new NotFoundGraphError(
        `Graph.${method}: could not find the "${nameOrEdge}" edge in the graph.`
      );
    const source = edgeData.source.key;
    const target = edgeData.target.key;
    if (nodeOrEdge === source) {
      nodeData = edgeData.target;
    } else if (nodeOrEdge === target) {
      nodeData = edgeData.source;
    } else {
      throw new NotFoundGraphError(
        `Graph.${method}: the "${nodeOrEdge}" node is not attached to the "${nameOrEdge}" edge (${source}, ${target}).`
      );
    }
    arg1 = add1;
    arg2 = add2;
  } else {
    edgeData = graph._edges.get(nodeOrEdge);
    if (!edgeData)
      throw new NotFoundGraphError(
        `Graph.${method}: could not find the "${nodeOrEdge}" edge in the graph.`
      );
    if (mode === SOURCE) {
      nodeData = edgeData.source;
    } else {
      nodeData = edgeData.target;
    }
    arg1 = nameOrEdge;
    arg2 = add1;
  }
  return [nodeData, arg1, arg2];
}
function attachNodeAttributeGetter(Class, method, mode) {
  Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1) {
    const [data, name] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1
    );
    return data.attributes[name];
  };
}
function attachNodeAttributesGetter(Class, method, mode) {
  Class.prototype[method] = function(nodeOrEdge, nameOrEdge) {
    const [data] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge
    );
    return data.attributes;
  };
}
function attachNodeAttributeChecker(Class, method, mode) {
  Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1) {
    const [data, name] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1
    );
    return data.attributes.hasOwnProperty(name);
  };
}
function attachNodeAttributeSetter(Class, method, mode) {
  Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1, add2) {
    const [data, name, value] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1,
      add2
    );
    data.attributes[name] = value;
    this.emit("nodeAttributesUpdated", {
      key: data.key,
      type: "set",
      attributes: data.attributes,
      name
    });
    return this;
  };
}
function attachNodeAttributeUpdater(Class, method, mode) {
  Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1, add2) {
    const [data, name, updater] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1,
      add2
    );
    if (typeof updater !== "function")
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: updater should be a function.`
      );
    const attributes = data.attributes;
    const value = updater(attributes[name]);
    attributes[name] = value;
    this.emit("nodeAttributesUpdated", {
      key: data.key,
      type: "set",
      attributes: data.attributes,
      name
    });
    return this;
  };
}
function attachNodeAttributeRemover(Class, method, mode) {
  Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1) {
    const [data, name] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1
    );
    delete data.attributes[name];
    this.emit("nodeAttributesUpdated", {
      key: data.key,
      type: "remove",
      attributes: data.attributes,
      name
    });
    return this;
  };
}
function attachNodeAttributesReplacer(Class, method, mode) {
  Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1) {
    const [data, attributes] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1
    );
    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: provided attributes are not a plain object.`
      );
    data.attributes = attributes;
    this.emit("nodeAttributesUpdated", {
      key: data.key,
      type: "replace",
      attributes: data.attributes
    });
    return this;
  };
}
function attachNodeAttributesMerger(Class, method, mode) {
  Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1) {
    const [data, attributes] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1
    );
    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: provided attributes are not a plain object.`
      );
    assign(data.attributes, attributes);
    this.emit("nodeAttributesUpdated", {
      key: data.key,
      type: "merge",
      attributes: data.attributes,
      data: attributes
    });
    return this;
  };
}
function attachNodeAttributesUpdater(Class, method, mode) {
  Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1) {
    const [data, updater] = findRelevantNodeData(
      this,
      method,
      mode,
      nodeOrEdge,
      nameOrEdge,
      add1
    );
    if (typeof updater !== "function")
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: provided updater is not a function.`
      );
    data.attributes = updater(data.attributes);
    this.emit("nodeAttributesUpdated", {
      key: data.key,
      type: "update",
      attributes: data.attributes
    });
    return this;
  };
}
var NODE_ATTRIBUTES_METHODS = [
  {
    name: (element) => `get${element}Attribute`,
    attacher: attachNodeAttributeGetter
  },
  {
    name: (element) => `get${element}Attributes`,
    attacher: attachNodeAttributesGetter
  },
  {
    name: (element) => `has${element}Attribute`,
    attacher: attachNodeAttributeChecker
  },
  {
    name: (element) => `set${element}Attribute`,
    attacher: attachNodeAttributeSetter
  },
  {
    name: (element) => `update${element}Attribute`,
    attacher: attachNodeAttributeUpdater
  },
  {
    name: (element) => `remove${element}Attribute`,
    attacher: attachNodeAttributeRemover
  },
  {
    name: (element) => `replace${element}Attributes`,
    attacher: attachNodeAttributesReplacer
  },
  {
    name: (element) => `merge${element}Attributes`,
    attacher: attachNodeAttributesMerger
  },
  {
    name: (element) => `update${element}Attributes`,
    attacher: attachNodeAttributesUpdater
  }
];
function attachNodeAttributesMethods(Graph2) {
  NODE_ATTRIBUTES_METHODS.forEach(function({ name, attacher }) {
    attacher(Graph2, name("Node"), NODE);
    attacher(Graph2, name("Source"), SOURCE);
    attacher(Graph2, name("Target"), TARGET);
    attacher(Graph2, name("Opposite"), OPPOSITE);
  });
}
function attachEdgeAttributeGetter(Class, method, type) {
  Class.prototype[method] = function(element, name) {
    let data;
    if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const source = "" + element;
      const target = "" + name;
      name = arguments[2];
      data = getMatchingEdge(this, source, target, type);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== "mixed")
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      element = "" + element;
      data = this._edges.get(element);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }
    return data.attributes[name];
  };
}
function attachEdgeAttributesGetter(Class, method, type) {
  Class.prototype[method] = function(element) {
    let data;
    if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 1) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const source = "" + element, target = "" + arguments[1];
      data = getMatchingEdge(this, source, target, type);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== "mixed")
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      element = "" + element;
      data = this._edges.get(element);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }
    return data.attributes;
  };
}
function attachEdgeAttributeChecker(Class, method, type) {
  Class.prototype[method] = function(element, name) {
    let data;
    if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const source = "" + element;
      const target = "" + name;
      name = arguments[2];
      data = getMatchingEdge(this, source, target, type);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== "mixed")
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      element = "" + element;
      data = this._edges.get(element);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }
    return data.attributes.hasOwnProperty(name);
  };
}
function attachEdgeAttributeSetter(Class, method, type) {
  Class.prototype[method] = function(element, name, value) {
    let data;
    if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 3) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const source = "" + element;
      const target = "" + name;
      name = arguments[2];
      value = arguments[3];
      data = getMatchingEdge(this, source, target, type);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== "mixed")
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      element = "" + element;
      data = this._edges.get(element);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }
    data.attributes[name] = value;
    this.emit("edgeAttributesUpdated", {
      key: data.key,
      type: "set",
      attributes: data.attributes,
      name
    });
    return this;
  };
}
function attachEdgeAttributeUpdater(Class, method, type) {
  Class.prototype[method] = function(element, name, updater) {
    let data;
    if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 3) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const source = "" + element;
      const target = "" + name;
      name = arguments[2];
      updater = arguments[3];
      data = getMatchingEdge(this, source, target, type);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== "mixed")
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      element = "" + element;
      data = this._edges.get(element);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }
    if (typeof updater !== "function")
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: updater should be a function.`
      );
    data.attributes[name] = updater(data.attributes[name]);
    this.emit("edgeAttributesUpdated", {
      key: data.key,
      type: "set",
      attributes: data.attributes,
      name
    });
    return this;
  };
}
function attachEdgeAttributeRemover(Class, method, type) {
  Class.prototype[method] = function(element, name) {
    let data;
    if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const source = "" + element;
      const target = "" + name;
      name = arguments[2];
      data = getMatchingEdge(this, source, target, type);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== "mixed")
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      element = "" + element;
      data = this._edges.get(element);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }
    delete data.attributes[name];
    this.emit("edgeAttributesUpdated", {
      key: data.key,
      type: "remove",
      attributes: data.attributes,
      name
    });
    return this;
  };
}
function attachEdgeAttributesReplacer(Class, method, type) {
  Class.prototype[method] = function(element, attributes) {
    let data;
    if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const source = "" + element, target = "" + attributes;
      attributes = arguments[2];
      data = getMatchingEdge(this, source, target, type);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== "mixed")
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      element = "" + element;
      data = this._edges.get(element);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }
    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: provided attributes are not a plain object.`
      );
    data.attributes = attributes;
    this.emit("edgeAttributesUpdated", {
      key: data.key,
      type: "replace",
      attributes: data.attributes
    });
    return this;
  };
}
function attachEdgeAttributesMerger(Class, method, type) {
  Class.prototype[method] = function(element, attributes) {
    let data;
    if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const source = "" + element, target = "" + attributes;
      attributes = arguments[2];
      data = getMatchingEdge(this, source, target, type);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== "mixed")
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      element = "" + element;
      data = this._edges.get(element);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }
    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: provided attributes are not a plain object.`
      );
    assign(data.attributes, attributes);
    this.emit("edgeAttributesUpdated", {
      key: data.key,
      type: "merge",
      attributes: data.attributes,
      data: attributes
    });
    return this;
  };
}
function attachEdgeAttributesUpdater(Class, method, type) {
  Class.prototype[method] = function(element, updater) {
    let data;
    if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
      throw new UsageGraphError(
        `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
      );
    if (arguments.length > 2) {
      if (this.multi)
        throw new UsageGraphError(
          `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
        );
      const source = "" + element, target = "" + updater;
      updater = arguments[2];
      data = getMatchingEdge(this, source, target, type);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
        );
    } else {
      if (type !== "mixed")
        throw new UsageGraphError(
          `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
        );
      element = "" + element;
      data = this._edges.get(element);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${element}" edge in the graph.`
        );
    }
    if (typeof updater !== "function")
      throw new InvalidArgumentsGraphError(
        `Graph.${method}: provided updater is not a function.`
      );
    data.attributes = updater(data.attributes);
    this.emit("edgeAttributesUpdated", {
      key: data.key,
      type: "update",
      attributes: data.attributes
    });
    return this;
  };
}
var EDGE_ATTRIBUTES_METHODS = [
  {
    name: (element) => `get${element}Attribute`,
    attacher: attachEdgeAttributeGetter
  },
  {
    name: (element) => `get${element}Attributes`,
    attacher: attachEdgeAttributesGetter
  },
  {
    name: (element) => `has${element}Attribute`,
    attacher: attachEdgeAttributeChecker
  },
  {
    name: (element) => `set${element}Attribute`,
    attacher: attachEdgeAttributeSetter
  },
  {
    name: (element) => `update${element}Attribute`,
    attacher: attachEdgeAttributeUpdater
  },
  {
    name: (element) => `remove${element}Attribute`,
    attacher: attachEdgeAttributeRemover
  },
  {
    name: (element) => `replace${element}Attributes`,
    attacher: attachEdgeAttributesReplacer
  },
  {
    name: (element) => `merge${element}Attributes`,
    attacher: attachEdgeAttributesMerger
  },
  {
    name: (element) => `update${element}Attributes`,
    attacher: attachEdgeAttributesUpdater
  }
];
function attachEdgeAttributesMethods(Graph2) {
  EDGE_ATTRIBUTES_METHODS.forEach(function({ name, attacher }) {
    attacher(Graph2, name("Edge"), "mixed");
    attacher(Graph2, name("DirectedEdge"), "directed");
    attacher(Graph2, name("UndirectedEdge"), "undirected");
  });
}
var EDGES_ITERATION = [
  {
    name: "edges",
    type: "mixed"
  },
  {
    name: "inEdges",
    type: "directed",
    direction: "in"
  },
  {
    name: "outEdges",
    type: "directed",
    direction: "out"
  },
  {
    name: "inboundEdges",
    type: "mixed",
    direction: "in"
  },
  {
    name: "outboundEdges",
    type: "mixed",
    direction: "out"
  },
  {
    name: "directedEdges",
    type: "directed"
  },
  {
    name: "undirectedEdges",
    type: "undirected"
  }
];
function forEachSimple(breakable, object, callback, avoid) {
  let shouldBreak = false;
  for (const k in object) {
    if (k === avoid) continue;
    const edgeData = object[k];
    shouldBreak = callback(
      edgeData.key,
      edgeData.attributes,
      edgeData.source.key,
      edgeData.target.key,
      edgeData.source.attributes,
      edgeData.target.attributes,
      edgeData.undirected
    );
    if (breakable && shouldBreak) return edgeData.key;
  }
  return;
}
function forEachMulti(breakable, object, callback, avoid) {
  let edgeData, source, target;
  let shouldBreak = false;
  for (const k in object) {
    if (k === avoid) continue;
    edgeData = object[k];
    do {
      source = edgeData.source;
      target = edgeData.target;
      shouldBreak = callback(
        edgeData.key,
        edgeData.attributes,
        source.key,
        target.key,
        source.attributes,
        target.attributes,
        edgeData.undirected
      );
      if (breakable && shouldBreak) return edgeData.key;
      edgeData = edgeData.next;
    } while (edgeData !== void 0);
  }
  return;
}
function createIterator(object, avoid) {
  const keys = Object.keys(object);
  const l = keys.length;
  let edgeData;
  let i = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      do {
        if (!edgeData) {
          if (i >= l) return { done: true };
          const k = keys[i++];
          if (k === avoid) {
            edgeData = void 0;
            continue;
          }
          edgeData = object[k];
        } else {
          edgeData = edgeData.next;
        }
      } while (!edgeData);
      return {
        done: false,
        value: {
          edge: edgeData.key,
          attributes: edgeData.attributes,
          source: edgeData.source.key,
          target: edgeData.target.key,
          sourceAttributes: edgeData.source.attributes,
          targetAttributes: edgeData.target.attributes,
          undirected: edgeData.undirected
        }
      };
    }
  };
}
function forEachForKeySimple(breakable, object, k, callback) {
  const edgeData = object[k];
  if (!edgeData) return;
  const sourceData = edgeData.source;
  const targetData = edgeData.target;
  if (callback(
    edgeData.key,
    edgeData.attributes,
    sourceData.key,
    targetData.key,
    sourceData.attributes,
    targetData.attributes,
    edgeData.undirected
  ) && breakable)
    return edgeData.key;
}
function forEachForKeyMulti(breakable, object, k, callback) {
  let edgeData = object[k];
  if (!edgeData) return;
  let shouldBreak = false;
  do {
    shouldBreak = callback(
      edgeData.key,
      edgeData.attributes,
      edgeData.source.key,
      edgeData.target.key,
      edgeData.source.attributes,
      edgeData.target.attributes,
      edgeData.undirected
    );
    if (breakable && shouldBreak) return edgeData.key;
    edgeData = edgeData.next;
  } while (edgeData !== void 0);
  return;
}
function createIteratorForKey(object, k) {
  let edgeData = object[k];
  if (edgeData.next !== void 0) {
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        if (!edgeData) return { done: true };
        const value = {
          edge: edgeData.key,
          attributes: edgeData.attributes,
          source: edgeData.source.key,
          target: edgeData.target.key,
          sourceAttributes: edgeData.source.attributes,
          targetAttributes: edgeData.target.attributes,
          undirected: edgeData.undirected
        };
        edgeData = edgeData.next;
        return {
          done: false,
          value
        };
      }
    };
  }
  let done = false;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (done === true) return { done: true };
      done = true;
      return {
        done: false,
        value: {
          edge: edgeData.key,
          attributes: edgeData.attributes,
          source: edgeData.source.key,
          target: edgeData.target.key,
          sourceAttributes: edgeData.source.attributes,
          targetAttributes: edgeData.target.attributes,
          undirected: edgeData.undirected
        }
      };
    }
  };
}
function createEdgeArray(graph, type) {
  if (graph.size === 0) return [];
  if (type === "mixed" || type === graph.type) {
    return Array.from(graph._edges.keys());
  }
  const size = type === "undirected" ? graph.undirectedSize : graph.directedSize;
  const list = new Array(size), mask = type === "undirected";
  const iterator = graph._edges.values();
  let i = 0;
  let step, data;
  while (step = iterator.next(), step.done !== true) {
    data = step.value;
    if (data.undirected === mask) list[i++] = data.key;
  }
  return list;
}
function forEachEdge(breakable, graph, type, callback) {
  if (graph.size === 0) return;
  const shouldFilter = type !== "mixed" && type !== graph.type;
  const mask = type === "undirected";
  let step, data;
  let shouldBreak = false;
  const iterator = graph._edges.values();
  while (step = iterator.next(), step.done !== true) {
    data = step.value;
    if (shouldFilter && data.undirected !== mask) continue;
    const { key, attributes, source, target } = data;
    shouldBreak = callback(
      key,
      attributes,
      source.key,
      target.key,
      source.attributes,
      target.attributes,
      data.undirected
    );
    if (breakable && shouldBreak) return key;
  }
  return;
}
function createEdgeIterator(graph, type) {
  if (graph.size === 0) return emptyIterator();
  const shouldFilter = type !== "mixed" && type !== graph.type;
  const mask = type === "undirected";
  const iterator = graph._edges.values();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let step, data;
      while (true) {
        step = iterator.next();
        if (step.done) return step;
        data = step.value;
        if (shouldFilter && data.undirected !== mask) continue;
        break;
      }
      const value = {
        edge: data.key,
        attributes: data.attributes,
        source: data.source.key,
        target: data.target.key,
        sourceAttributes: data.source.attributes,
        targetAttributes: data.target.attributes,
        undirected: data.undirected
      };
      return { value, done: false };
    }
  };
}
function forEachEdgeForNode(breakable, multi, type, direction, nodeData, callback) {
  const fn = multi ? forEachMulti : forEachSimple;
  let found;
  if (type !== "undirected") {
    if (direction !== "out") {
      found = fn(breakable, nodeData.in, callback);
      if (breakable && found) return found;
    }
    if (direction !== "in") {
      found = fn(
        breakable,
        nodeData.out,
        callback,
        !direction ? nodeData.key : void 0
      );
      if (breakable && found) return found;
    }
  }
  if (type !== "directed") {
    found = fn(breakable, nodeData.undirected, callback);
    if (breakable && found) return found;
  }
  return;
}
function createEdgeArrayForNode(multi, type, direction, nodeData) {
  const edges = [];
  forEachEdgeForNode(false, multi, type, direction, nodeData, function(key) {
    edges.push(key);
  });
  return edges;
}
function createEdgeIteratorForNode(type, direction, nodeData) {
  let iterator = emptyIterator();
  if (type !== "undirected") {
    if (direction !== "out" && typeof nodeData.in !== "undefined")
      iterator = chain(iterator, createIterator(nodeData.in));
    if (direction !== "in" && typeof nodeData.out !== "undefined")
      iterator = chain(
        iterator,
        createIterator(nodeData.out, !direction ? nodeData.key : void 0)
      );
  }
  if (type !== "directed" && typeof nodeData.undirected !== "undefined") {
    iterator = chain(iterator, createIterator(nodeData.undirected));
  }
  return iterator;
}
function forEachEdgeForPath(breakable, type, multi, direction, sourceData, target, callback) {
  const fn = multi ? forEachForKeyMulti : forEachForKeySimple;
  let found;
  if (type !== "undirected") {
    if (typeof sourceData.in !== "undefined" && direction !== "out") {
      found = fn(breakable, sourceData.in, target, callback);
      if (breakable && found) return found;
    }
    if (typeof sourceData.out !== "undefined" && direction !== "in" && (direction || sourceData.key !== target)) {
      found = fn(breakable, sourceData.out, target, callback);
      if (breakable && found) return found;
    }
  }
  if (type !== "directed") {
    if (typeof sourceData.undirected !== "undefined") {
      found = fn(breakable, sourceData.undirected, target, callback);
      if (breakable && found) return found;
    }
  }
  return;
}
function createEdgeArrayForPath(type, multi, direction, sourceData, target) {
  const edges = [];
  forEachEdgeForPath(
    false,
    type,
    multi,
    direction,
    sourceData,
    target,
    function(key) {
      edges.push(key);
    }
  );
  return edges;
}
function createEdgeIteratorForPath(type, direction, sourceData, target) {
  let iterator = emptyIterator();
  if (type !== "undirected") {
    if (typeof sourceData.in !== "undefined" && direction !== "out" && target in sourceData.in)
      iterator = chain(iterator, createIteratorForKey(sourceData.in, target));
    if (typeof sourceData.out !== "undefined" && direction !== "in" && target in sourceData.out && (direction || sourceData.key !== target))
      iterator = chain(iterator, createIteratorForKey(sourceData.out, target));
  }
  if (type !== "directed") {
    if (typeof sourceData.undirected !== "undefined" && target in sourceData.undirected)
      iterator = chain(
        iterator,
        createIteratorForKey(sourceData.undirected, target)
      );
  }
  return iterator;
}
function attachEdgeArrayCreator(Class, description) {
  const { name, type, direction } = description;
  Class.prototype[name] = function(source, target) {
    if (type !== "mixed" && this.type !== "mixed" && type !== this.type)
      return [];
    if (!arguments.length) return createEdgeArray(this, type);
    if (arguments.length === 1) {
      source = "" + source;
      const nodeData = this._nodes.get(source);
      if (typeof nodeData === "undefined")
        throw new NotFoundGraphError(
          `Graph.${name}: could not find the "${source}" node in the graph.`
        );
      return createEdgeArrayForNode(
        this.multi,
        type === "mixed" ? this.type : type,
        direction,
        nodeData
      );
    }
    if (arguments.length === 2) {
      source = "" + source;
      target = "" + target;
      const sourceData = this._nodes.get(source);
      if (!sourceData)
        throw new NotFoundGraphError(
          `Graph.${name}:  could not find the "${source}" source node in the graph.`
        );
      if (!this._nodes.has(target))
        throw new NotFoundGraphError(
          `Graph.${name}:  could not find the "${target}" target node in the graph.`
        );
      return createEdgeArrayForPath(
        type,
        this.multi,
        direction,
        sourceData,
        target
      );
    }
    throw new InvalidArgumentsGraphError(
      `Graph.${name}: too many arguments (expecting 0, 1 or 2 and got ${arguments.length}).`
    );
  };
}
function attachForEachEdge(Class, description) {
  const { name, type, direction } = description;
  const forEachName = "forEach" + name[0].toUpperCase() + name.slice(1, -1);
  Class.prototype[forEachName] = function(source, target, callback) {
    if (type !== "mixed" && this.type !== "mixed" && type !== this.type) return;
    if (arguments.length === 1) {
      callback = source;
      return forEachEdge(false, this, type, callback);
    }
    if (arguments.length === 2) {
      source = "" + source;
      callback = target;
      const nodeData = this._nodes.get(source);
      if (typeof nodeData === "undefined")
        throw new NotFoundGraphError(
          `Graph.${forEachName}: could not find the "${source}" node in the graph.`
        );
      return forEachEdgeForNode(
        false,
        this.multi,
        type === "mixed" ? this.type : type,
        direction,
        nodeData,
        callback
      );
    }
    if (arguments.length === 3) {
      source = "" + source;
      target = "" + target;
      const sourceData = this._nodes.get(source);
      if (!sourceData)
        throw new NotFoundGraphError(
          `Graph.${forEachName}:  could not find the "${source}" source node in the graph.`
        );
      if (!this._nodes.has(target))
        throw new NotFoundGraphError(
          `Graph.${forEachName}:  could not find the "${target}" target node in the graph.`
        );
      return forEachEdgeForPath(
        false,
        type,
        this.multi,
        direction,
        sourceData,
        target,
        callback
      );
    }
    throw new InvalidArgumentsGraphError(
      `Graph.${forEachName}: too many arguments (expecting 1, 2 or 3 and got ${arguments.length}).`
    );
  };
  const mapName = "map" + name[0].toUpperCase() + name.slice(1);
  Class.prototype[mapName] = function() {
    const args = Array.prototype.slice.call(arguments);
    const callback = args.pop();
    let result;
    if (args.length === 0) {
      let length = 0;
      if (type !== "directed") length += this.undirectedSize;
      if (type !== "undirected") length += this.directedSize;
      result = new Array(length);
      let i = 0;
      args.push((e, ea, s, t, sa, ta, u) => {
        result[i++] = callback(e, ea, s, t, sa, ta, u);
      });
    } else {
      result = [];
      args.push((e, ea, s, t, sa, ta, u) => {
        result.push(callback(e, ea, s, t, sa, ta, u));
      });
    }
    this[forEachName].apply(this, args);
    return result;
  };
  const filterName = "filter" + name[0].toUpperCase() + name.slice(1);
  Class.prototype[filterName] = function() {
    const args = Array.prototype.slice.call(arguments);
    const callback = args.pop();
    const result = [];
    args.push((e, ea, s, t, sa, ta, u) => {
      if (callback(e, ea, s, t, sa, ta, u)) result.push(e);
    });
    this[forEachName].apply(this, args);
    return result;
  };
  const reduceName = "reduce" + name[0].toUpperCase() + name.slice(1);
  Class.prototype[reduceName] = function() {
    let args = Array.prototype.slice.call(arguments);
    if (args.length < 2 || args.length > 4) {
      throw new InvalidArgumentsGraphError(
        `Graph.${reduceName}: invalid number of arguments (expecting 2, 3 or 4 and got ${args.length}).`
      );
    }
    if (typeof args[args.length - 1] === "function" && typeof args[args.length - 2] !== "function") {
      throw new InvalidArgumentsGraphError(
        `Graph.${reduceName}: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.`
      );
    }
    let callback;
    let initialValue;
    if (args.length === 2) {
      callback = args[0];
      initialValue = args[1];
      args = [];
    } else if (args.length === 3) {
      callback = args[1];
      initialValue = args[2];
      args = [args[0]];
    } else if (args.length === 4) {
      callback = args[2];
      initialValue = args[3];
      args = [args[0], args[1]];
    }
    let accumulator = initialValue;
    args.push((e, ea, s, t, sa, ta, u) => {
      accumulator = callback(accumulator, e, ea, s, t, sa, ta, u);
    });
    this[forEachName].apply(this, args);
    return accumulator;
  };
}
function attachFindEdge(Class, description) {
  const { name, type, direction } = description;
  const findEdgeName = "find" + name[0].toUpperCase() + name.slice(1, -1);
  Class.prototype[findEdgeName] = function(source, target, callback) {
    if (type !== "mixed" && this.type !== "mixed" && type !== this.type)
      return false;
    if (arguments.length === 1) {
      callback = source;
      return forEachEdge(true, this, type, callback);
    }
    if (arguments.length === 2) {
      source = "" + source;
      callback = target;
      const nodeData = this._nodes.get(source);
      if (typeof nodeData === "undefined")
        throw new NotFoundGraphError(
          `Graph.${findEdgeName}: could not find the "${source}" node in the graph.`
        );
      return forEachEdgeForNode(
        true,
        this.multi,
        type === "mixed" ? this.type : type,
        direction,
        nodeData,
        callback
      );
    }
    if (arguments.length === 3) {
      source = "" + source;
      target = "" + target;
      const sourceData = this._nodes.get(source);
      if (!sourceData)
        throw new NotFoundGraphError(
          `Graph.${findEdgeName}:  could not find the "${source}" source node in the graph.`
        );
      if (!this._nodes.has(target))
        throw new NotFoundGraphError(
          `Graph.${findEdgeName}:  could not find the "${target}" target node in the graph.`
        );
      return forEachEdgeForPath(
        true,
        type,
        this.multi,
        direction,
        sourceData,
        target,
        callback
      );
    }
    throw new InvalidArgumentsGraphError(
      `Graph.${findEdgeName}: too many arguments (expecting 1, 2 or 3 and got ${arguments.length}).`
    );
  };
  const someName = "some" + name[0].toUpperCase() + name.slice(1, -1);
  Class.prototype[someName] = function() {
    const args = Array.prototype.slice.call(arguments);
    const callback = args.pop();
    args.push((e, ea, s, t, sa, ta, u) => {
      return callback(e, ea, s, t, sa, ta, u);
    });
    const found = this[findEdgeName].apply(this, args);
    if (found) return true;
    return false;
  };
  const everyName = "every" + name[0].toUpperCase() + name.slice(1, -1);
  Class.prototype[everyName] = function() {
    const args = Array.prototype.slice.call(arguments);
    const callback = args.pop();
    args.push((e, ea, s, t, sa, ta, u) => {
      return !callback(e, ea, s, t, sa, ta, u);
    });
    const found = this[findEdgeName].apply(this, args);
    if (found) return false;
    return true;
  };
}
function attachEdgeIteratorCreator(Class, description) {
  const { name: originalName, type, direction } = description;
  const name = originalName.slice(0, -1) + "Entries";
  Class.prototype[name] = function(source, target) {
    if (type !== "mixed" && this.type !== "mixed" && type !== this.type)
      return emptyIterator();
    if (!arguments.length) return createEdgeIterator(this, type);
    if (arguments.length === 1) {
      source = "" + source;
      const sourceData = this._nodes.get(source);
      if (!sourceData)
        throw new NotFoundGraphError(
          `Graph.${name}: could not find the "${source}" node in the graph.`
        );
      return createEdgeIteratorForNode(type, direction, sourceData);
    }
    if (arguments.length === 2) {
      source = "" + source;
      target = "" + target;
      const sourceData = this._nodes.get(source);
      if (!sourceData)
        throw new NotFoundGraphError(
          `Graph.${name}:  could not find the "${source}" source node in the graph.`
        );
      if (!this._nodes.has(target))
        throw new NotFoundGraphError(
          `Graph.${name}:  could not find the "${target}" target node in the graph.`
        );
      return createEdgeIteratorForPath(type, direction, sourceData, target);
    }
    throw new InvalidArgumentsGraphError(
      `Graph.${name}: too many arguments (expecting 0, 1 or 2 and got ${arguments.length}).`
    );
  };
}
function attachEdgeIterationMethods(Graph2) {
  EDGES_ITERATION.forEach((description) => {
    attachEdgeArrayCreator(Graph2, description);
    attachForEachEdge(Graph2, description);
    attachFindEdge(Graph2, description);
    attachEdgeIteratorCreator(Graph2, description);
  });
}
var NEIGHBORS_ITERATION = [
  {
    name: "neighbors",
    type: "mixed"
  },
  {
    name: "inNeighbors",
    type: "directed",
    direction: "in"
  },
  {
    name: "outNeighbors",
    type: "directed",
    direction: "out"
  },
  {
    name: "inboundNeighbors",
    type: "mixed",
    direction: "in"
  },
  {
    name: "outboundNeighbors",
    type: "mixed",
    direction: "out"
  },
  {
    name: "directedNeighbors",
    type: "directed"
  },
  {
    name: "undirectedNeighbors",
    type: "undirected"
  }
];
function CompositeSetWrapper() {
  this.A = null;
  this.B = null;
}
CompositeSetWrapper.prototype.wrap = function(set) {
  if (this.A === null) this.A = set;
  else if (this.B === null) this.B = set;
};
CompositeSetWrapper.prototype.has = function(key) {
  if (this.A !== null && key in this.A) return true;
  if (this.B !== null && key in this.B) return true;
  return false;
};
function forEachInObjectOnce(breakable, visited, nodeData, object, callback) {
  for (const k in object) {
    const edgeData = object[k];
    const sourceData = edgeData.source;
    const targetData = edgeData.target;
    const neighborData = sourceData === nodeData ? targetData : sourceData;
    if (visited && visited.has(neighborData.key)) continue;
    const shouldBreak = callback(neighborData.key, neighborData.attributes);
    if (breakable && shouldBreak) return neighborData.key;
  }
  return;
}
function forEachNeighbor(breakable, type, direction, nodeData, callback) {
  if (type !== "mixed") {
    if (type === "undirected")
      return forEachInObjectOnce(
        breakable,
        null,
        nodeData,
        nodeData.undirected,
        callback
      );
    if (typeof direction === "string")
      return forEachInObjectOnce(
        breakable,
        null,
        nodeData,
        nodeData[direction],
        callback
      );
  }
  const visited = new CompositeSetWrapper();
  let found;
  if (type !== "undirected") {
    if (direction !== "out") {
      found = forEachInObjectOnce(
        breakable,
        null,
        nodeData,
        nodeData.in,
        callback
      );
      if (breakable && found) return found;
      visited.wrap(nodeData.in);
    }
    if (direction !== "in") {
      found = forEachInObjectOnce(
        breakable,
        visited,
        nodeData,
        nodeData.out,
        callback
      );
      if (breakable && found) return found;
      visited.wrap(nodeData.out);
    }
  }
  if (type !== "directed") {
    found = forEachInObjectOnce(
      breakable,
      visited,
      nodeData,
      nodeData.undirected,
      callback
    );
    if (breakable && found) return found;
  }
  return;
}
function createNeighborArrayForNode(type, direction, nodeData) {
  if (type !== "mixed") {
    if (type === "undirected") return Object.keys(nodeData.undirected);
    if (typeof direction === "string") return Object.keys(nodeData[direction]);
  }
  const neighbors = [];
  forEachNeighbor(false, type, direction, nodeData, function(key) {
    neighbors.push(key);
  });
  return neighbors;
}
function createDedupedObjectIterator(visited, nodeData, object) {
  const keys = Object.keys(object);
  const l = keys.length;
  let i = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let neighborData = null;
      do {
        if (i >= l) {
          if (visited) visited.wrap(object);
          return { done: true };
        }
        const edgeData = object[keys[i++]];
        const sourceData = edgeData.source;
        const targetData = edgeData.target;
        neighborData = sourceData === nodeData ? targetData : sourceData;
        if (visited && visited.has(neighborData.key)) {
          neighborData = null;
          continue;
        }
      } while (neighborData === null);
      return {
        done: false,
        value: { neighbor: neighborData.key, attributes: neighborData.attributes }
      };
    }
  };
}
function createNeighborIterator(type, direction, nodeData) {
  if (type !== "mixed") {
    if (type === "undirected")
      return createDedupedObjectIterator(null, nodeData, nodeData.undirected);
    if (typeof direction === "string")
      return createDedupedObjectIterator(null, nodeData, nodeData[direction]);
  }
  let iterator = emptyIterator();
  const visited = new CompositeSetWrapper();
  if (type !== "undirected") {
    if (direction !== "out") {
      iterator = chain(
        iterator,
        createDedupedObjectIterator(visited, nodeData, nodeData.in)
      );
    }
    if (direction !== "in") {
      iterator = chain(
        iterator,
        createDedupedObjectIterator(visited, nodeData, nodeData.out)
      );
    }
  }
  if (type !== "directed") {
    iterator = chain(
      iterator,
      createDedupedObjectIterator(visited, nodeData, nodeData.undirected)
    );
  }
  return iterator;
}
function attachNeighborArrayCreator(Class, description) {
  const { name, type, direction } = description;
  Class.prototype[name] = function(node) {
    if (type !== "mixed" && this.type !== "mixed" && type !== this.type)
      return [];
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (typeof nodeData === "undefined")
      throw new NotFoundGraphError(
        `Graph.${name}: could not find the "${node}" node in the graph.`
      );
    return createNeighborArrayForNode(
      type === "mixed" ? this.type : type,
      direction,
      nodeData
    );
  };
}
function attachForEachNeighbor(Class, description) {
  const { name, type, direction } = description;
  const forEachName = "forEach" + name[0].toUpperCase() + name.slice(1, -1);
  Class.prototype[forEachName] = function(node, callback) {
    if (type !== "mixed" && this.type !== "mixed" && type !== this.type) return;
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (typeof nodeData === "undefined")
      throw new NotFoundGraphError(
        `Graph.${forEachName}: could not find the "${node}" node in the graph.`
      );
    forEachNeighbor(
      false,
      type === "mixed" ? this.type : type,
      direction,
      nodeData,
      callback
    );
  };
  const mapName = "map" + name[0].toUpperCase() + name.slice(1);
  Class.prototype[mapName] = function(node, callback) {
    const result = [];
    this[forEachName](node, (n, a) => {
      result.push(callback(n, a));
    });
    return result;
  };
  const filterName = "filter" + name[0].toUpperCase() + name.slice(1);
  Class.prototype[filterName] = function(node, callback) {
    const result = [];
    this[forEachName](node, (n, a) => {
      if (callback(n, a)) result.push(n);
    });
    return result;
  };
  const reduceName = "reduce" + name[0].toUpperCase() + name.slice(1);
  Class.prototype[reduceName] = function(node, callback, initialValue) {
    if (arguments.length < 3)
      throw new InvalidArgumentsGraphError(
        `Graph.${reduceName}: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.`
      );
    let accumulator = initialValue;
    this[forEachName](node, (n, a) => {
      accumulator = callback(accumulator, n, a);
    });
    return accumulator;
  };
}
function attachFindNeighbor(Class, description) {
  const { name, type, direction } = description;
  const capitalizedSingular = name[0].toUpperCase() + name.slice(1, -1);
  const findName = "find" + capitalizedSingular;
  Class.prototype[findName] = function(node, callback) {
    if (type !== "mixed" && this.type !== "mixed" && type !== this.type) return;
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (typeof nodeData === "undefined")
      throw new NotFoundGraphError(
        `Graph.${findName}: could not find the "${node}" node in the graph.`
      );
    return forEachNeighbor(
      true,
      type === "mixed" ? this.type : type,
      direction,
      nodeData,
      callback
    );
  };
  const someName = "some" + capitalizedSingular;
  Class.prototype[someName] = function(node, callback) {
    const found = this[findName](node, callback);
    if (found) return true;
    return false;
  };
  const everyName = "every" + capitalizedSingular;
  Class.prototype[everyName] = function(node, callback) {
    const found = this[findName](node, (n, a) => {
      return !callback(n, a);
    });
    if (found) return false;
    return true;
  };
}
function attachNeighborIteratorCreator(Class, description) {
  const { name, type, direction } = description;
  const iteratorName = name.slice(0, -1) + "Entries";
  Class.prototype[iteratorName] = function(node) {
    if (type !== "mixed" && this.type !== "mixed" && type !== this.type)
      return emptyIterator();
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (typeof nodeData === "undefined")
      throw new NotFoundGraphError(
        `Graph.${iteratorName}: could not find the "${node}" node in the graph.`
      );
    return createNeighborIterator(
      type === "mixed" ? this.type : type,
      direction,
      nodeData
    );
  };
}
function attachNeighborIterationMethods(Graph2) {
  NEIGHBORS_ITERATION.forEach((description) => {
    attachNeighborArrayCreator(Graph2, description);
    attachForEachNeighbor(Graph2, description);
    attachFindNeighbor(Graph2, description);
    attachNeighborIteratorCreator(Graph2, description);
  });
}
function forEachAdjacency(breakable, assymetric, disconnectedNodes, graph, callback) {
  const iterator = graph._nodes.values();
  const type = graph.type;
  let step, sourceData, neighbor, adj, edgeData, targetData, shouldBreak;
  while (step = iterator.next(), step.done !== true) {
    let hasEdges = false;
    sourceData = step.value;
    if (type !== "undirected") {
      adj = sourceData.out;
      for (neighbor in adj) {
        edgeData = adj[neighbor];
        do {
          targetData = edgeData.target;
          hasEdges = true;
          shouldBreak = callback(
            sourceData.key,
            targetData.key,
            sourceData.attributes,
            targetData.attributes,
            edgeData.key,
            edgeData.attributes,
            edgeData.undirected
          );
          if (breakable && shouldBreak) return edgeData;
          edgeData = edgeData.next;
        } while (edgeData);
      }
    }
    if (type !== "directed") {
      adj = sourceData.undirected;
      for (neighbor in adj) {
        if (assymetric && sourceData.key > neighbor) continue;
        edgeData = adj[neighbor];
        do {
          targetData = edgeData.target;
          if (targetData.key !== neighbor) targetData = edgeData.source;
          hasEdges = true;
          shouldBreak = callback(
            sourceData.key,
            targetData.key,
            sourceData.attributes,
            targetData.attributes,
            edgeData.key,
            edgeData.attributes,
            edgeData.undirected
          );
          if (breakable && shouldBreak) return edgeData;
          edgeData = edgeData.next;
        } while (edgeData);
      }
    }
    if (disconnectedNodes && !hasEdges) {
      shouldBreak = callback(
        sourceData.key,
        null,
        sourceData.attributes,
        null,
        null,
        null,
        null
      );
      if (breakable && shouldBreak) return null;
    }
  }
  return;
}
function serializeNode(key, data) {
  const serialized = { key };
  if (!isEmpty(data.attributes))
    serialized.attributes = assign({}, data.attributes);
  return serialized;
}
function serializeEdge(type, key, data) {
  const serialized = {
    key,
    source: data.source.key,
    target: data.target.key
  };
  if (!isEmpty(data.attributes))
    serialized.attributes = assign({}, data.attributes);
  if (type === "mixed" && data.undirected) serialized.undirected = true;
  return serialized;
}
function validateSerializedNode(value) {
  if (!isPlainObject(value))
    throw new InvalidArgumentsGraphError(
      'Graph.import: invalid serialized node. A serialized node should be a plain object with at least a "key" property.'
    );
  if (!("key" in value))
    throw new InvalidArgumentsGraphError(
      "Graph.import: serialized node is missing its key."
    );
  if ("attributes" in value && (!isPlainObject(value.attributes) || value.attributes === null))
    throw new InvalidArgumentsGraphError(
      "Graph.import: invalid attributes. Attributes should be a plain object, null or omitted."
    );
}
function validateSerializedEdge(value) {
  if (!isPlainObject(value))
    throw new InvalidArgumentsGraphError(
      'Graph.import: invalid serialized edge. A serialized edge should be a plain object with at least a "source" & "target" property.'
    );
  if (!("source" in value))
    throw new InvalidArgumentsGraphError(
      "Graph.import: serialized edge is missing its source."
    );
  if (!("target" in value))
    throw new InvalidArgumentsGraphError(
      "Graph.import: serialized edge is missing its target."
    );
  if ("attributes" in value && (!isPlainObject(value.attributes) || value.attributes === null))
    throw new InvalidArgumentsGraphError(
      "Graph.import: invalid attributes. Attributes should be a plain object, null or omitted."
    );
  if ("undirected" in value && typeof value.undirected !== "boolean")
    throw new InvalidArgumentsGraphError(
      "Graph.import: invalid undirectedness information. Undirected should be boolean or omitted."
    );
}
var INSTANCE_ID = incrementalIdStartingFromRandomByte();
var TYPES = /* @__PURE__ */ new Set(["directed", "undirected", "mixed"]);
var EMITTER_PROPS = /* @__PURE__ */ new Set([
  "domain",
  "_events",
  "_eventsCount",
  "_maxListeners"
]);
var EDGE_ADD_METHODS = [
  {
    name: (verb) => `${verb}Edge`,
    generateKey: true
  },
  {
    name: (verb) => `${verb}DirectedEdge`,
    generateKey: true,
    type: "directed"
  },
  {
    name: (verb) => `${verb}UndirectedEdge`,
    generateKey: true,
    type: "undirected"
  },
  {
    name: (verb) => `${verb}EdgeWithKey`
  },
  {
    name: (verb) => `${verb}DirectedEdgeWithKey`,
    type: "directed"
  },
  {
    name: (verb) => `${verb}UndirectedEdgeWithKey`,
    type: "undirected"
  }
];
var DEFAULTS = {
  allowSelfLoops: true,
  multi: false,
  type: "mixed"
};
function addNode(graph, node, attributes) {
  if (attributes && !isPlainObject(attributes))
    throw new InvalidArgumentsGraphError(
      `Graph.addNode: invalid attributes. Expecting an object but got "${attributes}"`
    );
  node = "" + node;
  attributes = attributes || {};
  if (graph._nodes.has(node))
    throw new UsageGraphError(
      `Graph.addNode: the "${node}" node already exist in the graph.`
    );
  const data = new graph.NodeDataClass(node, attributes);
  graph._nodes.set(node, data);
  graph.emit("nodeAdded", {
    key: node,
    attributes
  });
  return data;
}
function unsafeAddNode(graph, node, attributes) {
  const data = new graph.NodeDataClass(node, attributes);
  graph._nodes.set(node, data);
  graph.emit("nodeAdded", {
    key: node,
    attributes
  });
  return data;
}
function addEdge(graph, name, mustGenerateKey, undirected, edge, source, target, attributes) {
  if (!undirected && graph.type === "undirected")
    throw new UsageGraphError(
      `Graph.${name}: you cannot add a directed edge to an undirected graph. Use the #.addEdge or #.addUndirectedEdge instead.`
    );
  if (undirected && graph.type === "directed")
    throw new UsageGraphError(
      `Graph.${name}: you cannot add an undirected edge to a directed graph. Use the #.addEdge or #.addDirectedEdge instead.`
    );
  if (attributes && !isPlainObject(attributes))
    throw new InvalidArgumentsGraphError(
      `Graph.${name}: invalid attributes. Expecting an object but got "${attributes}"`
    );
  source = "" + source;
  target = "" + target;
  attributes = attributes || {};
  if (!graph.allowSelfLoops && source === target)
    throw new UsageGraphError(
      `Graph.${name}: source & target are the same ("${source}"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false.`
    );
  const sourceData = graph._nodes.get(source), targetData = graph._nodes.get(target);
  if (!sourceData)
    throw new NotFoundGraphError(
      `Graph.${name}: source node "${source}" not found.`
    );
  if (!targetData)
    throw new NotFoundGraphError(
      `Graph.${name}: target node "${target}" not found.`
    );
  const eventData = {
    key: null,
    undirected,
    source,
    target,
    attributes
  };
  if (mustGenerateKey) {
    edge = graph._edgeKeyGenerator();
  } else {
    edge = "" + edge;
    if (graph._edges.has(edge))
      throw new UsageGraphError(
        `Graph.${name}: the "${edge}" edge already exists in the graph.`
      );
  }
  if (!graph.multi && (undirected ? typeof sourceData.undirected[target] !== "undefined" : typeof sourceData.out[target] !== "undefined")) {
    throw new UsageGraphError(
      `Graph.${name}: an edge linking "${source}" to "${target}" already exists. If you really want to add multiple edges linking those nodes, you should create a multi graph by using the 'multi' option.`
    );
  }
  const edgeData = new EdgeData(
    undirected,
    edge,
    sourceData,
    targetData,
    attributes
  );
  graph._edges.set(edge, edgeData);
  const isSelfLoop = source === target;
  if (undirected) {
    sourceData.undirectedDegree++;
    targetData.undirectedDegree++;
    if (isSelfLoop) {
      sourceData.undirectedLoops++;
      graph._undirectedSelfLoopCount++;
    }
  } else {
    sourceData.outDegree++;
    targetData.inDegree++;
    if (isSelfLoop) {
      sourceData.directedLoops++;
      graph._directedSelfLoopCount++;
    }
  }
  if (graph.multi) edgeData.attachMulti();
  else edgeData.attach();
  if (undirected) graph._undirectedSize++;
  else graph._directedSize++;
  eventData.key = edge;
  graph.emit("edgeAdded", eventData);
  return edge;
}
function mergeEdge(graph, name, mustGenerateKey, undirected, edge, source, target, attributes, asUpdater) {
  if (!undirected && graph.type === "undirected")
    throw new UsageGraphError(
      `Graph.${name}: you cannot merge/update a directed edge to an undirected graph. Use the #.mergeEdge/#.updateEdge or #.addUndirectedEdge instead.`
    );
  if (undirected && graph.type === "directed")
    throw new UsageGraphError(
      `Graph.${name}: you cannot merge/update an undirected edge to a directed graph. Use the #.mergeEdge/#.updateEdge or #.addDirectedEdge instead.`
    );
  if (attributes) {
    if (asUpdater) {
      if (typeof attributes !== "function")
        throw new InvalidArgumentsGraphError(
          `Graph.${name}: invalid updater function. Expecting a function but got "${attributes}"`
        );
    } else {
      if (!isPlainObject(attributes))
        throw new InvalidArgumentsGraphError(
          `Graph.${name}: invalid attributes. Expecting an object but got "${attributes}"`
        );
    }
  }
  source = "" + source;
  target = "" + target;
  let updater;
  if (asUpdater) {
    updater = attributes;
    attributes = void 0;
  }
  if (!graph.allowSelfLoops && source === target)
    throw new UsageGraphError(
      `Graph.${name}: source & target are the same ("${source}"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false.`
    );
  let sourceData = graph._nodes.get(source);
  let targetData = graph._nodes.get(target);
  let edgeData;
  let alreadyExistingEdgeData;
  if (!mustGenerateKey) {
    edgeData = graph._edges.get(edge);
    if (edgeData) {
      if (edgeData.source.key !== source || edgeData.target.key !== target) {
        if (!undirected || edgeData.source.key !== target || edgeData.target.key !== source) {
          throw new UsageGraphError(
            `Graph.${name}: inconsistency detected when attempting to merge the "${edge}" edge with "${source}" source & "${target}" target vs. ("${edgeData.source.key}", "${edgeData.target.key}").`
          );
        }
      }
      alreadyExistingEdgeData = edgeData;
    }
  }
  if (!alreadyExistingEdgeData && !graph.multi && sourceData) {
    alreadyExistingEdgeData = undirected ? sourceData.undirected[target] : sourceData.out[target];
  }
  if (alreadyExistingEdgeData) {
    const info = [alreadyExistingEdgeData.key, false, false, false];
    if (asUpdater ? !updater : !attributes) return info;
    if (asUpdater) {
      const oldAttributes = alreadyExistingEdgeData.attributes;
      alreadyExistingEdgeData.attributes = updater(oldAttributes);
      graph.emit("edgeAttributesUpdated", {
        type: "replace",
        key: alreadyExistingEdgeData.key,
        attributes: alreadyExistingEdgeData.attributes
      });
    } else {
      assign(alreadyExistingEdgeData.attributes, attributes);
      graph.emit("edgeAttributesUpdated", {
        type: "merge",
        key: alreadyExistingEdgeData.key,
        attributes: alreadyExistingEdgeData.attributes,
        data: attributes
      });
    }
    return info;
  }
  attributes = attributes || {};
  if (asUpdater && updater) attributes = updater(attributes);
  const eventData = {
    key: null,
    undirected,
    source,
    target,
    attributes
  };
  if (mustGenerateKey) {
    edge = graph._edgeKeyGenerator();
  } else {
    edge = "" + edge;
    if (graph._edges.has(edge))
      throw new UsageGraphError(
        `Graph.${name}: the "${edge}" edge already exists in the graph.`
      );
  }
  let sourceWasAdded = false;
  let targetWasAdded = false;
  if (!sourceData) {
    sourceData = unsafeAddNode(graph, source, {});
    sourceWasAdded = true;
    if (source === target) {
      targetData = sourceData;
      targetWasAdded = true;
    }
  }
  if (!targetData) {
    targetData = unsafeAddNode(graph, target, {});
    targetWasAdded = true;
  }
  edgeData = new EdgeData(undirected, edge, sourceData, targetData, attributes);
  graph._edges.set(edge, edgeData);
  const isSelfLoop = source === target;
  if (undirected) {
    sourceData.undirectedDegree++;
    targetData.undirectedDegree++;
    if (isSelfLoop) {
      sourceData.undirectedLoops++;
      graph._undirectedSelfLoopCount++;
    }
  } else {
    sourceData.outDegree++;
    targetData.inDegree++;
    if (isSelfLoop) {
      sourceData.directedLoops++;
      graph._directedSelfLoopCount++;
    }
  }
  if (graph.multi) edgeData.attachMulti();
  else edgeData.attach();
  if (undirected) graph._undirectedSize++;
  else graph._directedSize++;
  eventData.key = edge;
  graph.emit("edgeAdded", eventData);
  return [edge, true, sourceWasAdded, targetWasAdded];
}
function dropEdgeFromData(graph, edgeData) {
  graph._edges.delete(edgeData.key);
  const { source: sourceData, target: targetData, attributes } = edgeData;
  const undirected = edgeData.undirected;
  const isSelfLoop = sourceData === targetData;
  if (undirected) {
    sourceData.undirectedDegree--;
    targetData.undirectedDegree--;
    if (isSelfLoop) {
      sourceData.undirectedLoops--;
      graph._undirectedSelfLoopCount--;
    }
  } else {
    sourceData.outDegree--;
    targetData.inDegree--;
    if (isSelfLoop) {
      sourceData.directedLoops--;
      graph._directedSelfLoopCount--;
    }
  }
  if (graph.multi) edgeData.detachMulti();
  else edgeData.detach();
  if (undirected) graph._undirectedSize--;
  else graph._directedSize--;
  graph.emit("edgeDropped", {
    key: edgeData.key,
    attributes,
    source: sourceData.key,
    target: targetData.key,
    undirected
  });
}
var Graph = class _Graph extends EventEmitter {
  constructor(options) {
    super();
    options = assign({}, DEFAULTS, options);
    if (typeof options.multi !== "boolean")
      throw new InvalidArgumentsGraphError(
        `Graph.constructor: invalid 'multi' option. Expecting a boolean but got "${options.multi}".`
      );
    if (!TYPES.has(options.type))
      throw new InvalidArgumentsGraphError(
        `Graph.constructor: invalid 'type' option. Should be one of "mixed", "directed" or "undirected" but got "${options.type}".`
      );
    if (typeof options.allowSelfLoops !== "boolean")
      throw new InvalidArgumentsGraphError(
        `Graph.constructor: invalid 'allowSelfLoops' option. Expecting a boolean but got "${options.allowSelfLoops}".`
      );
    const NodeDataClass = options.type === "mixed" ? MixedNodeData : options.type === "directed" ? DirectedNodeData : UndirectedNodeData;
    privateProperty(this, "NodeDataClass", NodeDataClass);
    const instancePrefix = "geid_" + INSTANCE_ID() + "_";
    let edgeId = 0;
    const edgeKeyGenerator = () => {
      let availableEdgeKey;
      do {
        availableEdgeKey = instancePrefix + edgeId++;
      } while (this._edges.has(availableEdgeKey));
      return availableEdgeKey;
    };
    privateProperty(this, "_attributes", {});
    privateProperty(this, "_nodes", /* @__PURE__ */ new Map());
    privateProperty(this, "_edges", /* @__PURE__ */ new Map());
    privateProperty(this, "_directedSize", 0);
    privateProperty(this, "_undirectedSize", 0);
    privateProperty(this, "_directedSelfLoopCount", 0);
    privateProperty(this, "_undirectedSelfLoopCount", 0);
    privateProperty(this, "_edgeKeyGenerator", edgeKeyGenerator);
    privateProperty(this, "_options", options);
    EMITTER_PROPS.forEach((prop) => privateProperty(this, prop, this[prop]));
    readOnlyProperty(this, "order", () => this._nodes.size);
    readOnlyProperty(this, "size", () => this._edges.size);
    readOnlyProperty(this, "directedSize", () => this._directedSize);
    readOnlyProperty(this, "undirectedSize", () => this._undirectedSize);
    readOnlyProperty(
      this,
      "selfLoopCount",
      () => this._directedSelfLoopCount + this._undirectedSelfLoopCount
    );
    readOnlyProperty(
      this,
      "directedSelfLoopCount",
      () => this._directedSelfLoopCount
    );
    readOnlyProperty(
      this,
      "undirectedSelfLoopCount",
      () => this._undirectedSelfLoopCount
    );
    readOnlyProperty(this, "multi", this._options.multi);
    readOnlyProperty(this, "type", this._options.type);
    readOnlyProperty(this, "allowSelfLoops", this._options.allowSelfLoops);
    readOnlyProperty(this, "implementation", () => "graphology");
  }
  _resetInstanceCounters() {
    this._directedSize = 0;
    this._undirectedSize = 0;
    this._directedSelfLoopCount = 0;
    this._undirectedSelfLoopCount = 0;
  }
  /**---------------------------------------------------------------------------
   * Read
   **---------------------------------------------------------------------------
   */
  /**
   * Method returning whether the given node is found in the graph.
   *
   * @param  {any}     node - The node.
   * @return {boolean}
   */
  hasNode(node) {
    return this._nodes.has("" + node);
  }
  /**
   * Method returning whether the given directed edge is found in the graph.
   *
   * Arity 1:
   * @param  {any}     edge - The edge's key.
   *
   * Arity 2:
   * @param  {any}     source - The edge's source.
   * @param  {any}     target - The edge's target.
   *
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the arguments are invalid.
   */
  hasDirectedEdge(source, target) {
    if (this.type === "undirected") return false;
    if (arguments.length === 1) {
      const edge = "" + source;
      const edgeData = this._edges.get(edge);
      return !!edgeData && !edgeData.undirected;
    } else if (arguments.length === 2) {
      source = "" + source;
      target = "" + target;
      const nodeData = this._nodes.get(source);
      if (!nodeData) return false;
      return nodeData.out.hasOwnProperty(target);
    }
    throw new InvalidArgumentsGraphError(
      `Graph.hasDirectedEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`
    );
  }
  /**
   * Method returning whether the given undirected edge is found in the graph.
   *
   * Arity 1:
   * @param  {any}     edge - The edge's key.
   *
   * Arity 2:
   * @param  {any}     source - The edge's source.
   * @param  {any}     target - The edge's target.
   *
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the arguments are invalid.
   */
  hasUndirectedEdge(source, target) {
    if (this.type === "directed") return false;
    if (arguments.length === 1) {
      const edge = "" + source;
      const edgeData = this._edges.get(edge);
      return !!edgeData && edgeData.undirected;
    } else if (arguments.length === 2) {
      source = "" + source;
      target = "" + target;
      const nodeData = this._nodes.get(source);
      if (!nodeData) return false;
      return nodeData.undirected.hasOwnProperty(target);
    }
    throw new InvalidArgumentsGraphError(
      `Graph.hasDirectedEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`
    );
  }
  /**
   * Method returning whether the given edge is found in the graph.
   *
   * Arity 1:
   * @param  {any}     edge - The edge's key.
   *
   * Arity 2:
   * @param  {any}     source - The edge's source.
   * @param  {any}     target - The edge's target.
   *
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the arguments are invalid.
   */
  hasEdge(source, target) {
    if (arguments.length === 1) {
      const edge = "" + source;
      return this._edges.has(edge);
    } else if (arguments.length === 2) {
      source = "" + source;
      target = "" + target;
      const nodeData = this._nodes.get(source);
      if (!nodeData) return false;
      return typeof nodeData.out !== "undefined" && nodeData.out.hasOwnProperty(target) || typeof nodeData.undirected !== "undefined" && nodeData.undirected.hasOwnProperty(target);
    }
    throw new InvalidArgumentsGraphError(
      `Graph.hasEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`
    );
  }
  /**
   * Method returning the edge matching source & target in a directed fashion.
   *
   * @param  {any} source - The edge's source.
   * @param  {any} target - The edge's target.
   *
   * @return {any|undefined}
   *
   * @throws {Error} - Will throw if the graph is multi.
   * @throws {Error} - Will throw if source or target doesn't exist.
   */
  directedEdge(source, target) {
    if (this.type === "undirected") return;
    source = "" + source;
    target = "" + target;
    if (this.multi)
      throw new UsageGraphError(
        "Graph.directedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.directedEdges instead."
      );
    const sourceData = this._nodes.get(source);
    if (!sourceData)
      throw new NotFoundGraphError(
        `Graph.directedEdge: could not find the "${source}" source node in the graph.`
      );
    if (!this._nodes.has(target))
      throw new NotFoundGraphError(
        `Graph.directedEdge: could not find the "${target}" target node in the graph.`
      );
    const edgeData = sourceData.out && sourceData.out[target] || void 0;
    if (edgeData) return edgeData.key;
  }
  /**
   * Method returning the edge matching source & target in a undirected fashion.
   *
   * @param  {any} source - The edge's source.
   * @param  {any} target - The edge's target.
   *
   * @return {any|undefined}
   *
   * @throws {Error} - Will throw if the graph is multi.
   * @throws {Error} - Will throw if source or target doesn't exist.
   */
  undirectedEdge(source, target) {
    if (this.type === "directed") return;
    source = "" + source;
    target = "" + target;
    if (this.multi)
      throw new UsageGraphError(
        "Graph.undirectedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.undirectedEdges instead."
      );
    const sourceData = this._nodes.get(source);
    if (!sourceData)
      throw new NotFoundGraphError(
        `Graph.undirectedEdge: could not find the "${source}" source node in the graph.`
      );
    if (!this._nodes.has(target))
      throw new NotFoundGraphError(
        `Graph.undirectedEdge: could not find the "${target}" target node in the graph.`
      );
    const edgeData = sourceData.undirected && sourceData.undirected[target] || void 0;
    if (edgeData) return edgeData.key;
  }
  /**
   * Method returning the edge matching source & target in a mixed fashion.
   *
   * @param  {any} source - The edge's source.
   * @param  {any} target - The edge's target.
   *
   * @return {any|undefined}
   *
   * @throws {Error} - Will throw if the graph is multi.
   * @throws {Error} - Will throw if source or target doesn't exist.
   */
  edge(source, target) {
    if (this.multi)
      throw new UsageGraphError(
        "Graph.edge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.edges instead."
      );
    source = "" + source;
    target = "" + target;
    const sourceData = this._nodes.get(source);
    if (!sourceData)
      throw new NotFoundGraphError(
        `Graph.edge: could not find the "${source}" source node in the graph.`
      );
    if (!this._nodes.has(target))
      throw new NotFoundGraphError(
        `Graph.edge: could not find the "${target}" target node in the graph.`
      );
    const edgeData = sourceData.out && sourceData.out[target] || sourceData.undirected && sourceData.undirected[target] || void 0;
    if (edgeData) return edgeData.key;
  }
  /**
   * Method returning whether two nodes are directed neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areDirectedNeighbors(node, neighbor) {
    node = "" + node;
    neighbor = "" + neighbor;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areDirectedNeighbors: could not find the "${node}" node in the graph.`
      );
    if (this.type === "undirected") return false;
    return neighbor in nodeData.in || neighbor in nodeData.out;
  }
  /**
   * Method returning whether two nodes are out neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areOutNeighbors(node, neighbor) {
    node = "" + node;
    neighbor = "" + neighbor;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areOutNeighbors: could not find the "${node}" node in the graph.`
      );
    if (this.type === "undirected") return false;
    return neighbor in nodeData.out;
  }
  /**
   * Method returning whether two nodes are in neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areInNeighbors(node, neighbor) {
    node = "" + node;
    neighbor = "" + neighbor;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areInNeighbors: could not find the "${node}" node in the graph.`
      );
    if (this.type === "undirected") return false;
    return neighbor in nodeData.in;
  }
  /**
   * Method returning whether two nodes are undirected neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areUndirectedNeighbors(node, neighbor) {
    node = "" + node;
    neighbor = "" + neighbor;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areUndirectedNeighbors: could not find the "${node}" node in the graph.`
      );
    if (this.type === "directed") return false;
    return neighbor in nodeData.undirected;
  }
  /**
   * Method returning whether two nodes are neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areNeighbors(node, neighbor) {
    node = "" + node;
    neighbor = "" + neighbor;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areNeighbors: could not find the "${node}" node in the graph.`
      );
    if (this.type !== "undirected") {
      if (neighbor in nodeData.in || neighbor in nodeData.out) return true;
    }
    if (this.type !== "directed") {
      if (neighbor in nodeData.undirected) return true;
    }
    return false;
  }
  /**
   * Method returning whether two nodes are inbound neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areInboundNeighbors(node, neighbor) {
    node = "" + node;
    neighbor = "" + neighbor;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areInboundNeighbors: could not find the "${node}" node in the graph.`
      );
    if (this.type !== "undirected") {
      if (neighbor in nodeData.in) return true;
    }
    if (this.type !== "directed") {
      if (neighbor in nodeData.undirected) return true;
    }
    return false;
  }
  /**
   * Method returning whether two nodes are outbound neighbors.
   *
   * @param  {any}     node     - The node's key.
   * @param  {any}     neighbor - The neighbor's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  areOutboundNeighbors(node, neighbor) {
    node = "" + node;
    neighbor = "" + neighbor;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.areOutboundNeighbors: could not find the "${node}" node in the graph.`
      );
    if (this.type !== "undirected") {
      if (neighbor in nodeData.out) return true;
    }
    if (this.type !== "directed") {
      if (neighbor in nodeData.undirected) return true;
    }
    return false;
  }
  /**
   * Method returning the given node's in degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inDegree(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.inDegree: could not find the "${node}" node in the graph.`
      );
    if (this.type === "undirected") return 0;
    return nodeData.inDegree;
  }
  /**
   * Method returning the given node's out degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outDegree(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.outDegree: could not find the "${node}" node in the graph.`
      );
    if (this.type === "undirected") return 0;
    return nodeData.outDegree;
  }
  /**
   * Method returning the given node's directed degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  directedDegree(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.directedDegree: could not find the "${node}" node in the graph.`
      );
    if (this.type === "undirected") return 0;
    return nodeData.inDegree + nodeData.outDegree;
  }
  /**
   * Method returning the given node's undirected degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  undirectedDegree(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.undirectedDegree: could not find the "${node}" node in the graph.`
      );
    if (this.type === "directed") return 0;
    return nodeData.undirectedDegree;
  }
  /**
   * Method returning the given node's inbound degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's inbound degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inboundDegree(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.inboundDegree: could not find the "${node}" node in the graph.`
      );
    let degree = 0;
    if (this.type !== "directed") {
      degree += nodeData.undirectedDegree;
    }
    if (this.type !== "undirected") {
      degree += nodeData.inDegree;
    }
    return degree;
  }
  /**
   * Method returning the given node's outbound degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's outbound degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outboundDegree(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.outboundDegree: could not find the "${node}" node in the graph.`
      );
    let degree = 0;
    if (this.type !== "directed") {
      degree += nodeData.undirectedDegree;
    }
    if (this.type !== "undirected") {
      degree += nodeData.outDegree;
    }
    return degree;
  }
  /**
   * Method returning the given node's directed degree.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  degree(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.degree: could not find the "${node}" node in the graph.`
      );
    let degree = 0;
    if (this.type !== "directed") {
      degree += nodeData.undirectedDegree;
    }
    if (this.type !== "undirected") {
      degree += nodeData.inDegree + nodeData.outDegree;
    }
    return degree;
  }
  /**
   * Method returning the given node's in degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inDegreeWithoutSelfLoops(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.inDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );
    if (this.type === "undirected") return 0;
    return nodeData.inDegree - nodeData.directedLoops;
  }
  /**
   * Method returning the given node's out degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outDegreeWithoutSelfLoops(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.outDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );
    if (this.type === "undirected") return 0;
    return nodeData.outDegree - nodeData.directedLoops;
  }
  /**
   * Method returning the given node's directed degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  directedDegreeWithoutSelfLoops(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.directedDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );
    if (this.type === "undirected") return 0;
    return nodeData.inDegree + nodeData.outDegree - nodeData.directedLoops * 2;
  }
  /**
   * Method returning the given node's undirected degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's in degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  undirectedDegreeWithoutSelfLoops(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.undirectedDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );
    if (this.type === "directed") return 0;
    return nodeData.undirectedDegree - nodeData.undirectedLoops * 2;
  }
  /**
   * Method returning the given node's inbound degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's inbound degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  inboundDegreeWithoutSelfLoops(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.inboundDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );
    let degree = 0;
    let loops = 0;
    if (this.type !== "directed") {
      degree += nodeData.undirectedDegree;
      loops += nodeData.undirectedLoops * 2;
    }
    if (this.type !== "undirected") {
      degree += nodeData.inDegree;
      loops += nodeData.directedLoops;
    }
    return degree - loops;
  }
  /**
   * Method returning the given node's outbound degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's outbound degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  outboundDegreeWithoutSelfLoops(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.outboundDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );
    let degree = 0;
    let loops = 0;
    if (this.type !== "directed") {
      degree += nodeData.undirectedDegree;
      loops += nodeData.undirectedLoops * 2;
    }
    if (this.type !== "undirected") {
      degree += nodeData.outDegree;
      loops += nodeData.directedLoops;
    }
    return degree - loops;
  }
  /**
   * Method returning the given node's directed degree without considering self loops.
   *
   * @param  {any}     node - The node's key.
   * @return {number}       - The node's degree.
   *
   * @throws {Error} - Will throw if the node isn't in the graph.
   */
  degreeWithoutSelfLoops(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.degreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
      );
    let degree = 0;
    let loops = 0;
    if (this.type !== "directed") {
      degree += nodeData.undirectedDegree;
      loops += nodeData.undirectedLoops * 2;
    }
    if (this.type !== "undirected") {
      degree += nodeData.inDegree + nodeData.outDegree;
      loops += nodeData.directedLoops * 2;
    }
    return degree - loops;
  }
  /**
   * Method returning the given edge's source.
   *
   * @param  {any} edge - The edge's key.
   * @return {any}      - The edge's source.
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  source(edge) {
    edge = "" + edge;
    const data = this._edges.get(edge);
    if (!data)
      throw new NotFoundGraphError(
        `Graph.source: could not find the "${edge}" edge in the graph.`
      );
    return data.source.key;
  }
  /**
   * Method returning the given edge's target.
   *
   * @param  {any} edge - The edge's key.
   * @return {any}      - The edge's target.
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  target(edge) {
    edge = "" + edge;
    const data = this._edges.get(edge);
    if (!data)
      throw new NotFoundGraphError(
        `Graph.target: could not find the "${edge}" edge in the graph.`
      );
    return data.target.key;
  }
  /**
   * Method returning the given edge's extremities.
   *
   * @param  {any}   edge - The edge's key.
   * @return {array}      - The edge's extremities.
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  extremities(edge) {
    edge = "" + edge;
    const edgeData = this._edges.get(edge);
    if (!edgeData)
      throw new NotFoundGraphError(
        `Graph.extremities: could not find the "${edge}" edge in the graph.`
      );
    return [edgeData.source.key, edgeData.target.key];
  }
  /**
   * Given a node & an edge, returns the other extremity of the edge.
   *
   * @param  {any}   node - The node's key.
   * @param  {any}   edge - The edge's key.
   * @return {any}        - The related node.
   *
   * @throws {Error} - Will throw if the edge isn't in the graph or if the
   *                   edge & node are not related.
   */
  opposite(node, edge) {
    node = "" + node;
    edge = "" + edge;
    const data = this._edges.get(edge);
    if (!data)
      throw new NotFoundGraphError(
        `Graph.opposite: could not find the "${edge}" edge in the graph.`
      );
    const source = data.source.key;
    const target = data.target.key;
    if (node === source) return target;
    if (node === target) return source;
    throw new NotFoundGraphError(
      `Graph.opposite: the "${node}" node is not attached to the "${edge}" edge (${source}, ${target}).`
    );
  }
  /**
   * Returns whether the given edge has the given node as extremity.
   *
   * @param  {any}     edge - The edge's key.
   * @param  {any}     node - The node's key.
   * @return {boolean}      - The related node.
   *
   * @throws {Error} - Will throw if either the node or the edge isn't in the graph.
   */
  hasExtremity(edge, node) {
    edge = "" + edge;
    node = "" + node;
    const data = this._edges.get(edge);
    if (!data)
      throw new NotFoundGraphError(
        `Graph.hasExtremity: could not find the "${edge}" edge in the graph.`
      );
    return data.source.key === node || data.target.key === node;
  }
  /**
   * Method returning whether the given edge is undirected.
   *
   * @param  {any}     edge - The edge's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  isUndirected(edge) {
    edge = "" + edge;
    const data = this._edges.get(edge);
    if (!data)
      throw new NotFoundGraphError(
        `Graph.isUndirected: could not find the "${edge}" edge in the graph.`
      );
    return data.undirected;
  }
  /**
   * Method returning whether the given edge is directed.
   *
   * @param  {any}     edge - The edge's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  isDirected(edge) {
    edge = "" + edge;
    const data = this._edges.get(edge);
    if (!data)
      throw new NotFoundGraphError(
        `Graph.isDirected: could not find the "${edge}" edge in the graph.`
      );
    return !data.undirected;
  }
  /**
   * Method returning whether the given edge is a self loop.
   *
   * @param  {any}     edge - The edge's key.
   * @return {boolean}
   *
   * @throws {Error} - Will throw if the edge isn't in the graph.
   */
  isSelfLoop(edge) {
    edge = "" + edge;
    const data = this._edges.get(edge);
    if (!data)
      throw new NotFoundGraphError(
        `Graph.isSelfLoop: could not find the "${edge}" edge in the graph.`
      );
    return data.source === data.target;
  }
  /**---------------------------------------------------------------------------
   * Mutation
   **---------------------------------------------------------------------------
   */
  /**
   * Method used to add a node to the graph.
   *
   * @param  {any}    node         - The node.
   * @param  {object} [attributes] - Optional attributes.
   * @return {any}                 - The node.
   *
   * @throws {Error} - Will throw if the given node already exist.
   * @throws {Error} - Will throw if the given attributes are not an object.
   */
  addNode(node, attributes) {
    const nodeData = addNode(this, node, attributes);
    return nodeData.key;
  }
  /**
   * Method used to merge a node into the graph.
   *
   * @param  {any}    node         - The node.
   * @param  {object} [attributes] - Optional attributes.
   * @return {any}                 - The node.
   */
  mergeNode(node, attributes) {
    if (attributes && !isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(
        `Graph.mergeNode: invalid attributes. Expecting an object but got "${attributes}"`
      );
    node = "" + node;
    attributes = attributes || {};
    let data = this._nodes.get(node);
    if (data) {
      if (attributes) {
        assign(data.attributes, attributes);
        this.emit("nodeAttributesUpdated", {
          type: "merge",
          key: node,
          attributes: data.attributes,
          data: attributes
        });
      }
      return [node, false];
    }
    data = new this.NodeDataClass(node, attributes);
    this._nodes.set(node, data);
    this.emit("nodeAdded", {
      key: node,
      attributes
    });
    return [node, true];
  }
  /**
   * Method used to add a node if it does not exist in the graph or else to
   * update its attributes using a function.
   *
   * @param  {any}      node      - The node.
   * @param  {function} [updater] - Optional updater function.
   * @return {any}                - The node.
   */
  updateNode(node, updater) {
    if (updater && typeof updater !== "function")
      throw new InvalidArgumentsGraphError(
        `Graph.updateNode: invalid updater function. Expecting a function but got "${updater}"`
      );
    node = "" + node;
    let data = this._nodes.get(node);
    if (data) {
      if (updater) {
        const oldAttributes = data.attributes;
        data.attributes = updater(oldAttributes);
        this.emit("nodeAttributesUpdated", {
          type: "replace",
          key: node,
          attributes: data.attributes
        });
      }
      return [node, false];
    }
    const attributes = updater ? updater({}) : {};
    data = new this.NodeDataClass(node, attributes);
    this._nodes.set(node, data);
    this.emit("nodeAdded", {
      key: node,
      attributes
    });
    return [node, true];
  }
  /**
   * Method used to drop a single node & all its attached edges from the graph.
   *
   * @param  {any}    node - The node.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the node doesn't exist.
   */
  dropNode(node) {
    node = "" + node;
    const nodeData = this._nodes.get(node);
    if (!nodeData)
      throw new NotFoundGraphError(
        `Graph.dropNode: could not find the "${node}" node in the graph.`
      );
    let edgeData;
    if (this.type !== "undirected") {
      for (const neighbor in nodeData.out) {
        edgeData = nodeData.out[neighbor];
        do {
          dropEdgeFromData(this, edgeData);
          edgeData = edgeData.next;
        } while (edgeData);
      }
      for (const neighbor in nodeData.in) {
        edgeData = nodeData.in[neighbor];
        do {
          dropEdgeFromData(this, edgeData);
          edgeData = edgeData.next;
        } while (edgeData);
      }
    }
    if (this.type !== "directed") {
      for (const neighbor in nodeData.undirected) {
        edgeData = nodeData.undirected[neighbor];
        do {
          dropEdgeFromData(this, edgeData);
          edgeData = edgeData.next;
        } while (edgeData);
      }
    }
    this._nodes.delete(node);
    this.emit("nodeDropped", {
      key: node,
      attributes: nodeData.attributes
    });
  }
  /**
   * Method used to drop a single edge from the graph.
   *
   * Arity 1:
   * @param  {any}    edge - The edge.
   *
   * Arity 2:
   * @param  {any}    source - Source node.
   * @param  {any}    target - Target node.
   *
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the edge doesn't exist.
   */
  dropEdge(edge) {
    let edgeData;
    if (arguments.length > 1) {
      const source = "" + arguments[0];
      const target = "" + arguments[1];
      edgeData = getMatchingEdge(this, source, target, this.type);
      if (!edgeData)
        throw new NotFoundGraphError(
          `Graph.dropEdge: could not find the "${source}" -> "${target}" edge in the graph.`
        );
    } else {
      edge = "" + edge;
      edgeData = this._edges.get(edge);
      if (!edgeData)
        throw new NotFoundGraphError(
          `Graph.dropEdge: could not find the "${edge}" edge in the graph.`
        );
    }
    dropEdgeFromData(this, edgeData);
    return this;
  }
  /**
   * Method used to drop a single directed edge from the graph.
   *
   * @param  {any}    source - Source node.
   * @param  {any}    target - Target node.
   *
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the edge doesn't exist.
   */
  dropDirectedEdge(source, target) {
    if (arguments.length < 2)
      throw new UsageGraphError(
        "Graph.dropDirectedEdge: it does not make sense to try and drop a directed edge by key. What if the edge with this key is undirected? Use #.dropEdge for this purpose instead."
      );
    if (this.multi)
      throw new UsageGraphError(
        "Graph.dropDirectedEdge: cannot use a {source,target} combo when dropping an edge in a MultiGraph since we cannot infer the one you want to delete as there could be multiple ones."
      );
    source = "" + source;
    target = "" + target;
    const edgeData = getMatchingEdge(this, source, target, "directed");
    if (!edgeData)
      throw new NotFoundGraphError(
        `Graph.dropDirectedEdge: could not find a "${source}" -> "${target}" edge in the graph.`
      );
    dropEdgeFromData(this, edgeData);
    return this;
  }
  /**
   * Method used to drop a single undirected edge from the graph.
   *
   * @param  {any}    source - Source node.
   * @param  {any}    target - Target node.
   *
   * @return {Graph}
   *
   * @throws {Error} - Will throw if the edge doesn't exist.
   */
  dropUndirectedEdge(source, target) {
    if (arguments.length < 2)
      throw new UsageGraphError(
        "Graph.dropUndirectedEdge: it does not make sense to drop a directed edge by key. What if the edge with this key is undirected? Use #.dropEdge for this purpose instead."
      );
    if (this.multi)
      throw new UsageGraphError(
        "Graph.dropUndirectedEdge: cannot use a {source,target} combo when dropping an edge in a MultiGraph since we cannot infer the one you want to delete as there could be multiple ones."
      );
    const edgeData = getMatchingEdge(this, source, target, "undirected");
    if (!edgeData)
      throw new NotFoundGraphError(
        `Graph.dropUndirectedEdge: could not find a "${source}" -> "${target}" edge in the graph.`
      );
    dropEdgeFromData(this, edgeData);
    return this;
  }
  /**
   * Method used to remove every edge & every node from the graph.
   *
   * @return {Graph}
   */
  clear() {
    this._edges.clear();
    this._nodes.clear();
    this._resetInstanceCounters();
    this.emit("cleared");
  }
  /**
   * Method used to remove every edge from the graph.
   *
   * @return {Graph}
   */
  clearEdges() {
    const iterator = this._nodes.values();
    let step;
    while (step = iterator.next(), step.done !== true) {
      step.value.clear();
    }
    this._edges.clear();
    this._resetInstanceCounters();
    this.emit("edgesCleared");
  }
  /**---------------------------------------------------------------------------
   * Attributes-related methods
   **---------------------------------------------------------------------------
   */
  /**
   * Method returning the desired graph's attribute.
   *
   * @param  {string} name - Name of the attribute.
   * @return {any}
   */
  getAttribute(name) {
    return this._attributes[name];
  }
  /**
   * Method returning the graph's attributes.
   *
   * @return {object}
   */
  getAttributes() {
    return this._attributes;
  }
  /**
   * Method returning whether the graph has the desired attribute.
   *
   * @param  {string}  name - Name of the attribute.
   * @return {boolean}
   */
  hasAttribute(name) {
    return this._attributes.hasOwnProperty(name);
  }
  /**
   * Method setting a value for the desired graph's attribute.
   *
   * @param  {string}  name  - Name of the attribute.
   * @param  {any}     value - Value for the attribute.
   * @return {Graph}
   */
  setAttribute(name, value) {
    this._attributes[name] = value;
    this.emit("attributesUpdated", {
      type: "set",
      attributes: this._attributes,
      name
    });
    return this;
  }
  /**
   * Method using a function to update the desired graph's attribute's value.
   *
   * @param  {string}   name    - Name of the attribute.
   * @param  {function} updater - Function use to update the attribute's value.
   * @return {Graph}
   */
  updateAttribute(name, updater) {
    if (typeof updater !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.updateAttribute: updater should be a function."
      );
    const value = this._attributes[name];
    this._attributes[name] = updater(value);
    this.emit("attributesUpdated", {
      type: "set",
      attributes: this._attributes,
      name
    });
    return this;
  }
  /**
   * Method removing the desired graph's attribute.
   *
   * @param  {string} name  - Name of the attribute.
   * @return {Graph}
   */
  removeAttribute(name) {
    delete this._attributes[name];
    this.emit("attributesUpdated", {
      type: "remove",
      attributes: this._attributes,
      name
    });
    return this;
  }
  /**
   * Method replacing the graph's attributes.
   *
   * @param  {object} attributes - New attributes.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if given attributes are not a plain object.
   */
  replaceAttributes(attributes) {
    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(
        "Graph.replaceAttributes: provided attributes are not a plain object."
      );
    this._attributes = attributes;
    this.emit("attributesUpdated", {
      type: "replace",
      attributes: this._attributes
    });
    return this;
  }
  /**
   * Method merging the graph's attributes.
   *
   * @param  {object} attributes - Attributes to merge.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if given attributes are not a plain object.
   */
  mergeAttributes(attributes) {
    if (!isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(
        "Graph.mergeAttributes: provided attributes are not a plain object."
      );
    assign(this._attributes, attributes);
    this.emit("attributesUpdated", {
      type: "merge",
      attributes: this._attributes,
      data: attributes
    });
    return this;
  }
  /**
   * Method updating the graph's attributes.
   *
   * @param  {function} updater - Function used to update the attributes.
   * @return {Graph}
   *
   * @throws {Error} - Will throw if given updater is not a function.
   */
  updateAttributes(updater) {
    if (typeof updater !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.updateAttributes: provided updater is not a function."
      );
    this._attributes = updater(this._attributes);
    this.emit("attributesUpdated", {
      type: "update",
      attributes: this._attributes
    });
    return this;
  }
  /**
   * Method used to update each node's attributes using the given function.
   *
   * @param {function}  updater - Updater function to use.
   * @param {object}    [hints] - Optional hints.
   */
  updateEachNodeAttributes(updater, hints) {
    if (typeof updater !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.updateEachNodeAttributes: expecting an updater function."
      );
    if (hints && !validateHints(hints))
      throw new InvalidArgumentsGraphError(
        "Graph.updateEachNodeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}"
      );
    const iterator = this._nodes.values();
    let step, nodeData;
    while (step = iterator.next(), step.done !== true) {
      nodeData = step.value;
      nodeData.attributes = updater(nodeData.key, nodeData.attributes);
    }
    this.emit("eachNodeAttributesUpdated", {
      hints: hints ? hints : null
    });
  }
  /**
   * Method used to update each edge's attributes using the given function.
   *
   * @param {function}  updater - Updater function to use.
   * @param {object}    [hints] - Optional hints.
   */
  updateEachEdgeAttributes(updater, hints) {
    if (typeof updater !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.updateEachEdgeAttributes: expecting an updater function."
      );
    if (hints && !validateHints(hints))
      throw new InvalidArgumentsGraphError(
        "Graph.updateEachEdgeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}"
      );
    const iterator = this._edges.values();
    let step, edgeData, sourceData, targetData;
    while (step = iterator.next(), step.done !== true) {
      edgeData = step.value;
      sourceData = edgeData.source;
      targetData = edgeData.target;
      edgeData.attributes = updater(
        edgeData.key,
        edgeData.attributes,
        sourceData.key,
        targetData.key,
        sourceData.attributes,
        targetData.attributes,
        edgeData.undirected
      );
    }
    this.emit("eachEdgeAttributesUpdated", {
      hints: hints ? hints : null
    });
  }
  /**---------------------------------------------------------------------------
   * Iteration-related methods
   **---------------------------------------------------------------------------
   */
  /**
   * Method iterating over the graph's adjacency using the given callback.
   *
   * @param  {function}  callback - Callback to use.
   */
  forEachAdjacencyEntry(callback) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.forEachAdjacencyEntry: expecting a callback."
      );
    forEachAdjacency(false, false, false, this, callback);
  }
  forEachAdjacencyEntryWithOrphans(callback) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.forEachAdjacencyEntryWithOrphans: expecting a callback."
      );
    forEachAdjacency(false, false, true, this, callback);
  }
  /**
   * Method iterating over the graph's assymetric adjacency using the given callback.
   *
   * @param  {function}  callback - Callback to use.
   */
  forEachAssymetricAdjacencyEntry(callback) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.forEachAssymetricAdjacencyEntry: expecting a callback."
      );
    forEachAdjacency(false, true, false, this, callback);
  }
  forEachAssymetricAdjacencyEntryWithOrphans(callback) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.forEachAssymetricAdjacencyEntryWithOrphans: expecting a callback."
      );
    forEachAdjacency(false, true, true, this, callback);
  }
  /**
   * Method returning the list of the graph's nodes.
   *
   * @return {array} - The nodes.
   */
  nodes() {
    return Array.from(this._nodes.keys());
  }
  /**
   * Method iterating over the graph's nodes using the given callback.
   *
   * @param  {function}  callback - Callback (key, attributes, index).
   */
  forEachNode(callback) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.forEachNode: expecting a callback."
      );
    const iterator = this._nodes.values();
    let step, nodeData;
    while (step = iterator.next(), step.done !== true) {
      nodeData = step.value;
      callback(nodeData.key, nodeData.attributes);
    }
  }
  /**
   * Method iterating attempting to find a node matching the given predicate
   * function.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  findNode(callback) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.findNode: expecting a callback."
      );
    const iterator = this._nodes.values();
    let step, nodeData;
    while (step = iterator.next(), step.done !== true) {
      nodeData = step.value;
      if (callback(nodeData.key, nodeData.attributes)) return nodeData.key;
    }
    return;
  }
  /**
   * Method mapping nodes.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  mapNodes(callback) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.mapNode: expecting a callback."
      );
    const iterator = this._nodes.values();
    let step, nodeData;
    const result = new Array(this.order);
    let i = 0;
    while (step = iterator.next(), step.done !== true) {
      nodeData = step.value;
      result[i++] = callback(nodeData.key, nodeData.attributes);
    }
    return result;
  }
  /**
   * Method returning whether some node verify the given predicate.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  someNode(callback) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.someNode: expecting a callback."
      );
    const iterator = this._nodes.values();
    let step, nodeData;
    while (step = iterator.next(), step.done !== true) {
      nodeData = step.value;
      if (callback(nodeData.key, nodeData.attributes)) return true;
    }
    return false;
  }
  /**
   * Method returning whether all node verify the given predicate.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  everyNode(callback) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.everyNode: expecting a callback."
      );
    const iterator = this._nodes.values();
    let step, nodeData;
    while (step = iterator.next(), step.done !== true) {
      nodeData = step.value;
      if (!callback(nodeData.key, nodeData.attributes)) return false;
    }
    return true;
  }
  /**
   * Method filtering nodes.
   *
   * @param  {function}  callback - Callback (key, attributes).
   */
  filterNodes(callback) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.filterNodes: expecting a callback."
      );
    const iterator = this._nodes.values();
    let step, nodeData;
    const result = [];
    while (step = iterator.next(), step.done !== true) {
      nodeData = step.value;
      if (callback(nodeData.key, nodeData.attributes))
        result.push(nodeData.key);
    }
    return result;
  }
  /**
   * Method reducing nodes.
   *
   * @param  {function}  callback - Callback (accumulator, key, attributes).
   */
  reduceNodes(callback, initialValue) {
    if (typeof callback !== "function")
      throw new InvalidArgumentsGraphError(
        "Graph.reduceNodes: expecting a callback."
      );
    if (arguments.length < 2)
      throw new InvalidArgumentsGraphError(
        "Graph.reduceNodes: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array."
      );
    let accumulator = initialValue;
    const iterator = this._nodes.values();
    let step, nodeData;
    while (step = iterator.next(), step.done !== true) {
      nodeData = step.value;
      accumulator = callback(accumulator, nodeData.key, nodeData.attributes);
    }
    return accumulator;
  }
  /**
   * Method returning an iterator over the graph's node entries.
   *
   * @return {Iterator}
   */
  nodeEntries() {
    const iterator = this._nodes.values();
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        const step = iterator.next();
        if (step.done) return step;
        const data = step.value;
        return {
          value: { node: data.key, attributes: data.attributes },
          done: false
        };
      }
    };
  }
  /**---------------------------------------------------------------------------
   * Serialization
   **---------------------------------------------------------------------------
   */
  /**
   * Method used to export the whole graph.
   *
   * @return {object} - The serialized graph.
   */
  export() {
    const nodes = new Array(this._nodes.size);
    let i = 0;
    this._nodes.forEach((data, key) => {
      nodes[i++] = serializeNode(key, data);
    });
    const edges = new Array(this._edges.size);
    i = 0;
    this._edges.forEach((data, key) => {
      edges[i++] = serializeEdge(this.type, key, data);
    });
    return {
      options: {
        type: this.type,
        multi: this.multi,
        allowSelfLoops: this.allowSelfLoops
      },
      attributes: this.getAttributes(),
      nodes,
      edges
    };
  }
  /**
   * Method used to import a serialized graph.
   *
   * @param  {object|Graph} data  - The serialized graph.
   * @param  {boolean}      merge - Whether to merge data.
   * @return {Graph}              - Returns itself for chaining.
   */
  import(data, merge = false) {
    if (data instanceof _Graph) {
      data.forEachNode((n, a) => {
        if (merge) this.mergeNode(n, a);
        else this.addNode(n, a);
      });
      data.forEachEdge((e, a, s, t, _sa, _ta, u) => {
        if (merge) {
          if (u) this.mergeUndirectedEdgeWithKey(e, s, t, a);
          else this.mergeDirectedEdgeWithKey(e, s, t, a);
        } else {
          if (u) this.addUndirectedEdgeWithKey(e, s, t, a);
          else this.addDirectedEdgeWithKey(e, s, t, a);
        }
      });
      return this;
    }
    if (!isPlainObject(data))
      throw new InvalidArgumentsGraphError(
        "Graph.import: invalid argument. Expecting a serialized graph or, alternatively, a Graph instance."
      );
    if (data.attributes) {
      if (!isPlainObject(data.attributes))
        throw new InvalidArgumentsGraphError(
          "Graph.import: invalid attributes. Expecting a plain object."
        );
      if (merge) this.mergeAttributes(data.attributes);
      else this.replaceAttributes(data.attributes);
    }
    let i, l, list, node, edge;
    if (data.nodes) {
      list = data.nodes;
      if (!Array.isArray(list))
        throw new InvalidArgumentsGraphError(
          "Graph.import: invalid nodes. Expecting an array."
        );
      for (i = 0, l = list.length; i < l; i++) {
        node = list[i];
        validateSerializedNode(node);
        const { key, attributes } = node;
        if (merge) this.mergeNode(key, attributes);
        else this.addNode(key, attributes);
      }
    }
    if (data.edges) {
      let undirectedByDefault = false;
      if (this.type === "undirected") {
        undirectedByDefault = true;
      }
      list = data.edges;
      if (!Array.isArray(list))
        throw new InvalidArgumentsGraphError(
          "Graph.import: invalid edges. Expecting an array."
        );
      for (i = 0, l = list.length; i < l; i++) {
        edge = list[i];
        validateSerializedEdge(edge);
        const {
          source,
          target,
          attributes,
          undirected = undirectedByDefault
        } = edge;
        let method;
        if ("key" in edge) {
          method = merge ? undirected ? this.mergeUndirectedEdgeWithKey : this.mergeDirectedEdgeWithKey : undirected ? this.addUndirectedEdgeWithKey : this.addDirectedEdgeWithKey;
          method.call(this, edge.key, source, target, attributes);
        } else {
          method = merge ? undirected ? this.mergeUndirectedEdge : this.mergeDirectedEdge : undirected ? this.addUndirectedEdge : this.addDirectedEdge;
          method.call(this, source, target, attributes);
        }
      }
    }
    return this;
  }
  /**---------------------------------------------------------------------------
   * Utils
   **---------------------------------------------------------------------------
   */
  /**
   * Method returning a null copy of the graph, i.e. a graph without nodes
   * & edges but with the exact same options.
   *
   * @param  {object} options - Options to merge with the current ones.
   * @return {Graph}          - The null copy.
   */
  nullCopy(options) {
    const graph = new _Graph(assign({}, this._options, options));
    graph.replaceAttributes(assign({}, this.getAttributes()));
    return graph;
  }
  /**
   * Method returning an empty copy of the graph, i.e. a graph without edges but
   * with the exact same options.
   *
   * @param  {object} options - Options to merge with the current ones.
   * @return {Graph}          - The empty copy.
   */
  emptyCopy(options) {
    const graph = this.nullCopy(options);
    this._nodes.forEach((nodeData, key) => {
      const attributes = assign({}, nodeData.attributes);
      nodeData = new graph.NodeDataClass(key, attributes);
      graph._nodes.set(key, nodeData);
    });
    return graph;
  }
  /**
   * Method returning an exact copy of the graph.
   *
   * @param  {object} options - Upgrade options.
   * @return {Graph}          - The copy.
   */
  copy(options) {
    options = options || {};
    if (typeof options.type === "string" && options.type !== this.type && options.type !== "mixed")
      throw new UsageGraphError(
        `Graph.copy: cannot create an incompatible copy from "${this.type}" type to "${options.type}" because this would mean losing information about the current graph.`
      );
    if (typeof options.multi === "boolean" && options.multi !== this.multi && options.multi !== true)
      throw new UsageGraphError(
        "Graph.copy: cannot create an incompatible copy by downgrading a multi graph to a simple one because this would mean losing information about the current graph."
      );
    if (typeof options.allowSelfLoops === "boolean" && options.allowSelfLoops !== this.allowSelfLoops && options.allowSelfLoops !== true)
      throw new UsageGraphError(
        "Graph.copy: cannot create an incompatible copy from a graph allowing self loops to one that does not because this would mean losing information about the current graph."
      );
    const graph = this.emptyCopy(options);
    const iterator = this._edges.values();
    let step, edgeData;
    while (step = iterator.next(), step.done !== true) {
      edgeData = step.value;
      addEdge(
        graph,
        "copy",
        false,
        edgeData.undirected,
        edgeData.key,
        edgeData.source.key,
        edgeData.target.key,
        assign({}, edgeData.attributes)
      );
    }
    return graph;
  }
  /**---------------------------------------------------------------------------
   * Known methods
   **---------------------------------------------------------------------------
   */
  /**
   * Method used by JavaScript to perform JSON serialization.
   *
   * @return {object} - The serialized graph.
   */
  toJSON() {
    return this.export();
  }
  /**
   * Method returning [object Graph].
   */
  toString() {
    return "[object Graph]";
  }
  /**
   * Method used internally by node's console to display a custom object.
   *
   * @return {object} - Formatted object representation of the graph.
   */
  inspect() {
    const nodes = {};
    this._nodes.forEach((data, key) => {
      nodes[key] = data.attributes;
    });
    const edges = {}, multiIndex = {};
    this._edges.forEach((data, key) => {
      const direction = data.undirected ? "--" : "->";
      let label = "";
      let source = data.source.key;
      let target = data.target.key;
      let tmp;
      if (data.undirected && source > target) {
        tmp = source;
        source = target;
        target = tmp;
      }
      const desc = `(${source})${direction}(${target})`;
      if (!key.startsWith("geid_")) {
        label += `[${key}]: `;
      } else if (this.multi) {
        if (typeof multiIndex[desc] === "undefined") {
          multiIndex[desc] = 0;
        } else {
          multiIndex[desc]++;
        }
        label += `${multiIndex[desc]}. `;
      }
      label += desc;
      edges[label] = data.attributes;
    });
    const dummy = {};
    for (const k in this) {
      if (this.hasOwnProperty(k) && !EMITTER_PROPS.has(k) && typeof this[k] !== "function" && typeof k !== "symbol")
        dummy[k] = this[k];
    }
    dummy.attributes = this._attributes;
    dummy.nodes = nodes;
    dummy.edges = edges;
    privateProperty(dummy, "constructor", this.constructor);
    return dummy;
  }
};
if (typeof Symbol !== "undefined")
  Graph.prototype[Symbol.for("nodejs.util.inspect.custom")] = Graph.prototype.inspect;
EDGE_ADD_METHODS.forEach((method) => {
  ["add", "merge", "update"].forEach((verb) => {
    const name = method.name(verb);
    const fn = verb === "add" ? addEdge : mergeEdge;
    if (method.generateKey) {
      Graph.prototype[name] = function(source, target, attributes) {
        return fn(
          this,
          name,
          true,
          (method.type || this.type) === "undirected",
          null,
          source,
          target,
          attributes,
          verb === "update"
        );
      };
    } else {
      Graph.prototype[name] = function(edge, source, target, attributes) {
        return fn(
          this,
          name,
          false,
          (method.type || this.type) === "undirected",
          edge,
          source,
          target,
          attributes,
          verb === "update"
        );
      };
    }
  });
});
attachNodeAttributesMethods(Graph);
attachEdgeAttributesMethods(Graph);
attachEdgeIterationMethods(Graph);
attachNeighborIterationMethods(Graph);
var DirectedGraph = class extends Graph {
  constructor(options) {
    const finalOptions = assign({ type: "directed" }, options);
    if ("multi" in finalOptions && finalOptions.multi !== false)
      throw new InvalidArgumentsGraphError(
        "DirectedGraph.from: inconsistent indication that the graph should be multi in given options!"
      );
    if (finalOptions.type !== "directed")
      throw new InvalidArgumentsGraphError(
        'DirectedGraph.from: inconsistent "' + finalOptions.type + '" type in given options!'
      );
    super(finalOptions);
  }
};
var UndirectedGraph = class extends Graph {
  constructor(options) {
    const finalOptions = assign({ type: "undirected" }, options);
    if ("multi" in finalOptions && finalOptions.multi !== false)
      throw new InvalidArgumentsGraphError(
        "UndirectedGraph.from: inconsistent indication that the graph should be multi in given options!"
      );
    if (finalOptions.type !== "undirected")
      throw new InvalidArgumentsGraphError(
        'UndirectedGraph.from: inconsistent "' + finalOptions.type + '" type in given options!'
      );
    super(finalOptions);
  }
};
var MultiGraph = class extends Graph {
  constructor(options) {
    const finalOptions = assign({ multi: true }, options);
    if ("multi" in finalOptions && finalOptions.multi !== true)
      throw new InvalidArgumentsGraphError(
        "MultiGraph.from: inconsistent indication that the graph should be simple in given options!"
      );
    super(finalOptions);
  }
};
var MultiDirectedGraph = class extends Graph {
  constructor(options) {
    const finalOptions = assign({ type: "directed", multi: true }, options);
    if ("multi" in finalOptions && finalOptions.multi !== true)
      throw new InvalidArgumentsGraphError(
        "MultiDirectedGraph.from: inconsistent indication that the graph should be simple in given options!"
      );
    if (finalOptions.type !== "directed")
      throw new InvalidArgumentsGraphError(
        'MultiDirectedGraph.from: inconsistent "' + finalOptions.type + '" type in given options!'
      );
    super(finalOptions);
  }
};
var MultiUndirectedGraph = class extends Graph {
  constructor(options) {
    const finalOptions = assign({ type: "undirected", multi: true }, options);
    if ("multi" in finalOptions && finalOptions.multi !== true)
      throw new InvalidArgumentsGraphError(
        "MultiUndirectedGraph.from: inconsistent indication that the graph should be simple in given options!"
      );
    if (finalOptions.type !== "undirected")
      throw new InvalidArgumentsGraphError(
        'MultiUndirectedGraph.from: inconsistent "' + finalOptions.type + '" type in given options!'
      );
    super(finalOptions);
  }
};
function attachStaticFromMethod(Class) {
  Class.from = function(data, options) {
    const finalOptions = assign({}, data.options, options);
    const instance = new Class(finalOptions);
    instance.import(data);
    return instance;
  };
}
attachStaticFromMethod(Graph);
attachStaticFromMethod(DirectedGraph);
attachStaticFromMethod(UndirectedGraph);
attachStaticFromMethod(MultiGraph);
attachStaticFromMethod(MultiDirectedGraph);
attachStaticFromMethod(MultiUndirectedGraph);
Graph.Graph = Graph;
Graph.DirectedGraph = DirectedGraph;
Graph.UndirectedGraph = UndirectedGraph;
Graph.MultiGraph = MultiGraph;
Graph.MultiDirectedGraph = MultiDirectedGraph;
Graph.MultiUndirectedGraph = MultiUndirectedGraph;
Graph.InvalidArgumentsGraphError = InvalidArgumentsGraphError;
Graph.NotFoundGraphError = NotFoundGraphError;
Graph.UsageGraphError = UsageGraphError;

// src/client/index.tsx
var import_sigma = __toESM(require_sigma2(), 1);

// src/client/saved-views.ts
var VIEWS_KEY = "dsh-graphview.views";
function loadViews(storage) {
  try {
    const raw = storage.getItem(VIEWS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSavedView);
  } catch {
    return [];
  }
}
function saveView(storage, name, query) {
  const trimmed = name.trim();
  if (!trimmed) throw new Error("view name required");
  const views = loadViews(storage).filter((v) => v.name !== trimmed);
  views.push({ name: trimmed, query: cloneQuery(query), savedAt: (/* @__PURE__ */ new Date()).toISOString() });
  persist(storage, views);
  return views;
}
function deleteView(storage, name) {
  const views = loadViews(storage).filter((v) => v.name !== name);
  persist(storage, views);
  return views;
}
function persist(storage, views) {
  if (views.length === 0) storage.removeItem(VIEWS_KEY);
  else storage.setItem(VIEWS_KEY, JSON.stringify(views));
}
function isSavedView(v) {
  if (typeof v !== "object" || v === null) return false;
  const rec = v;
  return typeof rec.name === "string" && typeof rec.query === "object" && rec.query !== null;
}
function cloneQuery(q) {
  return {
    kinds: [...q.kinds],
    tags: [...q.tags],
    hiddenLinkTypes: [...q.hiddenLinkTypes],
    implicitEdges: q.implicitEdges,
    hideTombstoned: q.hideTombstoned,
    focus: q.focus
  };
}

// src/client/svg-export.ts
function circularLayout(ids, width, height, margin) {
  const pts = /* @__PURE__ */ new Map();
  const cx = width / 2;
  const cy = height / 2;
  const rx = width / 2 - margin;
  const ry = height / 2 - margin;
  if (ids.length === 1) {
    pts.set(ids[0], { x: cx, y: cy });
    return pts;
  }
  ids.forEach((id, i) => {
    const angle = 2 * Math.PI * i / ids.length - Math.PI / 2;
    pts.set(id, { x: cx + rx * Math.cos(angle), y: cy + ry * Math.sin(angle) });
  });
  return pts;
}
function esc(s) {
  const AMP = String.fromCharCode(38);
  return s.replace(/[&<>"]/g, (ch) => AMP + { "&": "amp;", "<": "lt;", ">": "gt;", '"': "quot;" }[ch]);
}
function toSVG(nodes, edges, opts = {}) {
  const width = opts.width ?? 1200;
  const height = opts.height ?? 800;
  const margin = opts.margin ?? 60;
  const bg = opts.background ?? "#0f172a";
  const labels = opts.showLabels ?? true;
  const fontSize = opts.fontSize ?? 11;
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const parts = [];
  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`);
  parts.push(`<rect width="100%" height="100%" fill="${bg}"/>`);
  for (const e of edges) {
    const a = byId.get(e.source);
    const b = byId.get(e.target);
    if (!a || !b) throw new Error(`edge references unknown node: ${e.source} -> ${e.target}`);
    const dash = e.dashed ? ' stroke-dasharray="4 3"' : "";
    parts.push(`<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="${e.color ?? "#475569"}" stroke-width="1"${dash}/>`);
  }
  for (const n of nodes) {
    parts.push(`<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${n.size.toFixed(1)}" fill="${n.color}"/>`);
    if (labels) {
      parts.push(`<text x="${(n.x + n.size + 4).toFixed(1)}" y="${(n.y + fontSize / 3).toFixed(1)}" fill="#e2e8f0" font-family="sans-serif" font-size="${fontSize}">${esc(n.label)}</text>`);
    }
  }
  parts.push("</svg>");
  return parts.join("\n");
}

// src/client/index.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var inject = ["slots", "locale"];
var KIND_COLOR = {
  preference: "#eab308",
  decision: "#3b82f6",
  constraint: "#ef4444",
  fact: "#22c55e",
  reference: "#a8a29e",
  workflow: "#8b5cf6",
  warning: "#f97316",
  error_fix: "#dc2626"
};
function colorOf(kind) {
  return KIND_COLOR[kind] ?? "#94a3b8";
}
var SNAPSHOT_BASE = "/noema-graphview/snapshot";
var DEFAULT_VIEW = {
  kinds: [],
  tags: [],
  hiddenLinkTypes: [],
  implicitEdges: false,
  hideTombstoned: true,
  focus: null
};
function fetchSnapshot(view) {
  const params = new URLSearchParams();
  if (view.kinds.length) params.set("kinds", view.kinds.join(","));
  if (view.tags.length) params.set("tags", view.tags.join(","));
  if (view.hiddenLinkTypes.length) params.set("hiddenLinkTypes", view.hiddenLinkTypes.join(","));
  if (view.implicitEdges) params.set("implicitEdges", "true");
  if (view.hideTombstoned === false) params.set("hideTombstoned", "false");
  if (view.focus) params.set("focus", view.focus);
  const qs = params.toString();
  return fetch(SNAPSHOT_BASE + (qs ? "?" + qs : "")).then((r) => r.ok ? r.json() : Promise.reject(new Error("snapshot " + r.status)));
}
var SVG_W = 1200;
var SVG_H = 800;
var SVG_MARGIN = 60;
function toSigmaGraph(snap) {
  const g = new Graph({ multi: true });
  const pts = circularLayout(snap.nodes.map((n) => n.id), SVG_W, SVG_H, SVG_MARGIN);
  for (const n of snap.nodes) {
    const p = pts.get(n.id) ?? { x: SVG_W / 2, y: SVG_H / 2 };
    g.addNode(n.id, {
      ...n,
      x: p.x,
      y: p.y,
      color: colorOf(n.kind),
      label: n.title ?? n.kind,
      size: 4 + n.importance * 8
    });
  }
  for (const l of snap.links) {
    g.addEdge(l.source, l.target, { ...l, type: l.type });
  }
  return g;
}
function download(filename, blob) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
function MemoryGraphPanel() {
  const [view, setView] = (0, import_react.useState)(DEFAULT_VIEW);
  const [snap, setSnap] = (0, import_react.useState)(null);
  const [loading, setLoading] = (0, import_react.useState)(false);
  const [err, setErr] = (0, import_react.useState)(null);
  const [tagInput, setTagInput] = (0, import_react.useState)("");
  const [views, setViews] = (0, import_react.useState)(() => loadViews(window.localStorage));
  const [viewName, setViewName] = (0, import_react.useState)("");
  const containerRef = (0, import_react.useRef)(null);
  const sigmaRef = (0, import_react.useRef)(null);
  const reload = () => {
    setLoading(true);
    setErr(null);
    fetchSnapshot(view).then((s) => {
      setSnap(s);
      setLoading(false);
    }).catch((e) => {
      setErr(String(e?.message ?? e));
      setLoading(false);
    });
  };
  (0, import_react.useEffect)(() => {
    reload();
  }, [view]);
  (0, import_react.useEffect)(() => {
    if (!snap || !containerRef.current) return;
    sigmaRef.current?.kill?.();
    const g = toSigmaGraph(snap);
    const sigma = new import_sigma.Sigma(g, containerRef.current, {
      defaultNodeColor: "#94a3b8",
      defaultEdgeColor: "#475569",
      labelThreshold: 10,
      renderEdgeLabels: false,
      defaultNodeSize: 6
    });
    sigma.on("clickNode", ({ node }) => {
      setView((v) => ({ ...v, focus: v.focus === node ? null : node }));
    });
    sigmaRef.current = sigma;
    return () => sigma.kill?.();
  }, [snap]);
  const toggleImplicit = () => setView((v) => ({ ...v, implicitEdges: !v.implicitEdges }));
  const toggleTombstoned = () => setView((v) => ({ ...v, hideTombstoned: !v.hideTombstoned }));
  const exportJSON = () => {
    if (!snap) return;
    download("memory-graph.json", new Blob([JSON.stringify(snap, null, 2)], { type: "application/json" }));
  };
  const exportSVG = () => {
    if (!snap) return;
    const pts = circularLayout(snap.nodes.map((n) => n.id), SVG_W, SVG_H, SVG_MARGIN);
    const nodes = snap.nodes.map((n) => {
      const p = pts.get(n.id) ?? { x: SVG_W / 2, y: SVG_H / 2 };
      return { id: n.id, x: p.x, y: p.y, label: n.title ?? n.kind, color: colorOf(n.kind), size: 4 + n.importance * 8 };
    });
    try {
      const svg = toSVG(nodes, snap.links.map((l) => ({
        source: l.source,
        target: l.target,
        color: l.implicit ? "#334155" : "#64748b",
        dashed: !!l.implicit
      })), { width: SVG_W, height: SVG_H, background: "#0f172a" });
      download("memory-graph.svg", new Blob([svg], { type: "image/svg+xml" }));
    } catch (e) {
      setErr(String(e?.message ?? e));
    }
  };
  const applyTagInput = () => {
    const tags = tagInput.split(",").map((t) => t.trim()).filter(Boolean);
    setView((v) => ({ ...v, tags }));
  };
  const doSaveView = () => {
    try {
      setViews(saveView(window.localStorage, viewName, view));
      setViewName("");
    } catch (e) {
      setErr(String(e?.message ?? e));
    }
  };
  const legend = (0, import_react.useMemo)(() => Object.entries(KIND_COLOR), []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { style: { padding: 12 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginBottom: 8, fontSize: 13, color: "#94a3b8" }, children: [
      (snap?.capturedAt ? "Captured " + snap.capturedAt : "") + (snap ? " \xB7 " + snap.nodes.length + " nodes \xB7 " + snap.links.length + " edges" : ""),
      view.focus ? " \xB7 focus: " + view.focus : ""
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap", alignItems: "center" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: btnStyle, onClick: reload, disabled: loading, children: "Refresh" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { style: { ...btnStyle, background: view.implicitEdges ? "#3b82f6" : "#334155" }, onClick: toggleImplicit, children: [
        "Implicit ",
        view.implicitEdges ? "on" : "off"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { style: btnStyle, onClick: toggleTombstoned, children: [
        "Tombstoned ",
        view.hideTombstoned ? "hidden" : "shown"
      ] }),
      view.focus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: btnStyle, onClick: () => setView((v) => ({ ...v, focus: null })), children: "Clear focus" }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "input",
        {
          style: inputStyle,
          placeholder: "tags: comma,separated",
          value: tagInput,
          onChange: (e) => setTagInput(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") applyTagInput();
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: btnStyle, onClick: applyTagInput, children: "Filter tags" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: btnStyle, onClick: exportJSON, disabled: !snap, children: "Export JSON" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: btnStyle, onClick: exportSVG, disabled: !snap, children: "Export SVG" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap", alignItems: "center" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "input",
        {
          style: inputStyle,
          placeholder: "save current view as\u2026",
          value: viewName,
          onChange: (e) => setViewName(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") doSaveView();
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: btnStyle, onClick: doSaveView, disabled: !viewName.trim(), children: "Save view" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "select",
        {
          style: inputStyle,
          value: "",
          onChange: (e) => {
            const v = views.find((s) => s.name === e.target.value);
            if (v) setView(cloneQuery(v.query));
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "apply saved view\u2026" }),
            views.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: v.name, children: v.name }, v.name))
          ]
        }
      ),
      views.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { style: inputStyle, value: "", onChange: (e) => {
        if (e.target.value) setViews(deleteView(window.localStorage, e.target.value));
      }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "delete saved view\u2026" }),
        views.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: v.name, children: v.name }, v.name))
      ] }) : null
    ] }),
    err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { style: { color: "#ef4444", fontSize: 12 }, children: err }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: containerRef, style: { width: "100%", height: "640px", background: "#0f172a", borderRadius: 6 } }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap", fontSize: 12, color: "#94a3b8" }, children: [
      legend.map(([kind, color]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { display: "inline-flex", alignItems: "center", gap: 4 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: 10, height: 10, borderRadius: 5, background: color, display: "inline-block" } }),
        kind
      ] }, kind)),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { display: "inline-flex", alignItems: "center", gap: 4 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: 18, borderTop: "2px dashed #334155", display: "inline-block" } }),
        "implicit (shared entity)"
      ] })
    ] })
  ] });
}
var btnStyle = { background: "#334155", color: "#e2e8f0", border: "1px solid #475569", borderRadius: 4, padding: "4px 10px", cursor: "pointer", fontSize: 12 };
var inputStyle = { background: "#1e293b", color: "#e2e8f0", border: "1px solid #475569", borderRadius: 4, padding: "4px 8px", fontSize: 12 };
function apply(ctx) {
  const locale = ctx.locale;
  const label = () => locale?.t ? locale.t("graphTitle") : "Memory Graph";
  ctx.slots.inject("settings.section", () => ctx.slots.register(
    { name: "settings.section", id: "memory-graph", order: 100, label },
    () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryGraphPanel, {})
  ));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  apply,
  fetchSnapshot,
  inject
});
//# sourceMappingURL=index.cjs.map

return module.exports; } });
