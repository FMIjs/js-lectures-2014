var bigArray = require('./big-array'),
    result = [];

bigArray.map(function (v) {
  return v + v;
});
