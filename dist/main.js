/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Built-in value references. */\nvar Symbol = root.Symbol;\n\nmodule.exports = Symbol;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_Symbol.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayPush.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayPush.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Appends the elements of `values` to `array`.\n *\n * @private\n * @param {Array} array The array to modify.\n * @param {Array} values The values to append.\n * @returns {Array} Returns `array`.\n */\nfunction arrayPush(array, values) {\n  var index = -1,\n      length = values.length,\n      offset = array.length;\n\n  while (++index < length) {\n    array[offset + index] = values[index];\n  }\n  return array;\n}\n\nmodule.exports = arrayPush;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_arrayPush.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseFlatten.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseFlatten.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayPush = __webpack_require__(/*! ./_arrayPush */ \"./node_modules/lodash/_arrayPush.js\"),\n    isFlattenable = __webpack_require__(/*! ./_isFlattenable */ \"./node_modules/lodash/_isFlattenable.js\");\n\n/**\n * The base implementation of `_.flatten` with support for restricting flattening.\n *\n * @private\n * @param {Array} array The array to flatten.\n * @param {number} depth The maximum recursion depth.\n * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.\n * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.\n * @param {Array} [result=[]] The initial result value.\n * @returns {Array} Returns the new flattened array.\n */\nfunction baseFlatten(array, depth, predicate, isStrict, result) {\n  var index = -1,\n      length = array.length;\n\n  predicate || (predicate = isFlattenable);\n  result || (result = []);\n\n  while (++index < length) {\n    var value = array[index];\n    if (depth > 0 && predicate(value)) {\n      if (depth > 1) {\n        // Recursively flatten arrays (susceptible to call stack limits).\n        baseFlatten(value, depth - 1, predicate, isStrict, result);\n      } else {\n        arrayPush(result, value);\n      }\n    } else if (!isStrict) {\n      result[result.length] = value;\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseFlatten;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseFlatten.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    getRawTag = __webpack_require__(/*! ./_getRawTag */ \"./node_modules/lodash/_getRawTag.js\"),\n    objectToString = __webpack_require__(/*! ./_objectToString */ \"./node_modules/lodash/_objectToString.js\");\n\n/** `Object#toString` result references. */\nvar nullTag = '[object Null]',\n    undefinedTag = '[object Undefined]';\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * The base implementation of `getTag` without fallbacks for buggy environments.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nfunction baseGetTag(value) {\n  if (value == null) {\n    return value === undefined ? undefinedTag : nullTag;\n  }\n  return (symToStringTag && symToStringTag in Object(value))\n    ? getRawTag(value)\n    : objectToString(value);\n}\n\nmodule.exports = baseGetTag;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseGetTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]';\n\n/**\n * The base implementation of `_.isArguments`.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an `arguments` object,\n */\nfunction baseIsArguments(value) {\n  return isObjectLike(value) && baseGetTag(value) == argsTag;\n}\n\nmodule.exports = baseIsArguments;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseIsArguments.js?");

/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */\nvar freeGlobal = typeof global == 'object' && global && global.Object === Object && global;\n\nmodule.exports = freeGlobal;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/lodash/_freeGlobal.js?");

/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the raw `toStringTag`.\n */\nfunction getRawTag(value) {\n  var isOwn = hasOwnProperty.call(value, symToStringTag),\n      tag = value[symToStringTag];\n\n  try {\n    value[symToStringTag] = undefined;\n    var unmasked = true;\n  } catch (e) {}\n\n  var result = nativeObjectToString.call(value);\n  if (unmasked) {\n    if (isOwn) {\n      value[symToStringTag] = tag;\n    } else {\n      delete value[symToStringTag];\n    }\n  }\n  return result;\n}\n\nmodule.exports = getRawTag;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_getRawTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_isFlattenable.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_isFlattenable.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    isArguments = __webpack_require__(/*! ./isArguments */ \"./node_modules/lodash/isArguments.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\");\n\n/** Built-in value references. */\nvar spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;\n\n/**\n * Checks if `value` is a flattenable `arguments` object or array.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.\n */\nfunction isFlattenable(value) {\n  return isArray(value) || isArguments(value) ||\n    !!(spreadableSymbol && value && value[spreadableSymbol]);\n}\n\nmodule.exports = isFlattenable;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_isFlattenable.js?");

