angular.module('todoApp')
  .factory('Todo', function Todo() {
    'use strict';

    function Todo(title) {
      this.title = title;
      this.completed = false;
    }

    return Todo;
  });
