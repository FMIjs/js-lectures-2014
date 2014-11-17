# Promises

**NOTE** the promise is simplified version of Q. It is not fully backward compatible with Kris Kowal's Q.

In this exercise we are going to create a simple implementation of limited scope of the API of Kris Kowal's Q.

1. Define "enum" (object with numeric values) called `STATES`. It should has the following properties:
  * `CLEAN`
  * `RESOLVED`
  * `REJECTED`
2. Define a constructor function called `Promise`. It should add the following properties to the instances created with it:
  * `_deferred` - accepts as value the first argument passed to the `Promise` constructor function
  * `_done` - initial value null
  * `_fail` - inital value null
  * `_state` - initial value `STATES.CLEAN`
  * `_resolveData` - initial value null
  * `_rejectData` - initial value null
3. Add the following methods to the `Promise`'s prototype:
  * `then` - accepts two callbacks - `successCb` and `failCb`. If the current state of the promise is `RESOLVED` it should resolve itself through the reference of `_deferred` with the `_resolvedData`. If the current state of the promise is `REJECTED` it should reject itself trough the reference of `_deferred` with the `_rejectData`. In this method you should set the values of `_done` and `_fail`. The result of the execution of the method should be a new promise, which you should add to the array of promises in the deferred object, which was passed to the constructor function `Promise` (look at the next point).
4. Define a constructor function called `Deferred`. It should initialize a property called `promise`, equals to `new Promise(this)` and a property `_promises` of type array.
5. Add the following methods to the prototype of `Deferred`:
  * `resolve(data)` - it sets the promise state to `RESOLVED`, sets the resolved data (`_resolvedData`) and invokes each of the promise's done callbacks with the data passed as argument. The method should be invoked recursively with the next promise from the `_promises` array, with the result of the invokation of the `_done` callback.
  * `reject(data)` - it sets the promise state to `REJECTED`, sets the rejected data (`_rejectData`) and invokes each of the promise's fail callbacks with the data passed as argument. The method should be invoked recursively with the next promise from the `_promises` array, with the result of the invokation of the `_fail` callback.
6. Define object literal called `Q`. It should has the following methods:
  * `defer` returns new deferred object.
  * `all` - accepts a list of promises and returns a new promise. The new promise would be resolved once all promises passed as arguments are resolved.
  * `when(data)` - the method creates new deferred object, returns its promise and resolves the deferred object with the passed data.

In order to test your implementation run the sample form-validation app.

1. run `bower install`
2. Start a static http server
3. Open the app in your browser

When you start filling the form you should get validation errors each time you fill the input with invalid value (the border of the input should get red).
Once all fields are filled successfully you should get proper log statement in the browser's console.
