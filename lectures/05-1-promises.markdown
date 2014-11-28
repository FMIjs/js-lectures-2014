class: center middle
# обещания/отложено/бъдеще 

---

# promises/deffered/futures

<big> конструкции, използвани за синхронизирация на събътия и процеси (в смисъла на дейности) в някои езици, позволяващи конкурентно програмиране </big>

познати и предложени още през средата на 70-те, но едва в последните години се осъзнава сериозната полза от тях в програмирането на асинхронни програми.

---

# coroutines и конкурентно програмиране

* програмни компоненти, които обобщават подпрограмите за многозадачност без изпреварване

* subroutines for nonpreemptive multitasking

* позволяват няколко входни точки 

* възможност за временно преустановяване на изпълнението в дадена точка

* както доста неща не са нова концепция, отдавна се говори за reactive (event-driven) програмиране с coroutins

---

# някои coroutine парадигми и инструменти 


* async ops (inversion of control, callbacks)

* yelding / generators

* error handling callbacks 

* continuations - механизъм за контролиране на изпълнението. 

на практика callback функциите, които определяме например, когато кажем ___server.listen___ са асинхронни continuations. 

* cooperative multitasking

* не съществува такова нещо като implicit continuation. всяко извикване на continuation е т.нар.  tail call.

---

# сега за event loop...малко повече

* да, такова нещо има в Windows OS-a за обработка на съобщения от OS към приложенията 

* e, windows 3.11 често зависва... ама вие надали сте го виждали

* в доста OS е заложена идеята за preemtive multitasking

* това е неизбежно в Multi User Domain среда

* реализирането на multi-threaded решения в рамките на една програма често е неефективно

* като цяло действието на две нишки, които се състезават за даден ресурс е неефективно

---

# (1) callbacks е окей като подход,... но за малко

* правенето на неща последователно може да доведе до т.нар. the pyramid of dooma

```JavaScript
step1(function (value1) {
    step2(function (value2) {
        step3(function (value3) {
            step4(function (value4) {
                step5(function (value5) {
                    step6(function (value6) {
                        // Do something with value6
                    });
                });
            });
        });
    });
}); 
```

(ref: http://raynos.github.io/presentation/shower/controlflow.htm?full#PyramidOfDoom)

---

# (2) callbacks е окей като подход,... но за малко

* callbacks е подход с асинхронни продължения на програмaта

* ... _както казахме вече -  continuations_ 
 
* комуникирането на паралелни процеси е така става по-лесно и възможно в един процес

* ... но синхронизацията - трудна, трасирането за грешки - почти невъзможнo

* губим се лесно в грешките

* може да си напишем библиотека за всичко това и мнозина са го направили

---

<big> 

Notice that inversion of control breaks the principles of imperative programming, in which statements are executed in the order they appear in the program, subject only to simple control structures such as conditionals or loops. Instead, with IoC, we are entering the area of reactive programming, were the program reacts to external events

</big>

..._от което ще избягаме в тази лекция :)_