/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/**\n * Converts `value` to a string using `Object.prototype.toString`.\n *\n * @private\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n */\nfunction objectToString(value) {\n  return nativeObjectToString.call(value);\n}\n\nmodule.exports = objectToString;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_objectToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ \"./node_modules/lodash/_freeGlobal.js\");\n\n/** Detect free variable `self`. */\nvar freeSelf = typeof self == 'object' && self && self.Object === Object && self;\n\n/** Used as a reference to the global object. */\nvar root = freeGlobal || freeSelf || Function('return this')();\n\nmodule.exports = root;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_root.js?");

/***/ }),

/***/ "./node_modules/lodash/flatten.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/flatten.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseFlatten = __webpack_require__(/*! ./_baseFlatten */ \"./node_modules/lodash/_baseFlatten.js\");\n\n/**\n * Flattens `array` a single level deep.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Array\n * @param {Array} array The array to flatten.\n * @returns {Array} Returns the new flattened array.\n * @example\n *\n * _.flatten([1, [2, [3, [4]], 5]]);\n * // => [1, 2, [3, [4]], 5]\n */\nfunction flatten(array) {\n  var length = array == null ? 0 : array.length;\n  return length ? baseFlatten(array, 1) : [];\n}\n\nmodule.exports = flatten;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/flatten.js?");

/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ \"./node_modules/lodash/_baseIsArguments.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Built-in value references. */\nvar propertyIsEnumerable = objectProto.propertyIsEnumerable;\n\n/**\n * Checks if `value` is likely an `arguments` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an `arguments` object,\n *  else `false`.\n * @example\n *\n * _.isArguments(function() { return arguments; }());\n * // => true\n *\n * _.isArguments([1, 2, 3]);\n * // => false\n */\nvar isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {\n  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&\n    !propertyIsEnumerable.call(value, 'callee');\n};\n\nmodule.exports = isArguments;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isArguments.js?");

/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is classified as an `Array` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an array, else `false`.\n * @example\n *\n * _.isArray([1, 2, 3]);\n * // => true\n *\n * _.isArray(document.body.children);\n * // => false\n *\n * _.isArray('abc');\n * // => false\n *\n * _.isArray(_.noop);\n * // => false\n */\nvar isArray = Array.isArray;\n\nmodule.exports = isArray;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isArray.js?");

/***/ }),

/***/ "./node_modules/lodash/isNumber.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isNumber.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar numberTag = '[object Number]';\n\n/**\n * Checks if `value` is classified as a `Number` primitive or object.\n *\n * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are\n * classified as numbers, use the `_.isFinite` method.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a number, else `false`.\n * @example\n *\n * _.isNumber(3);\n * // => true\n *\n * _.isNumber(Number.MIN_VALUE);\n * // => true\n *\n * _.isNumber(Infinity);\n * // => true\n *\n * _.isNumber('3');\n * // => false\n */\nfunction isNumber(value) {\n  return typeof value == 'number' ||\n    (isObjectLike(value) && baseGetTag(value) == numberTag);\n}\n\nmodule.exports = isNumber;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isNumber.js?");

/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is the\n * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)\n * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an object, else `false`.\n * @example\n *\n * _.isObject({});\n * // => true\n *\n * _.isObject([1, 2, 3]);\n * // => true\n *\n * _.isObject(_.noop);\n * // => true\n *\n * _.isObject(null);\n * // => false\n */\nfunction isObject(value) {\n  var type = typeof value;\n  return value != null && (type == 'object' || type == 'function');\n}\n\nmodule.exports = isObject;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isObject.js?");

