angular.module('todoApp').
  factory('LocalStorage', function () {
    'use strict';
    var data = JSON.parse(localStorage.getItem('storage') || '{}');
    return {
      save: function (key, val) {
        data[key] = val;
        localStorage.setItem('storage',
          JSON.stringify(data));
      },
      get: function (key) {
        return data[key];
      }
    };
  });
