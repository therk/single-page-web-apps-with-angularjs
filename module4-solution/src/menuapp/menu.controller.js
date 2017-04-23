(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('MenuController', MenuController);

  MenuController.$inject = ['categories'];
  function MenuController(categories) {
    this.categories = categories;
  }
})();
