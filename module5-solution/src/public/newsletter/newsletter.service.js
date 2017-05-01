(function () {
  'use strict';
  angular.module('public')
  .service('NewsletterService', NewsletterService);

  NewsletterService.$inject = ['$http', 'ApiPath'];
  function NewsletterService($http, ApiPath) {
    var info = {firstName: '',
                lastName: '',
                email: '',
                phone: '',
                menuNumber: '',
                menuItem: null
              };

    this.setInfo = function (firstName, lastName, email, phone, menuNumber, menuItem) {
        info.menuItem = menuItem;
        info.firstName = firstName;
        info.lastName = lastName;
        info.email = email;
        info.phone = phone;
        info.menuNumber = menuNumber;
    };

    this.getMenuItem = function(menuNumber) {
      return $http.get(ApiPath + '/menu_items/' + menuNumber + '.json', {});
    };

    this.getInfo = function () {
      return info;
    };
  };
})();
