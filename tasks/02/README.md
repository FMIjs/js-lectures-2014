# Задача 1

`function iterator(array, stopIteration)`, която прави същото като `range`, но обхождайки подадения **Array-like** обект.

---

# Задача 2
### `rangeMap`


```javascript
> var doubled = rangeMap(1, 3, function (item) { return item + item });
> console.log(doubled)
[2, 4, 6]
```

---

# Задача 3
### 'опаковка'

Да се напише функция `getWrap(w)`, която по зададен аргумент връща друга функция `res(text)`, която при извикването си дава резултат конкатенация от вида :

```
> getWrap('a')('thingie')
'<a>thingie</a>'
```

---

# Задача 4
### 'опаковка 2'

Да се напише функция `getWrappers(arr)`, която получава списък от символни низове и използва `getWrap(w)` от зад.1, за да генерира масив от функции.

---

# Задача 5
### безкраен генератор

Да се напише функция `arithmeticProgression()`. Тя трябва да търси полетата `start` и `step` в `this` обекта си и на базата на тях да връща функция, която при всяко следващо извикване връща следващия член на аритметична прогресия със съответните начало и стъпка.

```javascript
> var context = {start: 0, step: 2};
> var boundArithmeticProgression = arithmeticProgression.bind(context);
> var twoStep = boundArithmeticProgression();
> twoStep()
0
> twoStep()
2
> twoStep()
4
```

Веднъж конструирана една функция **не трябва да променя поведението си**. Промените в контекста трябва да се отразяват само на функциите генерирани след тези промени.

```javascript
> context.step = 15;
> twoStep()
6
```
