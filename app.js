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
  .controller('ChildController', ChildController)
  .controller('ListAddController', ListAddController)
  .controller('ListShowController', ListShowController)
  .service('ListService', ListService)
  .filter('custom', CustomFilterFactory)
  .filter('replace', ReplaceFilterFactory);

  function ChildController() {
    this.name = "foo";
  }

  function ListService() {
      var items = [];

      this.addItem = function (name, quantity) {
        items.push({name: name, quantity: quantity});
      }

      this.getItems = function() {
        return items;
      }

  }

  ListAddController.$inject = ['ListService'];
  function ListAddController(ListService) {
    this.addItem = function() {
      ListService.addItem(this.itemName, this.itemQuantity);
    }
  }

  ListShowController.$inject = ['ListService'];
  function ListShowController(ListService) {
    this.items = ListService.getItems();
  }

  MyController.$inject = ['$scope', '$filter', 'customFilter'];
  function MyController ($scope, $filter, customFilter) {
    $scope.name = "Test";
    this.name = $scope.name;
    $scope.cost = "1000";
    $scope.counter = 0;
    $scope.oneTime = "One";
    $scope.list1 = list1;
    $scope.list2 = list2;

    $scope.addToList = function() {
      var newItem = {
        number: $scope.newItemNumber,
        name: $scope.newItemName
      }
      $scope.list2.push(newItem);
    }

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
