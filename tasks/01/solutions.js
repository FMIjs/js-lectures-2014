/********************************
          Exercise 1
********************************/
// 0, 1, 1, 2, 3, 5, 8, 13...
function fib(n) {
  'use strict';
  var a = 0,
      b = 1,
      temp, i;
  if (n === 0) {
    return a;
  }
  if (n === 1) {
    return b;
  }
  for (i = 2; i < n; i += 1) {
    temp = b;
    b += a;
    a = temp;
  }
  return b;
}


/********************************
          Exercise 2
********************************/
// Reusing fib
// you can also create a version
// which doesn't compute fib(n) twice
function phiEstimation(n) {
  'use strict';
  return fib(n + 1) / fib(n);
}


/********************************
          Exercise 3
********************************/
// Initially you can start with ugly solution
function reverseWordsOrderInString(str) {
  'use strict';
  return str.split(' ').reverse().join(' ');
}


/********************************
          Exercise 4
********************************/
// Initially you can start with ugly iterative solution
function reverseWordsInString(str) {
  'use strict';
  function reverseWord(word) {
    return word.split('').reverse().join('');
  }
  return str.split(' ').map(reverseWord).join(' ');
}


/********************************
          Exercise 5
********************************/
// O(n)
function findNthNumber(arr, n, lo, hi) {
  'use strict';

  function partition(arr, lo, hi, pivotIdx) {
    function swap(arr, i, j) {
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    var pivot = arr[pivotIdx];
    swap(arr, pivotIdx, hi);
    for (var i = lo; i < hi; i += 1) {
      if (arr[i] < pivot) {
        swap(arr, i, lo);
        lo += 1;
      }
    }
    swap(arr, hi, lo);
    return lo;
  }

  if (arr.length <= n) {
    return NaN;
  }
  lo = lo || 0;
  hi = hi || arr.length - 1;
  if (lo === hi) {
    return arr[lo];
  }
  while (hi >= lo) {
    var pivotIdx =
    partition(arr, lo, hi, lo + Math.floor(Math.random() * (hi - lo + 1)));
    if (n === pivotIdx) {
      return arr[pivotIdx];
    }
    if (n < pivotIdx) {
      hi = pivotIdx - 1;
    } else {
      lo = pivotIdx + 1;
    }
  }
  return null;
}
