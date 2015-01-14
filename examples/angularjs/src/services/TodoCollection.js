angular.module('todoApp')
  .service('TodoCollection', function TodoCollection(LocalStorage) {
    'use strict';

    this.todos = LocalStorage.get('todos') || [];

    this.addTodo = function (todo) {
      this.todos.push(todo);
      this.save();
    };

    this.removeTodo = function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
      this.save();
    };

    this.save = function () {
      LocalStorage.save('todos', this.todos);
    };

  });
