/* global -isNaN */

'use strict';

var objectToString = Object.prototype.toString;

var isArguments = function (value) {
    return objectToString.call(value) === '[object Arguments]';
};

var isArray = function (value) {
    return objectToString.call(value) === '[object Array]';
};

var isBoolean = function (value) {
    return typeof value === 'boolean';
};

var isBooleanObject = function (value) {
    return typeof value === 'object' && objectToString.call(value) === '[object Boolean]';
};

var isDate = function (value) {
    return objectToString.call(value) === '[object Date]';
};

var isDocument = function (value) {
    var string = objectToString.call(value);

    return string === '[object HTMLDocument]' || string === '[object Document]';
};

var isElement = function (value) {
    return /HTML.*Element/.test(objectToString.call(value));
};

var isError = function (value) {
    return objectToString.call(value) === '[object Error]';
};

var isFloat = function (value) {
    return typeof value === 'number' && value !== -Infinity && value !== Infinity && value === value;
};

var isFunction = function (value) {
    return typeof value === 'function';
};

var isGlobal = function (value) {
    var string = objectToString.call(value);

    return string === '[object global]' || string === '[object Window]';
};

var isInteger = function (value) {
    return typeof value === 'number' && value % 1 === 0;
};

var isNaN = function (value) {
    return value !== value;
};

var isNull = function (value) {
    return value === null;
};

var isNullOrUndefined = function (value) {
    return value == null;
};

var isNumber = function (value) {
    return typeof value === 'number';
};

var isNumberObject = function (value) {
    return typeof value === 'object' && objectToString.call(value) === '[object Number]';
};

var isObject = function (value) {
    return objectToString.call(value) === '[object Object]';
};

var isPrimitive = function (value) {
    var type = typeof value;

    return type !== 'function' && (type !== 'object' || value === null);
};

var isReference = function (value) {
    var type = typeof value;

    return type === 'function' || (type === 'object' && value !== null);
};

var isRegExp = function (value) {
    return objectToString.call(value) === '[object RegExp]';
};

var isString = function (value) {
    return typeof value === 'string';
};

var isStringObject = function (value) {
    return typeof value === 'object' && objectToString.call(value) === '[object String]';
};

var isSymbol = function (value) {
    /* jshint notypeof: true */

    return typeof value === 'symbol';
};

var isUndefined = function (value) {
    return value === undefined;
};

exports.isArguments       = isArguments;
exports.isArray           = isArray;
exports.isBoolean         = isBoolean;
exports.isBooleanObject   = isBooleanObject;
exports.isDate            = isDate;
exports.isDocument        = isDocument;
exports.isElement         = isElement;
exports.isError           = isError;
exports.isFloat           = isFloat;
exports.isFunction        = isFunction;
exports.isGlobal          = isGlobal;
exports.isInteger         = isInteger;
exports.isNaN             = isNaN;
exports.isNull            = isNull;
exports.isNullOrUndefined = isNullOrUndefined;
exports.isNumber          = isNumber;
exports.isNumberObject    = isNumberObject;
exports.isObject          = isObject;
exports.isPrimitive       = isPrimitive;
exports.isReference       = isReference;
exports.isRegExp          = isRegExp;
exports.isString          = isString;
exports.isStringObject    = isStringObject;
exports.isSymbol          = isSymbol;
exports.isUndefined       = isUndefined;
