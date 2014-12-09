// 1475

function fibMemoize (n) {
  var memoize = {};

  function helper(n) {
    if (n <= 1) {
      return 1;
    }

    if (!memoize[n]) {
      memoize[n] = helper(n-1) + helper(n-2);
    }
    return memoize[n];
  }

  return helper(n);
}

function fibWhile(n) {
  var a = 0,
      b = 1,
      counter = 0;

  while (counter < n) {
    b += a;
    a = b - a;
    counter++;
  }

  return b;
}
