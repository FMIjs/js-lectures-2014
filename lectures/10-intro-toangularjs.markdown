<style>
code {
  overflow: auto;
}
</style>

## Съдържание

* Какво е SPA?
* Какво е AngularJS?
* Защо AngularJS?
* Как да си изградим CRUD приложение с AngularJS?
* Добри практики

---

### Какво е SPA?

> A single-page application (SPA), also known as single-page interface (SPI), is a web application or web site that fits on a single web page with the goal of providing a more fluid user experience akin to a desktop application.

---

### Какво е SPA?

*   Страницата не се презарежда след първоначалното ѝ зареждане
  *   Цялото приложение се зарежда при първото зареждане на страницата
  *   Различни ресурси се зареждат спрямо действията на потребителите (on demand)
---


### Проблеми при SPA

* Производителност
* Консистентност на данните
* Дизайн на приложението
* Повтарящ се код между разлияните приложения (boilerplates)
---

![](img/savior.png)

---

# MV*

---

### MVC, но не съвсем

![](img/lion.jpg)

---

### MV* frameworks

# Welcome to the jungle!

---


## MV* frameworks...

* CanJS
* Maria
* Polymer
* cujoJS
* dermis
* Montage
* Sammy.js

---

* AngularJS
* Ember.js
* KnockoutJS
* Dojo
* YUI
* Agility.js
* soma.js

---

* Backbone.js
* Knockback.js
* Olives
* PlastronJS
* Dijon
* rAppid.js
* Funnyface.js
---

![](img/waitforit.jpg)

---


* Strapes
* Epitome
* Ext.js
* DUEL
* Kendo UI
* PureMVC
* Aria Templates

* SAPTUI5
* React
* Aura.js
* ScaleApp
* Kernel.js
* Hydra.js
* Terrifically
---

### AngularJS ни помага с...

* Абстракция
* Dependency Injection

---

### ...да ви напомня за нещо?

Ако ви се използва

