# typesystem

> Better type checking for JavaScript.

[![license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/clebert/typesystem/master/LICENSE)
[![npm](http://img.shields.io/npm/v/typesystem.svg?style=flat)](https://www.npmjs.org/package/typesystem)
[![downloads](http://img.shields.io/npm/dm/typesystem.svg?style=flat)](https://www.npmjs.org/package/typesystem)

[![build](http://img.shields.io/travis/clebert/typesystem/master.svg?style=flat)](https://travis-ci.org/clebert/typesystem)
[![coverage](http://img.shields.io/coveralls/clebert/typesystem/master.svg?style=flat)](https://coveralls.io/r/clebert/typesystem)
[![code climate](http://img.shields.io/codeclimate/github/clebert/typesystem.svg?style=flat)](https://codeclimate.com/github/clebert/typesystem)
[![dependencies](http://img.shields.io/david/clebert/typesystem.svg?style=flat)](https://david-dm.org/clebert/typesystem#info=dependencies&view=table)
[![devDependencies](http://img.shields.io/david/dev/clebert/typesystem.svg?style=flat)](https://david-dm.org/clebert/typesystem#info=devDependencies&view=table)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/clebert.svg)](https://saucelabs.com/u/clebert)

## Getting Started

### Installation

```sh
npm install typesystem --save
```

### Integration

```javascript
var ts = require('typesystem');
```

## API

### Overview

- [ts.isArguments(value)](#tsisargumentsvalue)
- [ts.isArray(value)](#tsisarrayvalue)
- [ts.isBoolean(value)](#tsisbooleanvalue)
- [ts.isBooleanObject(value)](#tsisbooleanobjectvalue)
- [ts.isDate(value)](#tsisdatevalue)
- [ts.isDocument(value)](#tsisdocumentvalue)
- [ts.isElement(value)](#tsiselementvalue)
- [ts.isError(value)](#tsiserrorvalue)
- [ts.isFloat(value)](#tsisfloatvalue)
- [ts.isFunction(value)](#tsisfunctionvalue)
- [ts.isGlobal(value)](#tsisglobalvalue)
- [ts.isInteger(value)](#tsisintegervalue)
- [ts.isNaN(value)](#tsisnanvalue)
- [ts.isNull(value)](#tsisnullvalue)
- [ts.isNullOrUndefined(value)](#tsisnullorundefinedvalue)
- [ts.isNumber(value)](#tsisnumbervalue)
- [ts.isNumberObject(value)](#tsisnumberobjectvalue)
- [ts.isObject(value)](#tsisobjectvalue)
- [ts.isPrimitive(value)](#tsisprimitivevalue)
- [ts.isReference(value)](#tsisreferencevalue)
- [ts.isRegExp(value)](#tsisregexpvalue)
- [ts.isString(value)](#tsisstringvalue)
- [ts.isStringObject(value)](#tsisstringobjectvalue)
- [ts.isSymbol(value)](#tsissymbolvalue)
- [ts.isUndefined(value)](#tsisundefinedvalue)

### ts.isArguments(value)

```javascript
ts.isArguments(arguments); // returns true
```

### ts.isArray(value)

```javascript
ts.isArray([]);          // returns true
ts.isArray(new Array()); // returns true
```

### ts.isBoolean(value)

```javascript
ts.isBoolean(true);  // returns true
ts.isBoolean(false); // returns true
```

### ts.isBooleanObject(value)

```javascript
ts.isBooleanObject(new Boolean()); // returns true
```

### ts.isDate(value)

```javascript
ts.isDate(new Date()); // returns true
```

### ts.isDocument(value)

```javascript
ts.isDocument(document); // returns true
```

### ts.isElement(value)

```javascript
ts.isElement(document.createElement('div'));  // returns true
ts.isElement(document.createElement('span')); // returns true
```

### ts.isError(value)

```javascript
ts.isError(new Error());          // returns true
ts.isError(new EvalError());      // returns true
ts.isError(new RangeError());     // returns true
ts.isError(new ReferenceError()); // returns true
ts.isError(new SyntaxError());    // returns true
ts.isError(new TypeError());      // returns true
ts.isError(new URIError());       // returns true
```

### ts.isFloat(value)

```javascript
ts.isFloat(1);                 // returns true
ts.isFloat(-1);                // returns true
ts.isFloat(0);                 // returns true
ts.isFloat(-0);                // returns true
ts.isFloat(Number.MAX_VALUE);  // returns true
ts.isFloat(-Number.MAX_VALUE); // returns true
ts.isFloat(Number.MIN_VALUE);  // returns true
ts.isFloat(-Number.MIN_VALUE); // returns true
```

### ts.isFunction(value)

```javascript
ts.isFunction(function () {}); // returns true
ts.isFunction(new Function()); // returns true
```

### ts.isGlobal(value)

```javascript
ts.isGlobal(global); // returns true
ts.isGlobal(window); // returns true
```

### ts.isInteger(value)

```javascript
ts.isInteger(1);                 // returns true
ts.isInteger(-1);                // returns true
ts.isInteger(0);                 // returns true
ts.isInteger(-0);                // returns true
ts.isInteger(Number.MAX_VALUE);  // returns true
ts.isInteger(-Number.MAX_VALUE); // returns true
```

### ts.isNaN(value)

```javascript
ts.isNaN(NaN); // returns true
```

### ts.isNull(value)

```javascript
ts.isNull(null); // returns true
```

### ts.isNullOrUndefined(value)

```javascript
ts.isNullOrUndefined(null);      // returns true
ts.isNullOrUndefined(undefined); // returns true
ts.isNullOrUndefined(void 0);    // returns true
```

### ts.isNumber(value)

```javascript
ts.isNumber(1);                 // returns true
ts.isNumber(-1);                // returns true
ts.isNumber(0);                 // returns true
ts.isNumber(-0);                // returns true
ts.isNumber(Number.MAX_VALUE);  // returns true
ts.isNumber(-Number.MAX_VALUE); // returns true
ts.isNumber(Number.MIN_VALUE);  // returns true
ts.isNumber(-Number.MIN_VALUE); // returns true
ts.isNumber(Infinity);          // returns true
ts.isNumber(-Infinity);         // returns true
ts.isNumber(NaN);               // returns true
```

### ts.isNumberObject(value)

```javascript
ts.isNumberObject(new Number()); // returns true
```

### ts.isObject(value)

```javascript
ts.isObject({});           // returns true
ts.isObject(new Object()); // returns true
```

### ts.isPrimitive(value)

```javascript
ts.isPrimitive(true);      // returns true
ts.isPrimitive(null);      // returns true
ts.isPrimitive(1);         // returns true
ts.isPrimitive('foo');     // returns true
ts.isPrimitive(Symbol());  // returns true
ts.isPrimitive(undefined); // returns true
```

### ts.isReference(value)

```javascript
ts.isReference(arguments);                     // returns true
ts.isReference([]);                            // returns true
ts.isReference(new Boolean());                 // returns true
ts.isReference(new Date());                    // returns true
ts.isReference(document);                      // returns true
ts.isReference(document.createElement('div')); // returns true
ts.isReference(new Error());                   // returns true
ts.isReference(function () {});                // returns true
ts.isReference(global);                        // returns true
ts.isReference(new Number());                  // returns true
ts.isReference({});                            // returns true
ts.isReference(/(?:)/);                        // returns true
ts.isReference(new String());                  // returns true
```

### ts.isRegExp(value)

```javascript
ts.isRegExp(/(?:)/);       // returns true
ts.isRegExp(new RegExp()); // returns true
```

### ts.isString(value)

```javascript
ts.isString('foo'); // returns true
ts.isString('');    // returns true
```

### ts.isStringObject(value)

```javascript
ts.isStringObject(new String()); // returns true
```

### ts.isSymbol(value)

```javascript
ts.isSymbol(Symbol()); // returns true
```

### ts.isUndefined(value)

```javascript
ts.isUndefined(undefined); // returns true
ts.isUndefined(void 0);    // returns true
```

## Running Tests

To run the test suite first install the development dependencies:

```sh
npm install
```

then run the tests:

```sh
npm test
```
