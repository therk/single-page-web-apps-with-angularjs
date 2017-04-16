(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .directive('foundItems', FoundItems)
  .service('MenuSearchService', MenuSearchService);

  function FoundItems() {
    return {
      templateUrl: 'FoundItems.html',
      restrict: 'E',
      scope: {
        foundItems: '<',
        onRemove: '&'
      }
    };
  };

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var nidCtrl = this;
    nidCtrl.found = [];
    nidCtrl.searchTerm = "";
    nidCtrl.message = "";

    nidCtrl.getMatchedMenuItems = function() {
      nidCtrl.message = ""; // reset the message on every click

      if (nidCtrl.searchTerm.length === 0 ) {
        nidCtrl.message = "Please enter a search term";
        return;
      }

      MenuSearchService.getMatchedMenuItems(nidCtrl.searchTerm)
      .then(function(result){
        if (result.length > 0) {
          nidCtrl.found = result;
        } else {
          nidCtrl.message = "Nothing found";
        }
      })
      .catch(function(error) {
        nidCtrl.message = error;
        console.log(error);
      });
    };

    nidCtrl.removeItem = function(index) {
      nidCtrl.found.splice(index, 1);
    };
  };



  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    this.getMatchedMenuItems = function (searchTerm) {
      return getMenuItems().then(function (result) {
        var menuItems = result.data.menu_items;
        var matchedItems = [];
        for (var i=0; i < menuItems.length; i++) {
          var item = menuItems[i].name.toLowerCase();
          if (item.indexOf(searchTerm.toLowerCase()) >= 0){
            matchedItems.push(menuItems[i]);
          }
        }
        return matchedItems;
      });
    };

    function getMenuItems() {
      return $http(
        {
          url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
        });
    }
  };

})()
