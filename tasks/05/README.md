# Promises

**NOTE** the promise is simplified version of Q. It is not fully backward compatible with Kris Kowal's Q.

In this exercise we are going to create a simple implementation of limited scope of the API of Kris Kowal's Q.

1. Define a constructor function called `Promise`. It should add the following properties to the instances created with it:
  * `_done` - initial value `null`
  * `_fail` - initial value `null`
  * `_next` - the next promise to be executed (in case of chaining)
2. Add the following method to the `Promise`'s prototype:
  * `then(successCb, failCb)` - it should set the values of `_fail` and `_done`. `then` should also create a new promise and set it as value of the `_next` property.
3. Define a constructor function called `Deferred`. It should initialize a property called `promise`, equals to `new Promise()`.
4. Add the following methods to the prototype of `Deferred`:
  * `resolve(data)` - it resolves the promise with the already provided `data`.
  * `reject(data)` - t rejects the promise with the already provided `data`.
5. Define object literal called `Q`. It should has the following methods:
  * `defer` returns new deferred object.
  * `all` - accepts a list of promises and returns a new promise. The new promise would be resolved once all promises passed as arguments are resolved.
  * `when(data)` - this method accepts a single argument. Check whether the passed argument is a promise and if it is not create new promise and return it (usig deferred). Once you return the created promise resolve it asynchronously (use `setTimeout` with second argument 0). If the argument is a promise just return it. In other words the purpose of `when` is to wrap the given argument into a promise.

Note that for better design of your code you might need to add additional, private, methods to your promise in order to achieve the desired functionality. A good practice could be to add a method/s, which is/are responsible for resolving and rejecting the promise.

Example:

```javascript
Q.all([Q.when(1), Q.when(2), Q.when(3)])
.then(function (res) {
  'use strict';
  var d = Q.defer();
  setTimeout(function () {
    res = res.reduce(function (p, c) {
      return p + c;
    }, 0);
    d.resolve(res + 1);
  }, 100);
  return d.promise;
})
.then(function (r) {
  'use strict';
  console.log(r);
})
.then(function (r) {
  'use strict';
  console.log(r === undefined);
});

```

The code above should do the following:
1. `Q.when(param)` creates a new promise (`Q.when(1)` creates a new promise, which will be asynchronously resolved with value `1`).
2. `Q.all(arr)` should create a new promise, which will be resolved once all `Q.when(1), Q.when(2), Q.when(3)` are resolved
3. The body of the first then should sum the numbers (i.e. the value of `res` inside the timeout, after the `reduce` call should be `6` and after that the deferred object is being resolved with value `6 + 1`.
4. Since the callback passed to the first `then` call (the first callback where the `reduce` method call is) returns a promise, we need to wait until this promise is being resolved (i.e. 100ms) and then invoke the second `done` callback in the second `then`.
5. The argument of the callback passed to the second `then` call should be equals to `7`.
6. Since the callback passed to the second call of `then` returns `undefined` the last callback should accept as argument `undefined` (i.e. `console.log(r === undefined)` should be equals to `true`).