/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is object-like. A value is object-like if it's not `null`\n * and has a `typeof` result of \"object\".\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is object-like, else `false`.\n * @example\n *\n * _.isObjectLike({});\n * // => true\n *\n * _.isObjectLike([1, 2, 3]);\n * // => true\n *\n * _.isObjectLike(_.noop);\n * // => false\n *\n * _.isObjectLike(null);\n * // => false\n */\nfunction isObjectLike(value) {\n  return value != null && typeof value == 'object';\n}\n\nmodule.exports = isObjectLike;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isObjectLike.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/arrow/ends.js":
/*!***************************!*\
  !*** ./src/arrow/ends.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../consts */ \"./src/consts.js\");\n\n\nconst endXY = point => {\n  const rect = point.node.getBoundingClientRect();\n\n  switch (point.direction) {\n    case _consts__WEBPACK_IMPORTED_MODULE_0__[\"DIRECTION\"].TOP:\n      return {\n        x: rect.x + rect.width / 2,\n        y: rect.y\n      };\n\n    default:\n      throw new Error('unexpected type');\n  }\n};\n\nconst ends = point => ({ ...point,\n  ...endXY(point)\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ends);\n\n//# sourceURL=webpack:///./src/arrow/ends.js?");

/***/ }),

/***/ "./src/arrow/head.js":
/*!***************************!*\
  !*** ./src/arrow/head.js ***!
  \***************************/
/*! exports provided: headBezierAngle, headBezierXY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"headBezierAngle\", function() { return headBezierAngle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"headBezierXY\", function() { return headBezierXY; });\n/* eslint-disable */\nconst PRECISION = 1000.0;\n\nconst round = value => Math.round(value * PRECISION) / PRECISION;\n\nconst headBezierAngle = (t, points) => {\n  const dx = (1 - t) ** 2 * (points[1].x - points[0].x) + 2 * t * (1 - t) * (points[2].x - points[1].x) + t * t * (points[3].x - points[2].x);\n  const dy = (1 - t) ** 2 * (points[1].y - points[0].y) + 2 * t * (1 - t) * (points[2].y - points[1].y) + t * t * (points[3].y - points[2].y);\n  const radius = round(-Math.atan2(dx, dy) + 0.5 * Math.PI);\n  const degree = round(radius * (180 / Math.PI));\n  return {\n    degree,\n    radius\n  };\n};\nconst headBezierXY = (t, points) => ({\n  x: (1 - t) ** 3 * points[0].x + 3 * t * (1 - t) ** 2 * points[1].x + 3 * t * t * (1 - t) * points[2].x + t * t * t * points[3].x,\n  y: (1 - t) ** 3 * points[0].y + 3 * t * (1 - t) ** 2 * points[1].y + 3 * t * t * (1 - t) * points[2].y + t * t * t * points[3].y\n});\n\n//# sourceURL=webpack:///./src/arrow/head.js?");

/***/ }),

/***/ "./src/arrow/observer.js":
/*!*******************************!*\
  !*** ./src/arrow/observer.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst TO_COMPARE = ['x', 'y', 'width', 'height'];\n\nconst comparePositions = (prev, node) => {\n  const rect = node.getBoundingClientRect();\n  return {\n    equal: !TO_COMPARE.some(prop => prev[prop] !== rect[prop]),\n    rect\n  };\n};\n\nconst nextPositions = ({\n  prevs,\n  from,\n  to\n}) => {\n  const current = {};\n  current.from = comparePositions(prevs.from, from.node);\n  current.to = comparePositions(prevs.to, to.node);\n  if (current.from.equal && current.to.equal) return null;\n  return {\n    from: current.from.rect,\n    to: current.to.rect\n  };\n};\n\nconst observer = (from, to) => {\n  const prevs = {\n    from: {},\n    to: {}\n  };\n  let callback = null;\n  const timer = setInterval(() => {\n    if (!document.body.contains(from.node.parentNode) || !document.body.contains(to.node.parentNode)) {\n      clearInterval(timer);\n      return;\n    }\n\n    const next = nextPositions({\n      prevs,\n      from,\n      to\n    });\n    if (!next) return;\n    prevs.from = next.from;\n    prevs.to = next.to;\n    if (callback) callback();\n  }, 150);\n\n  const observe = handler => {\n    callback = handler;\n  };\n\n  return {\n    observe,\n    timer\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (observer);\n\n//# sourceURL=webpack:///./src/arrow/observer.js?");

/***/ }),

