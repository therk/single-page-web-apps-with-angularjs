(function () {
  'use strict';

  angular.module('MyApp')
  .service('MyService', MyService);

  function MyService() {
    this.getSomething = function(value) {
      if(value === "error") {
        throw new Error("This is an error");
      }
      return value + "!";
    }
  };
})();
