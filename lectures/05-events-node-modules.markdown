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
function base() {
  fs.readFile('/etc/passwd', function processFileReadResult(error, data) {
    if (!error) {
      process(data);
    } else {
      handle(error);
    }
  });
}
```

TODOs: async I/O в картинки(като call stack-а)
       stack/heap/queue https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/EventLoop
       EventEmitter: интерфейс, как да го наследяваме
       fs модула: четене, писане
       общи приказки за HTTP, демо с telnet/nc
       http модула: get/post заявки, прост сървър
