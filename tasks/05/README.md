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
