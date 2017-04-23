(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('MenuItemsController', MenuItemsController);

  MenuItemsController.$inject = ['items'];
  function MenuItemsController(items) {
    this.items = items;
  }
})();
