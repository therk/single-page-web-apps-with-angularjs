(function () {
  'use strict';

  angular.module('MyApp', [])
  .controller('FormController', FormController);

  function FormController() {
    this.name = "";
  }

})();
