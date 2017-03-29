(function() {
  'use strict';

  angular.module('LunchCheckApp', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.message = '';
    $scope.messageColor = '';
    $scope.lunchMenu = '';

    $scope.checkNumberOfDishes = function() {
      var count = getListCount($scope.lunchMenu);

      if (count == 0 ){
        $scope.message = "Please enter data first";
        $scope.messageColor = 'red';
      }else if(count <= 3) {
        $scope.message = "Enjoy!";
        $scope.messageColor = 'green';
      }else {
        $scope.message = "Too much!";
        $scope.messageColor = 'green';
      }
    };
  };

  function getListCount(string) {
    var list = string.split(",").filter(function(item){
      return (item != '' && !item.match(/^\s+$/));
    });
    return list.length;
  }

})();
