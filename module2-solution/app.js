(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  function ShoppingListCheckOffService() {
    this.toBuy = [
      {name: 'Cookies', quantity: 10},
      {name: 'Eggs', quantity: 12},
      {name: 'Onions', quantity: 2},
      {name: 'Apples', quantity: 20},
      {name: 'Salad', quantity: 1}
    ];

    this.alreadyBought = [];

    this.Bought = function(index) {
      this.alreadyBought.push(this.toBuy[index]);
      this.toBuy.splice(index, 1);
    }

  };

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(service) {
    this.toBuy = service.toBuy;
    this.Bought = function(index) {
      service.Bought(index);
    };
  };

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(service) {
    this.alreadyBought = service.alreadyBought;

  };

})();
