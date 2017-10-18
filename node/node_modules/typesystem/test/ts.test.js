/* exported assert, ts */
/* global describe, it */

'use strict';

var assert = require('expressive-assertion');
var ts     = require('../lib/ts.js');

var primitiveExpressions = [
    'true',
    'false',
    'null',
    '1',
    '-1',
    '0',
    '-0',
    'Number.MAX_VALUE',
    '-Number.MAX_VALUE',
    'Number.MIN_VALUE',
    '-Number.MIN_VALUE',
    'Infinity',
    '-Infinity',
    'NaN',
    '"foo"',
    '""',
    'Symbol()',
    'undefined',
    'void 0'
];

var referenceExpressions = [
    'arguments',
    '[]',
    'new Array()',
    'new Boolean()',
    'new Date()',
    'document',
    'document.createElement("div")',
    'document.createElement("span")',
    'new Error()',
    'new EvalError()',
    'new RangeError()',
    'new ReferenceError()',
    'new SyntaxError()',
    'new TypeError()',
    'new URIError()',
    'function () {}',
    'new Function()',
    'global',
    'window',
    'new Number()',
    '{}',
    'new Object()',
    '/(?:)/',
    'new RegExp()',
    'new String()'
];

var allExpressions = primitiveExpressions.concat(referenceExpressions);

var evalAssert = function (name, expression, result) {
    /* jshint evil: true */

    try {
        eval('assert(function () { return ts.' + name + '(' + expression + ') === ' + result + ' })');
    } catch (exception) {
        if (!/^(?:ReferenceError|SyntaxError)/.test(exception)) {
            throw exception;
        }
    }
};

var getUnequalExpressions = function (expressions) {
    return allExpressions.filter(function (expression1) {
        return expressions.every(function (expression2) {
            return expression1 !== expression2;
        });
    });
};

var describePredicate = function (name, expressions) {
    describe('.' + name + '()', function () {
        it('returns true', function () {
            expressions.forEach(function (expression) {
                evalAssert(name, expression, true);
            });
        });

        it('returns false', function () {
            getUnequalExpressions(expressions).forEach(function (expression) {
                evalAssert(name, expression, false);
            });
        });
    });
};

describe('ts', function () {
    describePredicate('isArguments', [
        'arguments'
    ]);

    describePredicate('isArray', [
        '[]',
        'new Array()'
    ]);

    describePredicate('isBoolean', [
        'true',
        'false'
    ]);

    describePredicate('isBooleanObject', [
        'new Boolean()'
    ]);

    describePredicate('isDate', [
        'new Date()'
    ]);

    describePredicate('isDocument', [
        'document'
    ]);

    describePredicate('isElement', [
        'document.createElement("div")',
        'document.createElement("span")'
    ]);

    describePredicate('isError', [
        'new Error()',
        'new EvalError()',
        'new RangeError()',
        'new ReferenceError()',
        'new SyntaxError()',
        'new TypeError()',
        'new URIError()'
    ]);

    describePredicate('isFloat', [
        '1',
        '-1',
        '0',
        '-0',
        'Number.MAX_VALUE',
        '-Number.MAX_VALUE',
        'Number.MIN_VALUE',
        '-Number.MIN_VALUE'
    ]);

    describePredicate('isFunction', [
        'function () {}',
        'new Function()'
    ]);

    describePredicate('isGlobal', [
        'global',
        'window'
    ]);

    describePredicate('isInteger', [
        '1',
        '-1',
        '0',
        '-0',
        'Number.MAX_VALUE',
        '-Number.MAX_VALUE'
    ]);

    describePredicate('isNaN', [
        'NaN'
    ]);

    describePredicate('isNull', [
        'null'
    ]);

    describePredicate('isNullOrUndefined', [
        'null',
        'undefined',
        'void 0'
    ]);

    describePredicate('isNumber', [
        '1',
        '-1',
        '0',
        '-0',
        'Number.MAX_VALUE',
        '-Number.MAX_VALUE',
        'Number.MIN_VALUE',
        '-Number.MIN_VALUE',
        'Infinity',
        '-Infinity',
        'NaN'
    ]);

    describePredicate('isNumberObject', [
        'new Number()'
    ]);

    describePredicate('isObject', [
        '{}',
        'new Object()'
    ]);

    describePredicate('isPrimitive', primitiveExpressions);
    describePredicate('isReference', referenceExpressions);

    describePredicate('isRegExp', [
        '/(?:)/',
        'new RegExp()'
    ]);

    describePredicate('isString', [
        '"foo"',
        '""'
    ]);

    describePredicate('isStringObject', [
        'new String()'
    ]);

    describePredicate('isSymbol', [
        'Symbol()'
    ]);

    describePredicate('isUndefined', [
        'undefined',
        'void 0'
    ]);
});
