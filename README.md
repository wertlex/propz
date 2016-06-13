# Another Property Access Library

## What is that ?

This is one more library for nested property access within Javascript objects. It is aimed to be straightforward, predictable and fast without any additional overhead. It is intentionally written in a bit simpler way in hope to be faster in certain cases. 

## How to install it ?

```
npm install apal
```

## How to use it ?

```javascript
var apal = require('apal');

var myObject = {
  name: 'John',
  notifications: {
    email:  true,
    phone:  true
  }
};

var emailNotifications = apal.get(myObject, ['notifications', 'email']);

apal.set(myObject, ['notifications', 'personal', true]);

```