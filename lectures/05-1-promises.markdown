class: center middle
# обещания/бъдеще 

---

# promises/futures

<big> конструкции, използвани за синхронизирация на събътия и процеси (в смисъла на дейности) в някои езици, позволяващи конкурентно програмиране </big>
---

# coroutines и конкурентно програмиране

* програмни компоненти, които обобщават подпрограмите за многозадачност без изпреварване

* subroutines for nonpreemptive multitasking

* позволяват няколко входни точки 

* възможност за временно преустановяване на изпълнението в дадена точка

* както доста неща не са нова концепция, отдавна се говори за reactive (event-driven) програмиране с coroutins

---

# някои coroutine иструменти

* yelding

* async ops (inversion of control, callbacks)

* error handling callbacksd

* continuations - механизъм за контролиране на изпълнението. 

(в нашия случай това са callback функциите, които определяме например, когато кажем server.listen. обратно извиканата функция задава как да продължи програмата и де факто работи с continuation тук)

* cooperative multitasking

* не съществува такова нещо като implicit continuation. всяко извикване е tail call.

---

# предаване на управеление през thread-ове

```Java

void buttonHandler() {
    // This is executing in the Swing UI thread.
    // We can access UI widgets here to get query parameters.
    final int parameter = getField();
 
    new Thread(new Runnable() {
        public void run() {
            // This code runs in a separate thread.
            // We can do things like access a database or a 
            // blocking resource like the network to get data.
            final int result = lookup(parameter);
 
            javax.swing.SwingUtilities.invokeLater(new Runnable() {
                public void run() {
                    // This code runs in the UI thread and can use
                    // the fetched data to fill in UI widgets.
                    setField(result);
                }
            });
        }
    }).start();
}

```

---

# сега за event loop...малко повече

* най-популярният event loop е този на Windows OS-a при използване на Win32 API

* e, windows 3.11 често зависва... ама вие надали сте го виждали

* ето защо в windows 95 се появява идеяата за preemtive multitasking

* но това не е ефективно

* като цяло действието на две нишки, които се състезават за даден ресурс е неефективно

---

# (1) callbacks е окей като подход, но за малко

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

# (2) callbacks е окей като подход, но за малко

* правенето на неща паралелно е лесно, но синхронизацията му - трудна

* губим се лесно в грешките

* може да си напишем библиотека за всичко това и мнозина са го направили

---

# so, enter: Promise 

<big>
 пре-обръщат веригата на отговорност и вместо извикване на callback връщат Promise обект   
</big>

* унифицирана семантика при обработка на грешки

* лесна композиция

* лесно изразяване на последователни/паралелни конструкти

* винаги в синхрон

* обработка на грешките в стил 'изключения'

* така да се каже... стандартизиране за JS

(ref: https://www.promisejs.org/ ) 

---

# какво е Promise

<big> обект, който представя резултата от асинхронна операция </big>

* pending - изчакващ (първоначалното състояние)
* fulfilled - изпълнен. състоянието, което представя успешно приключване
* rejected - отхвърлен - провалена операция


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

# then/else -> chaining

```JavaScript

    returningPromiseOperation()
        .then(otherOperation)
        .then(thirdOperation)
        .else(syphonErrorsHere);
```
---

# promises with Q

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
