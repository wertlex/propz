# Propz

[![Build Status](https://travis-ci.org/SquadInTouch/propz.svg?branch=master)](https://travis-ci.org/SquadInTouch/propz)

## What is that ?

This is one more library for nested property access within Javascript objects. It is aimed to be straightforward, predictable and fast without any additional overhead. It is intentionally written in a bit simpler way in hope to be faster in certain cases. 

## How to install it ?

```
npm install propz
```

## How to use it ?

```javascript
var propz = require('propz');

var myObject = {
  name: 'John',
  notifications: {
    email:  true,
    phone:  true
  }
};

var emailNotifications = propz.get(myObject, ['notifications', 'email']);

propz.set(myObject, ['notifications', 'personal', true]);

```

## How fast is it ?

```
direct access 1st level x 14,499,983 ops/sec ±0.75% (70 runs sampled)
propz.get 1st level x 8,556,716 ops/sec ±1.94% (82 runs sampled)
dotty.get 1st level x 4,392,738 ops/sec ±2.78% (83 runs sampled)
propz.get 2nd level x 7,407,621 ops/sec ±2.62% (80 runs sampled)
dotty.get 2nd level x 2,698,035 ops/sec ±1.66% (85 runs sampled)
propz.get 3rd level x 6,426,926 ops/sec ±1.52% (84 runs sampled)
dotty.get 3rd level x 1,806,001 ops/sec ±1.68% (84 runs sampled)
propz.get 4th level x 5,153,905 ops/sec ±1.51% (84 runs sampled)
dotty.get 4th level x 1,446,254 ops/sec ±1.58% (86 runs sampled)
```