/***/ "./src/arrow/path.js":
/*!***************************!*\
  !*** ./src/arrow/path.js ***!
  \***************************/
/*! exports provided: pointSubstract, pointAbsolute, pathListSVG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pointSubstract\", function() { return pointSubstract; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pointAbsolute\", function() { return pointAbsolute; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pathListSVG\", function() { return pathListSVG; });\n/* harmony import */ var lodash_flatten__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/flatten */ \"./node_modules/lodash/flatten.js\");\n/* harmony import */ var lodash_flatten__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_flatten__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../consts */ \"./src/consts.js\");\n/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./point */ \"./src/arrow/point.js\");\n/* harmony import */ var _head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./head */ \"./src/arrow/head.js\");\n\n\n\n\nconst pointSubstract = (point, subtrahend) => ({ ...point,\n  x: point.x - subtrahend,\n  y: point.y - subtrahend\n});\nconst pointAbsolute = (point, offset) => pointSubstract({ ...point,\n  x: point.x - offset.x,\n  y: point.y - offset.y\n}, -_consts__WEBPACK_IMPORTED_MODULE_1__[\"ARROW_HEAD_SIZE\"] * 2);\n\nconst startPosition = (from, to) => ({\n  x: Math.min(from.x, to.x),\n  y: Math.min(from.y, to.y)\n});\n\nconst pathListSVG = points => {\n  const list = ['M'];\n  list.push(Object(_point__WEBPACK_IMPORTED_MODULE_2__[\"pointToArray\"])(points[0]));\n  list.push('C');\n  list.push(Object(_point__WEBPACK_IMPORTED_MODULE_2__[\"pointToArray\"])(points[1]));\n  list.push(',');\n  list.push(Object(_point__WEBPACK_IMPORTED_MODULE_2__[\"pointToArray\"])(points[2]));\n  list.push(',');\n  list.push(Object(_point__WEBPACK_IMPORTED_MODULE_2__[\"pointToArray\"])(points[3]));\n  return lodash_flatten__WEBPACK_IMPORTED_MODULE_0___default()(list).join(' ').replace(/ ,/g, ',');\n};\n\nconst pathViewportFromAndTo = (from, to) => ({\n  width: Math.max(from.x, to.x),\n  height: Math.max(from.y, to.y)\n});\n\nconst pathReducer = (points, reducer) => points.reduce((prev, curr) => {\n  if (!prev) return curr;\n  return reducer(prev, curr);\n});\n\nconst pathSubstractStartPosition = points => {\n  const min = pathReducer(points, (prev, curr) => ({\n    x: Math.min(prev.x, curr.x),\n    y: Math.min(prev.y, curr.y)\n  }));\n  return points.map(point => ({ ...point,\n    x: point.x - min.x + _consts__WEBPACK_IMPORTED_MODULE_1__[\"ARROW_HEAD_SIZE\"],\n    y: point.y - min.y + _consts__WEBPACK_IMPORTED_MODULE_1__[\"ARROW_HEAD_SIZE\"]\n  }));\n};\n\nconst pathListBezier = (from, to) => {\n  const viewport = pathViewportFromAndTo(from, to);\n  const points = [];\n  points.push(from);\n  points.push(Object(_point__WEBPACK_IMPORTED_MODULE_2__[\"pointBezier\"])(from, viewport));\n  points.push(Object(_point__WEBPACK_IMPORTED_MODULE_2__[\"pointBezier\"])(to, viewport));\n  points.push(to);\n  return pathSubstractStartPosition(points);\n};\n\nconst windowScroll = () => {\n  if (!window) return {\n    scrollX: 0,\n    scrollY: 0\n  };\n  return {\n    x: window.scrollX,\n    y: window.scrollY\n  };\n};\n\nconst pathOffset = (points, pathXYPosition) => {\n  const minPoint = prop => Math.min(points[0][prop] - _consts__WEBPACK_IMPORTED_MODULE_1__[\"ARROW_HEAD_SIZE\"], points[3][prop] - _consts__WEBPACK_IMPORTED_MODULE_1__[\"ARROW_HEAD_SIZE\"]);\n\n  const scroll = windowScroll();\n  return {\n    x: pathXYPosition.x - minPoint('x') - _consts__WEBPACK_IMPORTED_MODULE_1__[\"ARROW_HEAD_SIZE\"] + scroll.x,\n    y: pathXYPosition.y - minPoint('y') - _consts__WEBPACK_IMPORTED_MODULE_1__[\"ARROW_HEAD_SIZE\"] + scroll.y\n  };\n};\n\nconst path = (from, to) => {\n  const pathXYPosition = startPosition(from, to);\n  const points = pathListBezier(pointAbsolute(from, pathXYPosition), pointAbsolute(to, pathXYPosition));\n  const size = pathReducer(points, (prev, curr) => ({\n    x: Math.max(prev.x, curr.x),\n    y: Math.max(prev.y, curr.y)\n  }));\n  return {\n    offset: pathOffset(points, pathXYPosition),\n    size: {\n      width: size.x + _consts__WEBPACK_IMPORTED_MODULE_1__[\"ARROW_HEAD_SIZE\"] * 2,\n      height: size.y + _consts__WEBPACK_IMPORTED_MODULE_1__[\"ARROW_HEAD_SIZE\"] * 2\n    },\n    points: pathListSVG(points),\n    head: { ...Object(_head__WEBPACK_IMPORTED_MODULE_3__[\"headBezierAngle\"])(1, points),\n      ...Object(_head__WEBPACK_IMPORTED_MODULE_3__[\"headBezierXY\"])(1, points)\n    }\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (path);\n\n//# sourceURL=webpack:///./src/arrow/path.js?");

