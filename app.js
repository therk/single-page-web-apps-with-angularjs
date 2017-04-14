(function() {
    'use strict';

    angular.module('myApp', [])
        .controller('MyController', MyController)
        .controller('ChildController', ChildController)
        .controller('ListAddController', ListAddController)
        .controller('ListShowController', ListShowController)
        .service('ValidationService', ValidationService)
        .service('MenuService', MenuService)
        .provider('ListService', ListServiceProvider)
        .directive('listItemDescription', listItemDescription)
        .directive('indexedNameItem', indexedNameItem)
        .directive('listItem', ListItem)
        .config(Config)
        .filter('custom', CustomFilterFactory)
        .filter('replace', ReplaceFilterFactory);

    function ListItem() {
      var ddo = {
        restrict: "E",
        templateUrl: 'listItem.html'
      };
      return ddo;
    }
    function indexedNameItem() {
      return {
        template: '{{prefix}}: {{item.number}} is {{item.name}}',
        scope: {
          item: '=item',
          prefix: '@prefix'
        }
      };
    }
    function listItemDescription() {
      return {
        template: '{{ item.quantity }} of {{item.name }}'
      }
    }
    MenuService.$inject = ['$http'];
    function MenuService($http) {
      this.getMenuCategories = function () {
        return $http({
          method: "GET",
          url: "http://davids-restaurant.herokuapp.com/categories.json"
        });
      }
    }
    ValidationService.$inject = ['$q', '$timeout'];
    function ValidationService($q, $timeout) {

      var result = {
        message: ""
      };

      this.checkName = function (name) {
        var deffered = $q.defer();

        $timeout(function() {
          if (name.toLowerCase().indexOf('test') === -1) {
            deffered.resolve(result);
          }else {
            result.message = "This is just a test!";
            deffered.reject(result);
          }
        }, 3000);

        return deffered.promise;
      }

      this.checkQuantity = function (quantity) {
        var deffered = $q.defer();
        $timeout(function () {
          if (quantity > 5) {
            result.message = "Too much!";
            deffered.reject(result);
          } else {
            deffered.resolve(result);
          }
        }, 1000);
        return deffered.promise;
      }
    }

    ListAddController.$inject = ['$q', 'ListService', 'ValidationService'];
    function ListAddController($q, ListService, ValidationService) {
        var list = this;
        list.addItem = function() {
          var nameCheck =  ValidationService.checkName(list.itemName);
          var quantityCheck = ValidationService.checkQuantity(list.itemQuantity);

          $q.all([nameCheck, quantityCheck])
            .then(function (result) {
                console.log("Got Results");
                ListService.addItem(list.itemName, list.itemQuantity);
            })
            .catch(function (result) {
                console.log(result.message);
                list.errorMessage = result.message;
            });
        }
    }

    function CustomFilterFactory() {
        return function(input) {
            return input.toUpperCase() + "!";
        }
    };

    function ReplaceFilterFactory() {
        return function(input, from, to) {
            input = input || "";
            return input.replace(from, to);
        }
    };

    var list1 = ['One', 'Two', 'Three'];
    var list2 = [{
            number: 1,
            name: 'One'
        },
        {
            number: 2,
            name: 'Two'
        },
        {
            number: 3,
            name: 'Three'
        }
    ];

    Config.$inject = ['ListServiceProvider'];

    function Config(ListServiceProvider) {
        ListServiceProvider.defaults.maxItems = 2;
    }

    function ListServiceProvider() {
        this.defaults = {
            maxItems: 10
        }

        this.$get = function() {
            var list = new ListService(this.defaults.maxItems);

            return list;
        };
    };

    function ListService(maxItems) {
        var items = [];

        this.addItem = function(name, quantity) {

            if ((maxItems === undefined) ||
                (maxItems !== undefined) && (items.length < maxItems)) {
                items.push({
                    name: name,
                    quantity: quantity
                });
            } else {
                throw new Error("Max items (" + maxItems + ") reached.");
            }

        }

        this.getItems = function() {
            return items;
        }

        this.deleteItem = function(index) {
            items.splice(index, 1);
        };

    }

    ListShowController.$inject = ['ListService', 'MenuService'];
    function ListShowController(ListService, MenuService) {
        var listShow = this;
        this.items = ListService.getItems();

        this.deleteItem = function(index) {
            ListService.deleteItem(index);
        };

        MenuService.getMenuCategories()
        .then(function (response) {
          console.log(response);
          listShow.menuItems = response.data;
        })
        .catch(function (error){
          console.log(error);
        });

    }

    MyController.$inject = ['$scope', '$filter', 'customFilter'];
    function MyController($scope, $filter, customFilter) {
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

        $scope.upper = function() {
            $scope.name = customFilter($scope.name);
        };

        $scope.checkClick = function() {
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

        $scope.$watch('counter', function(newValue, oldValue) {
            console.log("counter old value:", oldValue);
            console.log("counter new value:", newValue);
        });

        $scope.$watch(function() {
            console.log("Digest Loop Fired");
        });
    };

    function ChildController() {

    };
})();
