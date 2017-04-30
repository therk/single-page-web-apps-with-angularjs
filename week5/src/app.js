(function () {
  'use strict';

  angular.module('MyApp', [])
  .controller('FormController', FormController)
  .directive('itemList', ItemList);

  FormController.$inject = ['MyService'];
  function FormController(MyService) {
    var ctrl = this;
    ctrl.name = "";
    ctrl.errorMessage = "";
    ctrl.doSomething = function () {
      try {
        ctrl.name = MyService.getSomething(ctrl.name);
      } catch(err) {
        ctrl.errorMessage = err.message;
      }
    };
  };

  function ItemList() {
    return {
      templateUrl: 'src/itemList.html',
      scope: {
        list: '=myList',
        title: '@title'
      }
    }
  }

})();