/***/ }),

/***/ "./src/arrow/point.js":
/*!****************************!*\
  !*** ./src/arrow/point.js ***!
  \****************************/
/*! exports provided: pointToArray, pointBezier */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pointToArray\", function() { return pointToArray; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pointBezier\", function() { return pointBezier; });\nconst pointToArray = point => [point.x, point.y];\nconst pointBezier = (point, viewport) => ({\n  x: point.x + viewport.width * point.translation[0],\n  y: point.y + viewport.height * point.translation[1]\n});\n\n//# sourceURL=webpack:///./src/arrow/point.js?");

/***/ }),

/***/ "./src/consts.js":
/*!***********************!*\
  !*** ./src/consts.js ***!
  \***********************/
/*! exports provided: ARROW_HEAD_SIZE, DIRECTION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ARROW_HEAD_SIZE\", function() { return ARROW_HEAD_SIZE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DIRECTION\", function() { return DIRECTION; });\nconst ARROW_HEAD_SIZE = 10;\nconst DIRECTION = {\n  TOP: 'top',\n  RIGHT: 'right',\n  BOTTOM: 'bottom',\n  LEFT: 'left'\n};\n\n//# sourceURL=webpack:///./src/consts.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _jsx_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jsx/element */ \"./src/jsx/element.js\");\n/* harmony import */ var _arrow_ends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow/ends */ \"./src/arrow/ends.js\");\n/* harmony import */ var _arrow_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./arrow/path */ \"./src/arrow/path.js\");\n/* harmony import */ var _arrow_observer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./arrow/observer */ \"./src/arrow/observer.js\");\n\n\n\n\n\nconst arrowCreate = ({\n  className = 'arrow',\n  from,\n  to\n}) => {\n  const arrow = Object(_arrow_path__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(Object(_arrow_ends__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(from), Object(_arrow_ends__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(to));\n  const arrowRef = _jsx_element__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createRef();\n  const pathRef = _jsx_element__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createRef();\n  const headRef = _jsx_element__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createRef();\n  const node = _jsx_element__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create(\"svg\", {\n    ref: arrowRef,\n    className: className,\n    style: {\n      top: arrow.offset.y,\n      left: arrow.offset.x,\n      position: 'absolute'\n    },\n    width: arrow.size.width,\n    height: arrow.size.height\n  }, _jsx_element__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create(\"path\", {\n    ref: pathRef,\n    className: `${className}__path`,\n    d: arrow.points\n  }), _jsx_element__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create(\"svg\", {\n    ref: headRef,\n    className: `${className}__head`,\n    x: arrow.head.x - 10,\n    y: arrow.head.y - 10,\n    width: \"20\",\n    height: \"20\",\n    transform: `rotate(${arrow.head.degree}, ${arrow.head.x}, ${arrow.head.y})`\n  }, _jsx_element__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create(\"line\", {\n    x1: \"0\",\n    y1: \"0\",\n    x2: \"10\",\n    y2: \"10\"\n  }), _jsx_element__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create(\"line\", {\n    x1: \"10\",\n    y1: \"10\",\n    x2: \"0\",\n    y2: \"20\"\n  })));\n  const watcher = Object(_arrow_observer__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(from, to);\n  watcher.observe(() => {\n    const nextArrow = Object(_arrow_path__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(Object(_arrow_ends__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(from), Object(_arrow_ends__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(to));\n    arrowRef.current.style.top = `${nextArrow.offset.y}px`;\n    arrowRef.current.style.left = `${nextArrow.offset.x}px`;\n    arrowRef.current.style.width = `${nextArrow.size.width}px`;\n    arrowRef.current.style.height = `${nextArrow.size.height}px`;\n    pathRef.current.setAttribute('d', nextArrow.points);\n    headRef.current.setAttribute('transform', `rotate(${nextArrow.head.degree}, ${nextArrow.head.x}, ${nextArrow.head.y})`);\n    headRef.current.setAttribute('x', `${nextArrow.head.x - 10}px`);\n    headRef.current.setAttribute('y', `${nextArrow.head.y - 10}px`);\n  });\n  return node;\n};\n\nif (window) window.arrowCreate = arrowCreate;\n/* harmony default export */ __webpack_exports__[\"default\"] = (arrowCreate);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/jsx/element.js":
/*!****************************!*\
  !*** ./src/jsx/element.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lodash_isNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isNumber */ \"./node_modules/lodash/isNumber.js\");\n/* harmony import */ var lodash_isNumber__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isNumber__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isObject */ \"./node_modules/lodash/isObject.js\");\n/* harmony import */ var lodash_isObject__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isObject__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst XMLNS = 'http://www.w3.org/2000/svg';\n\nconst createRef = () => {\n  const set = node => {\n    set.current = node;\n  };\n\n  set.current = null;\n  return set;\n};\n\nconst createStyle = attribute => {\n  const style = Object.entries(attribute).reduce((prev, [key, value]) => {\n    if (lodash_isNumber__WEBPACK_IMPORTED_MODULE_0___default()(value)) return `${key}: ${value}px; ${prev}`;\n    return `${key}: ${value}; ${prev}`;\n  }, '');\n  return style.endsWith('; ') ? style.substring(0, style.length - 2) : style;\n};\n\nconst createAttribute = (key, value) => {\n  if (key === 'style') return createStyle(value);\n  return value;\n};\n\nconst attributeName = ({\n  key,\n  node,\n  value\n}) => {\n  switch (key) {\n    case 'className':\n      return 'class';\n\n    case 'ref':\n      value(node);\n      return null;\n\n    default:\n      return key;\n  }\n};\n\nconst create = (tagName, attributes, ...children) => {\n  const node = document.createElementNS(XMLNS, tagName);\n  Object.entries(attributes).forEach(([key, value]) => {\n    const name = attributeName({\n      key,\n      node,\n      value\n    });\n    if (name) node.setAttributeNS(null, name, createAttribute(key, value));\n  });\n\n  if (children.length) {\n    children.forEach(child => {\n      if (lodash_isObject__WEBPACK_IMPORTED_MODULE_1___default()(child)) node.appendChild(child);else node.innerHTML = children;\n    });\n  }\n\n  return node;\n}; // Only for testing\n\n\nconst fake = ({\n  x,\n  y,\n  width,\n  height\n}) => ({\n  getBoundingClientRect: () => ({\n    x,\n    y,\n    width,\n    height\n  })\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  create,\n  createRef,\n  fake\n});\n\n//# sourceURL=webpack:///./src/jsx/element.js?");

/***/ })

/******/ });