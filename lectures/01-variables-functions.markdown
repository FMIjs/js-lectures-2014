# variables, functions, linting

---

# променливи

```javascript
    > a = 5 // BAD
    5
    > b = 7; // BAD
    7
    > var c = 43 // meeeeeeeh... aaaalmost
    undefined
    > var d = 42; // GOOD
    undefined
```

---

# типове „неща“
## числа

```javascript
    > var low_boundary = 9000;
    undefined
    > typeof low_boundary
    'number'
    > var pi = 3.14;
    undefined
    > typeof pi
    'number'
```

---
# типове „неща“
## низове

```javascript
    > var name = 'Pencho';
```

съвсем същото като

```javascript
    > var name = "Pencho";
```

---
# типове „неща“
## низове

```javascript
    > var name = 'Pen\ncho';
```

съвсем същото като

```javascript
    > var name = "Pen\ncho";
```

---
# типове „неща“
## списъци

```javascript
    > var team = ['Joro', 'Minko', 'Evgeni'];
    undefined
    > team.length
    3
    > team[0]
    'Joro'
    > team[1]
    'Minko'
    > team[-1]
    undefined
```

---
# типове „неща“
## обекти

```javascript
    > var panda = {name: 'Стамат', age: 12, cuteness: 9000.001 };
    undefined
    > panda
    { name: 'Стамат',
      age: 12,
      cuteness: 9000.001 }
    > panda.name
    'Стамат'
```
