(function() {
  'use strict';

  angular.module('myApp', [])
  .controller('MyController', MyController);

  function MyController ($scope, $filter, $injector) {
    $scope.name = "Test";

    $scope.upper = function () {
      var upCase = $filter('uppercase');
      $scope.name = upCase($scope.name);
    };

    console.log($injector);
  }
})();
