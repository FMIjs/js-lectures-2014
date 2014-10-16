var bigArray = require('./big-array'),
    result = [],
    v,
    i,
    l;

for (i = 0, l = bigArray.length; i < l; i ++) {
  v = bigArray[i];
  result[i] = v + v;
}