[AOP](https://github.com/mgechev/angular-aop)

![](img/spring-triangle.png)

---

### ...AngularJS ни продставя още...

* data-binding
* templating
* form validation
* routing
* reusable components
* testability

---

## CRUD с AngularJS

---

![](img/magic.jpg)

---

![](img/not-understand.jpg)

---

### Основни градивни елементи

*  Темплейти
*  Директиви - всички DOM манипулации се случват тук
*  Контролери - бизнес логиката за една страница
*  Филтри - форматиране на данните
*  Услуги - всичко останало

---

    <div class="spa-container">
      <svg xmlns="http://www.w3.org/2000/svg" height="600" width="600" xmlns:xlink="http://www.w3.org/1999/xlink">
        <image xlink:href="./img/separationofconcerns.jpg" width="600" height="600" x="0" y="0" z-index="1"></image>
        <path id="s1" d="M 0 0 600 600 " stroke-width="14" fill="none" stroke="red" z-index="200" style="visibility: visible; -webkit-transition: stroke-dashoffset 1s ease-in-out; transition: stroke-dashoffset 1s ease-in-out; stroke-dasharray: 848.528137207031px, 848.528137207031px; stroke-dashoffset: 0px;"></path>
        <path id="s2" d="M 600 0 0 600 " stroke-width="14" fill="none" stroke="red" z-index="200" style="visibility: visible; -webkit-transition: stroke-dashoffset 1s ease-in-out; transition: stroke-dashoffset 1s ease-in-out; stroke-dasharray: 848.528137207031px, 848.528137207031px; stroke-dashoffset: 0px;"></path>
      </svg>
    </div>
---

![](img/arch.png)

---

![](img/arch-view.png)

---

### Темплейти

```html
<div ng-app="">
    <form ng-hide="collection.split(',').length > 3">
      Въведи стойности разделени със запетая:
      <input type="text" ng-model="collection">
    </form>
    <p ng-show="collection.split(',').length > 3">
      Въведохте 3 стойности
    </p>
    <ul>
      <li ng-repeat="item in collection.split(',')" ng-show="item.length > 0">
          {{item | uppercase}}
      </li>
    </ul>
  </div>
```

---


### Темплейти

<iframe src="./examples/template.html" width="800" height="300" frameborder="0"></iframe>

---

### Темплейти

- **ng-app** - Задава базовия елемент на приложението
- **ng-hide/ng-show** - Показва/скрива елемент на базата на някакво условие
- **ng-model** - Създава двупосочен binding
- **ng-repeat** - Итерира по дадена колеция
- **{{ item | uppercase }}** - Създава еднопосочен binding и прилага филтър

---

 ### Темплейти

**ng-app, ng-hide, ng-show, ng-model** ще наричаме

 ### директиви

---

![](img/arch-directives.png)

---

### Директивите се изпозват за...

* всички DOM манипулации
* създаване на преизползваеми компоненти

---

### Директиви(те са)

* Мощни
* Полезни
* Сложни

---

### Мощни

* Учат HTML на нови неща
* Създават вътрешен DSL в HTML

---

### DSL

```html
 <modal draggable title="Register">
    <form action="" novalidate>
      <expander>
        <section title="Main">
          E-mail: <input type="email" /><br/>
          Password: <input type="password" />
        </section>
        <section title="Extra">
          Name: <input type="text" /><br/>
          Address: <input type="text" />
        </section>
      </expander>
      <input type="submit" value="Register" />
    </form>
  </modal>
```

---

![](img/w3c.png)

---

![](img/broken-heart.jpg)

---

### Декларация на директиви с:

* Атрибути - позволени са "data-", "x-" префикси
* Елементи
* Класове
* Коментари

---

```html
  <div data-modal data-draggable data-title="Register">
    <form action="" novalidate>
      <div data-expander>
        <section data-title="Main">
          E-mail: <input type="email" /><br/>
          Password: <input type="password" />
        </section>
        <section data-title="Extra">
          Name: <input type="text" /><br/>
          Address: <input type="text" />
        </section>
      </div>
      <input type="submit" value="Register" />
    </form>
  </div>
```

---

### Полезни

*   Отделят DOM манипулациите от бизнес логиката
*   Напълно декларативни темплейти
*   Удобни за създаване на преизползваеми компоненти

---

### Пример:

Липсвал ли ви е `blink` елементът?

...едва ли...

```html
angular.module('demo').directive('blink', function ($timeout) {

  var BLINK_DURATION = 500;

  function hideElement(el) {
    el.style.visibility = 'hidden';
    $timeout(function () {
      showElement(el);
    }, BLINK_DURATION);
  }

  function showElement(el) {
    el.style.visibility = 'visible';
    $timeout(function () {
      hideElement(el);
    }, BLINK_DURATION);
  }

  return {
    restrict: 'E',
    link: function (scope, el) {
      hideElement(el[0]);
    }
  };
});

```

---

 ### може да бъде използвана като:

```html
<blink>Blinking data</blink>
```

---

### Сложни

![](img/complex.jpg)

---

```html
var myModule = angular.module(...);

myModule.directive('directiveName', function factory(injectables) {
  var directiveDefinitionObject = {
    priority: 0,
    template: '<div></div>', // or // function(tElement, tAttrs) { ... },
    // or
    // templateUrl: 'directive.html', // or // function(tElement, tAttrs) { ... },
    replace: false,
    transclude: false,
    restrict: 'A',
    scope: false,
    controller: function($scope, $element, $attrs, $transclude, otherInjectables) { ... },
    require: 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink(scope, iElement, iAttrs, controller) { ... },
        post: function postLink(scope, iElement, iAttrs, controller) { ... }
      }
     // or
     // return function postLink( ... ) { ... }
    },
    // or
    // link: {
    //  pre: function preLink(scope, iElement, iAttrs, controller) { ... },
    //  post: function postLink(scope, iElement, iAttrs, controller) { ... }
    // }
    // or
    // link: function postLink( ... ) { ... }
  };
  return directiveDefinitionObject;
});
```

---

### Обикновено се използва:

```html
angular.module('myModule').directive('blink', function () {
  return function (scope, elem, attrs) {
    //add event listeners
  };
});
```

---

### Какво е scope?

> scope is an object that refers to the application model. It is an execution context for expressions. Scopes are arranged in hierarchical structure which mimic the DOM structure of the application. Scopes can watch expressions and propagate events.
---

![](img/scopes.png)

---

![](img/scopes-real.png)

---

![](img/arch-scope.png)

---

### AngularJS изрази

Наподобяващи JavaScript парчета код, които
се интерпретират от AngularJS в даден контекст. Примери:

*   1 + 2
*   foo.bar | uppercase
*   42 * 8 | currency

---

![](img/arch-controller.png)

---

### Контролери

    JavaScript функции, които добавят данни и поведение (behavior) към scope.

```html
function MainCtrl($scope, $location, Auth) {
  $scope.foo = 'My awesome data!';
  $scope.logout = function () {
    Auth.logout()
    .then(function () {
      $location.path('unauth');
    });
  };
}
```

---

### Задаване на контролер в темплейта

```html
<body ng-app ng-controller="BaseCtrl">
  <div ng-controller="MainCtrl">
    {{foo}}
    <button ng-click="doAwesomeThing()">GO!</button>
  </div>
</body>
```

Къде предполагате е дефиниран **doAwesomeThing**?

---

### Не използвайте:

```html
function MainCtrl(...) {
  ...
}
```

```JavaScript
angular.module('myModule').controller('MainCtrl', function (...) {
  ...
});
```

---

 ### Two-way binding

 AngularJS създава двупосочен binding между модела (полетата на scope) и изгледа (view).

  <iframe class="fragment visible" src="./examples/template.html" width="800" height="300" frameborder="0" data-fragment-index="1"></iframe>

---

### Dependency Injection

```html
function MainCtrl($scope, $location, Auth) { /* body */ }
```

* Автоматично възстановяване на зависимостите
* Спестява писане на излишен код
* Прави кода по-лесен за тестване
* Прави кода по-четим

---

![](img/arch-services.png)

---

 ### Услуги

> Singleton обекти, които носят в себе си функционалност необходима за извършването на чести дейности в едно уеб приложение.

---

### Могат да се използват за:

* XMLHttpRequest
* Работа с HTML5 File API
* ...и други.

---

### Предефинирани услуги

AngularJS предоставя две услуги на различни нива на абстрация, занимаващи се с XMLHttpRequest

* **$http**
* **$resource**

---

### $resource

```html
angular.module('myModule').factory('User', function ($resource) {
  return $resource('http://example.com/user/:id');
});

//...

function RegisterCtrl($scope, User) {
  if ($scope.form.isValid) {
    var user = new User({
      user: $scope.username,
      password: $scope.password,
      email: $scope.email
    });
    user.$save();
  }
}
```

---

![](img/heavy-loaded.jpg)

---

```
├── app
│   ├── app.js
│   ├── controllers
│   │   ├── page1
│   │   │   ├── FirstCtrl.js
│   │   │   └── SecondCtrl.js
│   │   └── page2
│   │       └── ThirdCtrl.js
│   ├── directives
│   │   ├── page1
│   │   │   └── directive1.js
│   │   └── page2
│   │       ├── directive2.js
│   │       └── directive3.js
│   ├── filters
│   │   ├── page1
│   │   └── page2
│   └── services
│       ├── CommonService.js
│       ├── cache
│       │   ├── Cache1.js
│       │   └── Cache2.js
│       └── models
│           ├── Model1.js
│           └── Model2.js
├── lib
└── test
```

---

### [Добри практики](https://github.com/mgechev/angularjs-style-guide)

---

## Благодаря за вниманието!
