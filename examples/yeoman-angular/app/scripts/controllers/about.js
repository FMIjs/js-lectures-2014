'use strict';

/**
 * @ngdoc function
 * @name yeomanAngularApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yeomanAngularApp
 */
angular.module('yeomanAngularApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
