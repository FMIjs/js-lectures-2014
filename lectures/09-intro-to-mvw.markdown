# Въведение в MVW с Backbone.js

---

## Съдържание

- Single-page applications
- Какво е MVW?
- Защо MVW ни е нужно?
- MVC
- MVW frameworks
- Backbone
  - Event
  - View
  - Model
  - Collection
  - Router

---

## RIA (Rich Internet Application)

“A rich Internet application (RIA) is a Web application that has many of the characteristics of desktop application software, typically delivered by way of a site-specific browser, a browser plug-in, an independent sandbox, extensive use of JavaScript, or a virtual machine.”

---

## Single-Page Application

“A single-page application (SPA), also known as single-page interface (SPI), is a web application or web site that fits on a single web page with the goal of providing a more fluid user experience akin to a desktop application.”

- Зареждане на цялото съдържание при първото зареждане на страницата
- Зареждане на съдържанието инкрементално

---

## Нищо повече от...

![](./img/http.png)

---

## Проблеми при големите JavaScript приложения

- JavaScript е weakly typed
- JavaScript не притежава класове (да, дори след ES6)
- Тестваемост
- Спагети код
- Повтаряща се логика
- И др.

---

## MVW

---

### Model View Controller

### Model View Presenter Model View View-Model

### Model View **Whatever**

---

![](./img/mvw.png)

---

![](./img/mvw2.png)

---

## Защо MVW?

---

![](./img/separation-of-concerns.png)

---

## MVC

---

## Model View Controller

- Първоначално въведен в SmallTalk-80
- Използва се в:
  - Ruby on Rails
  - ASP.NET MVC
  - *Django*
  - *Backbone*
  - много други...

---

## MVC (server-side)

![](./img/mvc-server-side.png)

---

![](./img/backbone.gif)

---

## MVC в шаблони за дизайн

Според "Gang of Four" MVC не е нищо повече от:

- Observer
- Strategy
- Composite

---

## Strategy

В програмирането, шаблонът за дизайн стратегия
позволява поведението на
даден алгоритъм да бъде избирано в процеса на изпълнение.
Стратегията:

- дефинира фамилия от алгоритми
- енкапсулира отделните алгоритми
- прави алгоритмите взаимозаменяеми

---

![](./img/strategy.svg)

---

## Composite

Композицията е структурен шаблон за дизайн.
Композицията ни позволява да третираме група обекти
от даден тип, посъщия начин, по който третираме
единични обекти. Целта на композицията е да представи
композиция от обекти в дървовидна структура.

---

![](./img/composite.svg)

---

## Observer

Наблюдателят е шаблон за дизайна, който ни позволява
да се справим с coupling между обекти (зависимости).
Правилното използване на наблюдателя може да доведе до
по-добро разделяне на отговорностите.
В този шаблон за дизайн имаме два типа обекти:

- Наблюдаван обект (subject)
- Наблюдател (observer)

Наблюдаваният обект пази референция към колекция от
наблюдатели. При настъпване на промяна в
наблюдавания обект, наблюдателите реагират на
промяната и съобщават за нея.

---

![](./img/observer.svg)

---

## Библиотека vs framework

- Библиотеката предоставя множество от фукнционалности.
Потребителят на библиотеката, може да използва тези
фукнционалности в своето приложение (примиер за
библиотеки са jQuery, Underscore).
- Framework предоставя основа за изграждането на
фамилия от приложения. Потребителят на framework, може
да го използва като основа за изграждането на своето
приложение (примери AngularJS, Backbone.js, Ember.js).
  - Преизползване на функционалност
  - Преизползване на микро-архитектура

---

## Как различните frameworks ни помагат?

- Справяме се с повторенията
  - Предоставят ни примитиви за компоненти
  - Продоставят ни начин за комуникация между компонентите
- По-лесно преизползване на вече изградени компоненти
- Повишават нивото на абстракция
- Тестваемост
- Имплицитни конвенции

---

## Няколко JavaScript frameworks...

---

