(function() {
  'use strict';

  function CustomFilterFactory() {
    return function (input) {
      return input.toUpperCase() + "!";
    }
  };

  function ReplaceFilterFactory() {
    return function (input, from, to) {
      input = input || "";
      return input.replace(from, to);
    }
  };

  var list1 = ['One', 'Two', 'Three'];
  var list2 = [
    {number: 1, name: 'One'},
    {number: 2, name: 'Two'},
    {number: 3, name: 'Three'}
  ];

  angular.module('myApp', [])
  .controller('MyController', MyController)
  .filter('custom', CustomFilterFactory)
  .filter('replace', ReplaceFilterFactory);

  MyController.$inject = ['$scope', '$filter', 'customFilter'];
  function MyController ($scope, $filter, customFilter) {
    $scope.name = "Test";
    $scope.cost = "1000";
    $scope.counter = 0;
    $scope.oneTime = "One";
    $scope.list1 = list1;
    $scope.list2 = list2;


    $scope.upper = function () {
      $scope.name = customFilter($scope.name);
    };

    $scope.checkClick = function () {
      console.log("# of watchers: ", $scope.$$watchersCount);
    }

    $scope.upCounter = function() {
      setTimeout(function() {
        $scope.$apply(function() {
          $scope.counter++;
          $scope.oneTime = "Two";
          console.log("Counter incrimented");
        });

        //$scope.$digest(); triggers digest loop
      }, 2000);

    };

    $scope.$watch('counter', function (newValue, oldValue){
      console.log("counter old value:", oldValue);
      console.log("counter new value:", newValue);
    });

    $scope.$watch(function() {
      console.log("Digest Loop Fired");
    });
  }
})();
