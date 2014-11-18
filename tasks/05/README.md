# Promises

**NOTE** the promise is simplified version of Q. It is not fully backward compatible with Kris Kowal's Q.

In this exercise we are going to create a simple implementation of limited scope of the API of Kris Kowal's Q.

1. Define "enum" (object with numeric values) called `STATES`. It should has the following properties:
  * `CLEAN`
  * `RESOLVED`
  * `REJECTED`
2. Define a constructor function called `Promise`. It should add the following properties to the instances created with it:
  * `_done` - initial value null
  * `_fail` - initial value null
  * `_state` - initial value `STATES.CLEAN`
  * `_resolveData` - initial value null
  * `_rejectData` - initial value null
  * `_next` - the next promise to be executed (in case of chaining)
3. Add the following methods to the `Promise`'s prototype:
  * `then` - accepts two callbacks - `successCb` and `failCb`. If the current state of the promise is `RESOLVED` it should resolve itself with the data in the property `_resolvedData`. If the current state of the promise is `REJECTED` it should reject itself with the value of `_rejectData`. In this method you should set the values of `_done` and `_fail` methods. The result of the execution of the method should be a new promise, which you should set as value of the `_next` property of the current promise. Note that if the resolve function (the `_done`) throws an error, the error should be caught and the reject function (`_fail`) should be called. Once a promise has been resolved or rejected the corresponding method of the next promise of the chain should be called.
4. Define a constructor function called `Deferred`. It should initialize a property called `promise`, equals to `new Promise()`.
5. Add the following methods to the prototype of `Deferred`:
  * `resolve(data)` - it sets the promise's state to `RESOLVED`, sets the `_resolvedData` property and resolves the promise with the already provided data.
  * `reject(data)` - it sets the promise's state to `REJECTED`, sets the `_rejectData` property and rejects the promise with the already provided data.
6. Define object literal called `Q`. It should has the following methods:
  * `defer` returns new deferred object.
  * `all` - accepts a list of promises and returns a new promise. The new promise would be resolved once all promises passed as arguments are resolved.
  * `when(data)` - the method creates new deferred object, returns its promise and resolves the deferred object with the passed data.

Note that for better design of your code you might need to add additional method to your promise in order to achieved the desired functionality. A good practice could be to add a method(s), which is/are responsible for resolving and rejecting the promise, since `then` is used mainly for setting it up.
