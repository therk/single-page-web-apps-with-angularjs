(function () {
  'use strict';

  angular.module('Data')
  .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http) {
    this.getAllCategories = function() {
      return $http({
         method: 'GET',
         url: 'https://davids-restaurant.herokuapp.com/categories.json'
       })
       .then(function (results) {
         return results.data;
       });
    };

    this.getItemsForCategory = function (categoryShortName) {
      return $http({
        method: 'GET',
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
        params: {
          category: categoryShortName
        }
      })
      .then(function (results) {
        return results.data.menu_items;
      })
    };
  }
})();