!(ref...)[https://www.fpcomplete.com/blog/2012/06/asynchronous-api-in-c-and-the-continuation-monad]

---

# so, enter: Promise 

<big>
 пре-обръщат веригата на отговорност и вместо предаване на continuation на callback връщат Promise обект  
</big>

* познати от около 1976 

* унифицирана семантика при обработка на грешки

* лесна композиция

* лесно изразяване на последователни/паралелни конструкти

* винаги в синхрон

* обработка на грешките в стил 'изключения'

* така да се каже... стандартизиране за JS

(ref: https://www.promisejs.org/ ) 

---

<img src='http://www.mediumequalsmessage.com/blog-images/promises.png' width='70%' align='center' />

---

# какво е Promise

<big> обект, който представя възможният краен резултат от асинхронна операция </big>

* Може да бъде в едно от три състояния : 

 * pending - изчакващ (първоначалното състояние)
 * fulfilled - изпълнен. състоянието, което представя успешно приключване
 * rejected - отхвърлен - провалена операция

* Има метод then(), който също следва да връща promise и позволява 'навързване' на promis-и

```javascript

promise.then(fulfilledHandler, errorHandler, progressHandler)


```

* Стойността върната от fullfilledHandler е стойността, с която се оценява (разрешава) 'обещанието'.

---

# какво е Promise

едно примерче 

```JavaScript

function readFile(filename, enc){
  return new Promise(function (fulfill, reject){
    fs.readFile(filename, enc, function (err, res){
      if (err) reject(err);
      else fulfill(res);
    });
  });
}

```
---

# then/else -> вериги (chaining)

```JavaScript

    returningPromiseOperation()
        .then(otherOperation)
        .then(thirdOperation)
        .else(syphonErrorsHere);
```
---

# Бълбукане (Bubbling)

стойността върната като резултат от обработваща promise функция се връща 'нагоре' по веригата от promise-и.

```JavaScript
function doSomethingAsync() {
  return asyncHelper().then(function(val) {
    // do some extra processing on val
    return val; <-- becomes the resolution of the promise returned by doSomethingAsync
  });
}

doSomethingAsync().then(function(val) {
  console.log('resolved', val);
}, function(err) {
  // Will receive rejections from doSomethingAsync or bubbled from asyncHelper
  console.log('error', err);
});
```

---

# създаване на обекти Deffered 

* въвежда концепцията за отложен (deffered) обект

* отложеният обект е 'опаковка' около Promise

* deffered обекта може да бъде удовлетворен (resolve) или отхвърлен (reject)

* горните операции ще доведат до изпълняването на съответното действие в/у Promise обекта

---

# пример - promises with Q

```JavaScript
// вместо setTimeout(doSomething, 1000);

delay(1000).then(doSomething);

function delay(ms) {
    var deffered = Q.defer();
    setTimeout(deferred.resolve, ms);
    return deferred.promise;
}

```
---

# (1) паралелно четене 

<big> неудобния подход </big>

```JavaScript
function readJsonFiles(filenames, callback) {
  var pending = filenames.length;
  var called = false;
  var results = [];
  if (pending === 0) {
    // we need to return early in the case where there
    // are no files to read, but we must not return immediately
    // because that unleashes "Zalgo". This makes code very hard
    // to reason about as the order becomes increasingly
    // non-deterministic.
    return setTimeout(function () { callback(); }, 0);
  }
  filenames.forEach(function (filename, index) {
    readJSON(filename, function (err, res) {
      if (err) {
        if (!called) callback(err);
        return;
      }
      results[index] = res;
      if (0 === --pending) {
        callback(null, res);
      }
    });
  });
}
```
---
# (2) паралелно четене...

<big> Удобния подход ! </big>

```JavaScript
function readJsonFiles(filenames) {
  // N.B. passing readJSON as a function, not calling it with `()`
  return Promise.all(filenames.map(readJSON));
}
readJsonFiles(['a.json', 'b.json']).done(function (results) {
  // results is an array of the values stored in a.json and b.json
}, function (err) {
  // If any of the files fails to be read, err is the first error
});
```
---

# promisify

```JavaScript

function promisify(nodeAsyncFn, context) {
  return function() {
    var defer = q.defer()
      , args = Array.prototype.slice.call(arguments);

    args.push(function(err, val) {
      if (err !== null) {
        return defer.reject(err);
      }

      return defer.resolve(val);
    });

    nodeAsyncFn.apply(context || {}, args);

    return defer.promise;
  };
};

/////

var readFile = promisify(fs.readFile);
readFile('test.txt').then(function(data) {
  console.log(data);
});

```

---

# denodify

```JavaScript

var readFile = Promise.denodeify(require('fs').readFile);
// now `readFile` will return a promise rather than expecting a callback

function readJSON(filename, callback){
  // If a callback is provided, call it with error as the first argument
  // and result as the second argument, then return `undefined`.
  // If no callback is provided, just return the promise.
  return readFile(filename, 'utf8').then(JSON.parse).nodeify(callback);
}

```

---

# библиография

* [Promise & Deferred objects in JavaScript Pt.1: Theory and Semantics.](http://blog.mediumequalsmessage.com/promise-deferred-objects-in-javascript-pt1-theory-and-semantics)

* https://github.com/kriskowal/q и http://documentup.com/kriskowal/q/

* [Asynchronous Control Flow with Promises](http://howtonode.org/promises)

* [Asynchronous programming and continuation-passing style in JavaScript](http://www.2ality.com/2012/06/continuation-passing-style.html)

* [Async JavaScript: Build More Responsive Apps with Less Code](http://www.amazon.com/gp/product/B00AKM4RVG/)
