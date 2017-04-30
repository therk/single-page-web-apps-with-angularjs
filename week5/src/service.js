(function () {
  'use strict';

  angular.module('MyApp')
  .service('MyService', MyService);

  MyService.$inject = ['$http']
  function MyService($http) {
    this.getSomething = function(value) {
      if(value === "error") {
        throw new Error("This is an error");
      }
      return value + "!";
    }

    this.getCategories = function () {
      return $http({
        method: "GET",
        url: "http://davids-restaurant.herokuapp.com/categories.json"
      });
    };
  };
})();
