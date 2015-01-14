angular.module('todoApp').
  controller('TodoCtrl', function TodoCtrl($scope) {
    'use strict';

    /*
    {
      "title": "Buy milk",
      "completed": false|true
    }
    */

    $scope.todos = JSON.parse(localStorage.getItem('todos') || '[]');
    $scope.add = function () {
      if ($scope.current) {
        $scope.todos.push({
          title: $scope.current,
          completed: false
        });
        $scope.current = '';
        localStorage.setItem('todos', JSON.stringify($scope.todos));
      }
    };

    $scope.remove = function (index) {
      $scope.todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify($scope.todos));
    };
  });