- Backbone.js 
- AngularJS 
- Ember.js 
- KnockoutJS 
- Dojo 
- YUI 
- Agility.js 
- Knockback.js 
- CanJS 
- Maria 
- Polymer 

---

- React 
- cujoJS
- Montage
- Sammy.js 
- Stapes 
- Epitome 
- soma.js
- DUEL
- Kendo UI 
- PureMVC 
- Olives

---

## и още няколко...

---

- PlastronJS 
- Dijon
- rAppid.js 
- Aria Templates 
- SAPUI5 
- Exoskeleton 
- Atma.js 
- Ractive.js
- ComponentJS 
- Vue.js 

---

## Backbone.js

---

> Backbone.js gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface.”

---

## Backbone.js

- Минималистичен (6.5kb gziped & minified)
- Backbone.js зависи от
  - Underscore (или друга библиотека имплементираща интерфейса)
  - jQuery/Zepto (или друга библиотека имплементираща интерфейса им)

---

## Компоненти на Backbone.js

- Events
- Views
- Models
- Collections
- Router

---

## Backbone.Events

---

```javascript
var obj = $.extend({}, Backbone.Events);

obj.on('event', function () {
  console.log(42);
});

obj.on('event', function () {
  console.log(1.618);
});

obj.trigger('event');
```

---

## Backbone.View

---

```javascript

/* global Backbone, $ */

var GitHubApp = GitHubApp || {};

GitHubApp.Views = GitHubApp.Views || {};

GitHubApp.Views.Home = Backbone.View.extend({
  events: {
    'click #add-btn'   : 'addUser',
    'click .delete-btn': 'removeUser'
  },

  initialize: function () {
    'use strict';
    this.model.on('change', this.render, this);
  },

  addUser: function () {},

  removeUser: function (e) {},

  render: function () {}
});
```

---

```javascript

var View = Backbone.View.extend({
  el: '#parent',
  template: _.template('<%= name %>'),
  render: function () {
    this.$el.html(this.template(this.model));
    return this;
  }
});

var v = new View({
  model: {
    name: 'foo'
  }
});
v.render();

```

---

## Backbone.Model

---

```javascript
var Developer = Backbone.Model.extend({
  defaults: {
    name     : 'foo',
    languages: ['JavaScript', 'Ruby', 'Perl'],
    age      : 42
  },
  initialize: function () {
    console.log('Do some initialisation stuff');
  },
  incrementAge: function () {
    this.set('age', this.get('age') + 1);
  }
});

```

---

```javascript
var dev = new Developer({
  name: 'bar'
});

dev.on('change', function (e) {
  console.log(Object.keys(e.changed)
    .toString(), 'changed');
});

dev.incrementAge();
```

---

```javascript
var Developer = Backbone.Model.extend({
  url: function () {
    return 'https://api.github.com/users/' +
           this.get('name');
  }
});

var dev = new Developer({
  name: 'mgechev'
});

dev.fetch();
//GET https://api.github.com/users/mgechev
```

---

## Backbone.Collection

---

```javascript

/* global Backbone */

var GitHubApp = GitHubApp || {};

GitHubApp.Models = GitHubApp.Models || {};

GitHubApp.Models.UserCollection = Backbone.Collection.extend({
  model: GitHubApp.Models.User
});

var collection = new GitHubApp.Models.UserCollection();

collection.on('add', function () {
  console.log('User added');
});

collection.on('remove', function () {
  console.log('User removed');
});

var user = new User();

collection.add(user);
collection.remove(user);
```

---

## Backbone.Router

---

```javascript

/* global Backbone, $ */

var GitHubApp = GitHubApp || {};

var GitHubAppRouter = Backbone.Router.extend({
  routes: {
    ''              : 'home',
    'user/:username': 'user',
    'statistics'    : 'stats'
  },
  initialize: function () {},
  home: function () {},
  user: function (login) {},
  stats: function () {}
});

GitHubApp.router = new GitHubAppRouter();

Backbone.history.start();
```

