# ObjectProxy for ConboJS 4

`ObjectProxy` is an experimental pseudo-class for ConboJS that wraps regular JavaScript objects to enable them to be be used with ConboJS two-way data binding, as an alternative to using a `Hash` or similar data model.   

The `ObjectProxy` pseudo-class can be imported as an AMD, CommonJS or global module.

## Getting started

The `ObjectProxy` class was inspired by the [Apache Flex class of the same name](https://flex.apache.org/asdoc/mx/utils/ObjectProxy.html) and serves the same purpose.

You can create a new `ObjectProxy` in one of 2 ways:

```javascript
var obj = {a:0};
var proxy1 = ObjectProxy(obj);
var proxy2 = ObjectProxy.create(obj);
```

Both methods have the same outcome, but the second method seems a little cleaner until we work out how to create a version that can use `new ObjectProxy(obj)`.

## Strict proxies

If you would like to prevent reading or creation of dynamic and private properties, simply create your proxy with `true` as a second parameter:

```javascript
var proxy = ObjectProxy.create(obj, true);
```

The proxy will then throw an error if anyone tries to read or write properties that don't exist on the target object, or begin with an `_`.
