# Objects, functions as objects

---

# ООП

* Абстракция
* Наследяване
* Полиморфизъм
* Енкапсулация

---

# Абстракция (1)

```text
Абстракция (от латински abstractio - отвлечен) е процес или израз означаващ някакво отвлечено, ирационално понятие или фикция. В този смисъл абстракциите са малко или много нереална, отдалечена представа за действителността. Въпреки това обаче те са особена форма за опознаване на тази действителност.
```

---

# Абстракция (2)

Абстракцията ни позволява да пренебрегнем имплементационни детайли, давайки ни възможност да използваме API (например) от по-високо ниво.

Пример:
* Примитивните типове в C++
* Обектите, в кой да е ОО език
* Слоеве в OSI
* etc...

---

# Абстракция (3)

```javascript
function Person(age, name) {
  this.age = age;
  this.name = name;
}
```

---

# Абстракция (4)

Кой design pattern ни позволява да се абстрахираме от сложна система и да използваме само прост интерфейс към нея?

---

# Абстракция (5)

Не, не е абстрактна фабрика - Фасада (Façade).

![](/images/04/facade.svg)

---

# Наследяване (1)

Използва се с цел преизползване на код и ни помага да се възползваме "динамичното свързване".

---

# Наследяване (2)

```java
public class Person {
  private int age;
  private String name;
  public int getAge() {
    return age;
  }
  public void setAge(int age) {
    this.age = age;
  }
  public void talk() {
    System.out.println("I'm a person");
  }
}

public class Developer extends Person {
  private String[] languages;
  @Override
  public void talk() {
    System.out.println("I'm a developer");
  }
}
```

---

# Наследяване (3)

Наследяването НЕ ВИНАГИ е най-добрият вариант! Наследяването състава много силен coupling между класовете, които образуват веригата на наследяването. В повечето случаи композиция е достатъчна.

---

# Полиморфизъм (1)

Позволява различно поведение при извикването на един и същи метод в зависимост от типа на обекта, който приема извикването на метода.

---

# Полиморфизъм (2)

```java
public class Main {
  public static void main(String[] args) {
    Person p = new Developer();
    p.talk(); //I'm a developer
  }
}
```

---

# Енкапсулация (1)

* Конструкция на език за програмиране, която ни позволява да скрием компоненти на даден обект
*

---

# Енкапсулация (2)

Това предразполага към идеята, че езика, в който програмираме трябва да присъстват ключови думи/модификатори за достъп като "private", "public", "protected", тъй като енкапсулация се постига с data hiding.

---

# Енкапсулация (3)

```text
Abstraction and encapsulation are complementary concepts: abstraction focuses on the observable behavior of an object... encapsulation focuses upon the implementation that gives rise to this behavior...

          Grady Booch
```

---

# How what about JavaScript?

---

# Почти всичко в JavaScript е обект

С изключение на:

* 1, 2, 3...
* true, false
* 'foo', 'bar', "baz"
* null
* undefined

```javascript
1.toString();
//Uncaught SyntaxError: Unexpected token ILLEGAL
```

---

# Можем да ги представим като обект...

```javascript
(1).toString(); //'1'

var answer = 42;
answer.toString(); //'42'

var foo = null;
foo.toString();
//TypeError: Cannot read property 'toString' of null
```

---

# В JavaScript няма класове, но има обекти...

=> JavaScript не е обектно-ориентиран?

---

# ООП

```text
Object-oriented programming (OOP) is a programming paradigm that represents the concept of "objects" that have data fields (attributes that describe the object) and associated procedures known as methods.
```

=> JavaScript е обектно-ориентиран?


---

* Абстракция
* Енкапсулация
* Наследяване
* Полиморфизъм

Са основни характеристики на език за обектно-ориентирано програмиране.
=> Ако език за програмиране притежава тези характеристики е ОО?

---

# Objet literal синтаксис

```JavaScript
var obj = {};
obj.name = 'foo';
obj.getName = function () {
  return this.name;
};

obj.getName(); //'foo'

var obj = {
  name: 'foo',
  getName: function () {
    return this.name;
  }
};

obj.getName(); //'foo'
```

---

# Прототипно наследяване

Характерно за езици като:

* Self
* Io
* ...JavaScript

---

# Прототипно наследяване

```JavaScript
var parent = {
  name: 'foo',
  getName: function () {
    return this.name;
  }
};

var child = {
  age: 42,
  getAge: function () {
    return this.age;
  }
};

Object.setPrototypeOf(child, parent);
```

---

# Мислете за структура подобна на свързан списък

```text

+--------+    +-------+
|   C1   |    |   C2  |
+--------+    +-------+
| proto  |    | proto |
+--------+-+--+-------+
           |
           |
       +---v----+
       |   C0   |
       +--------+
       | proto  |
       +---+----+
           |
           |
       +---v----+
       |    P   |
       +--------+
       | proto  |
       +--------+
```
---
# Можем да пресъздадем горния пример и като:

```JavaScript
var parent = {
  name: 'foo',
  getName: function () {
    return this.name;
  }
};

var child = Object.create(parent);
child.age = 42;
child.getAge = function () {
  return this.age;
};
```

---

# "Класове"

Класът е шаблон, по който можем да създадем обектни, които да притежават специфични характеристики.

В JavaScript имаме функции:

```JavaScript
function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};

function Developer(age, name) {
  Person.call(this, name);
  this.age = age;
}

Developer.prototype = Object.create(Person.prototype);

Developer.prototype.getAge = function () {
  return this.age;
};

var dev = new Developer(42, 'foo');
```

---

# Какво ново видяхме в примера от предишния слайд:

* Оператора `new`
* Изпокзвайки полета (properties) и методи на функции

---

# Операторът new

Операторът `new` няма НИЩО (почти) общо с това, което той означава в езици, в които сте свикнали да го виждате (Java, C#, PHP, C++...).

new извиква дадена функция с контекст (`this`), нов обект, който ще бъде върнат от функцията, след като тялото и бъде изпълнено.

```JavaScript
function Person(foo) {
  this.name = 42;
  this.bar = foo;
}

var p = new Person('baz');
p.name === 42;
p.bar  === 'baz';
```
**Не е нужно експлицитно връщане на дадения контекст!**
**При извикване на функция с new, return е безсмислен!**

---

# Всяка функция притежава поле prototype

Полето prototype задава прототип на всички обекти създадени посредством извикване на дадената функция с оператора `new`.

---

# Нека разгледаме примера по-подробно...

```JavaScript
// Дефинира конструкторна функция
function Person(name) {
  // Добавя property name към всеки обект създаден
  // чрез извикване на Person с оператора new
  this.name = name;
}

// По подразбиране Person.prorotype е обект
// Добавяме метод getName към този обект, което означава,
// че всеки обект създаден чрез извикване на Person с new
// ще притежава метод getName в своя прототип.
Person.prototype.getName = function () {
  return this.name;
};
```

---

```JavaScript
function Developer(age, name) {
  // Извиква функцията Person с контекст (this)
  // обектът, който ще бъде върнат от тази функция след
  // извикването и с new. Това ще добави полето name
  // на обектът, който ще бъде върнат от Developer
  Person.call(this, name);
  this.age = age;
}

// Задава прототип на всички обекти създадени посредством
// извикване на Developer с new. Прототипът ще бъде
// обект, чиито прототип е прототипът на обектите създадени чрез
// извикване на Person с new.
Developer.prototype = Object.create(Person.prototype);
```
