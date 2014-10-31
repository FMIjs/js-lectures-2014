class: center middle
# събития

---
# събития
## event driven development

<big>
    Парадигма, при която приложенията се организират около концепцията за обработване на събития.
</big>

---
# събития

Всяка програма в е линейна последователност от команди, които трябва да бъдат изпълнени в определена последователност.

--

Тази концепция не се вписва безпроблемно в идеята за програма базирана изцяло на възникване на събития.

---
# call stack

```javascript
function top () {
  …
}

function middle () {
  …
  top();
  …
}

function base () {
  …
  middle();
  …
}
```

```javascript
base();
```

---
# call stack

.center[
![call stack](img/call_stack.png)
]

---
# call stack unfolding
.center[
![call stack unfold](img/call_stack_unfold.png)
]

---
# call stack

Call stack-а е добре дефиниран във времето. Всяка функция извиква друга функция, която в даден момент приключва изпълнението си, връща резултат и изпълнението се връща в извикващата функция. Обикновено в повечето езици съществува горна граница на големината на call stack-а.

```javascript
function stacker(count) {
  console.log(count);
  stacker(count+1);
}

stacker(0);
…
…
…
20610
RangeError: Maximum call stack size exceeded
```

---
# блокиращи операции
```javascript
function top () {
  return fs.readFileSync('/etc/passwd');
}
```

--

.center[
![call stack](img/call_stack.png)
]

---
# блокиращи операции
```javascript
function top () {
  return fs.readFileSync('/etc/passwd');
}
```

.center[
![much much later](img/much_much_later.jpg)
]

---
# блокиращи операции
```javascript
function top () {
  return fs.readFileSync('/etc/passwd');
}
```

.center[
![call stack unfold](img/call_stack_unfold.png)
]

---
# блокиращи операции

Скоростта, с която диска може да отговори на заявка за файл е **в порядъци** по-ниска от скоростта, с която процесора може да я обработва.

При заявки за данни от мрежата ситуацията е още по-сериозна.

---
# async I/O

Можем да решим този проблем като просто не чакаме, а зададем логиката за изпълнение предварително.

Когато искаме да прочетем файл или да направим заявка по мрежата указваме какво искаме да се случи когато данните станат достъпни, вместо да чакаме за тях и да ги обработваме след като дойдат.

```javascript
fs.readFile('/etc/passwd', function(error, data) {
  if (!error) {
    process(data); 
  } else {
    handle(error);
  }
});
```

---
# async I/O

```javascript
function top() {
  fs.readFile('/etc/passwd', function processFileReadResult(error, data) {
    if (!error) {
      process(data);
    } else {
      handle(error);
    }
  });
}
```

Обаче!

```javascript
function base() {
  …
  middle();
  // **тук файла все още не е прочетен**
  …
}
```

---
# async I/O

.center[
![io callback](img/io_callback.png)
]

---

# async I/O execution model

.center[
[![execution model](img/default.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/EventLoop)
]

* **heap**  - мястото в паметта, където се алокират обекти (горе-долу като heap–а в C++)
* **queue** - опашка с готовите за обработка събития
* **stack** - call stack-а обработващ текущото събитие

---
# async I/O execution model

Когато възникне събитие(I/O, таймер, …) функцията зададена да го обработи се вкарва в опашката.

Когато дойде ред на някое събитие да бъде обработено неговата функция започва да се изпълнява в нишката. Тя „строи“ call stack-а.

---
# `setTimeout`

Задаваме функция да се изпълни в бъдещето, но **не по-рано** от определен момент.

Когато времето изтече функцията се намира някъде в опашката, реалното ѝ изпълнение може да се случи и много по-късно.

---
# `setInterval`

Задава функция да се изпълнява многократно на определен интервал.

---
# `process.nextTick`

На пръв поглед изглежда като alias за `setTimeout(func, 0)`.

Работи значително по-ефективно.

Извършва функцията в началото на следващия loop, често пъти преди останалите I/O операции.

---
# забележка за приемане на callback

Когато ваша функция очаква callback като аргумент е естествено потребителите ѝ да очакват, че callback-а ще се изпълни асинхронно.

Ако предпочитате действието да се извършва синхронно обмислете как да подредите кода си, така че функцията да върне стойност, вместо да извиква callback.

**Една функция никога не трябва да решава динамично дали да извиква callback-а си синхронно или не.**

---
# fake async
### лошо
```javascript
function kindOfAsyncMaybe(arg, callback) {
  if (cahed(arg).length > 0) {
    callback(cached(arg));
  } else {
    getDataFromNetworkAsynchornously(arg, callback);
  }
}
```
--
```javascript
var client = net.connect(8124, function() { 
  console.log('client connected');
  client.write('world!\r\n');
});

```

---
# `fs`

Вградения модул `fs` предоставя функционалност за достъп до файловата система.

```javascript
var fs = require('fs');

fs.readFile('/etc/passwd', function (error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log(data.toString());
  }
});
```

```javascript
var fs = require('fs');

fs.readFile('/etc/passwd', {encoding: 'utf-8'}, function (error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
});
```

---
# `fs`

```javascript
var fs = require('fs');

fs.writeFile('./log', 'some stuff to log', function (error) {
  if (error) {
    console.error(error);
  }
});
```

също приема опционален параметър `options` преди callback-а



---
# EventEmitter

„Клас“ за обработка и „излъчване“ на събития.

```javasctip
var fs = require('fs'),
    events = require('events'),
    emitter = new events.EventEmitter();

emitter.on('new_user', function (username, shell) {
  console.log('Got a new user: ', username, shell);
});

fs.readFile('/etc/passwd', {encoding: 'utf-8'}, function(err, data) {
  var lines = data.split('\n');
  lines.forEach(function (line) {
    var parts = line.split(':');
    emitter.emit('new_user', parts[0], parts[parts.length - 1]);
  });
});  
```

---
# EventEmitter

Методи:

* **`addListener/on(event, listener)`** - добавяне на обработваща функция за събитие
* **`once(event, listener)`** - добавяне на обработваща функция, която ще се изпълни само веднъж(при първото излъчване на събитието)
* **`emit(event)`** - излъчване на събитие
* **`removeListener(event, listener)`** - премахване на обработваща функция за събитие
* **`removeAllListeners(event)`** - премахване на *всички* обработващи функции за определено събитие
* **`setMaxListeners(event)`** - ограничение на броя обработващи функции за едно събитие
* **`listeners(event)`** - списък с всички обработващите функции за дадено събитие

---
# EventEmitter

Често пъти обекти, които връщат различни библиотеки наследяват от `EventEmitter`

```javascript
var emitter = Object.create(EventEmitter.prototype);
```

---
# network

.center[
**`socket`** - абстракция за междупроцесна комуникация през мрежа
![муфа](img/socket.jpg)
]

---
# `telnet`

---
# `require('http')`

`http` модула в node реализира интерфейс за правене на http заявки през мрежата и за реализиране на http сървър

* `http.get`
* `http.createServer`

---
# `http.get/http.post`

---
# `http.createServer`


TODOs: async I/O в картинки(като call stack-а)
       http://howtonode.org/understanding-process-next-tick
