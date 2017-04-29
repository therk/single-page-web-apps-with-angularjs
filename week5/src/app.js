(function () {
  'use strict';

  angular.module('MyApp', [])
  .controller('FormController', FormController);

  FormController.$inject = ['MyService'];
  function FormController(MyService) {
    var ctrl = this;
    ctrl.name = "";
    ctrl.doSomething = function () {
      ctrl.name = ctrl.name + MyService.getSomething();
    };
  }

})();
