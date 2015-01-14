angular.module('todoApp').
  controller('TodoCtrl', function TodoCtrl($scope, TodoCollection, Todo) {
    'use strict';

    $scope.collection = TodoCollection;

    $scope.$watch('collection', function () {
      $scope.collection.save();
    }, true);

    $scope.add = function () {
      if ($scope.current) {
        TodoCollection.addTodo(new Todo($scope.current));
        $scope.current = '';
      }
    };

    $scope.remove = function (todo) {
      TodoCollection.removeTodo(todo);
    };
  });
