(function () {
  'use strict';
  angular.module('public').
  controller('NewsletterController', NewsletterController);

  NewsletterController.$inject = ['NewsletterService'];
  function NewsletterController(NewsletterService) {
    var ctrl = this;
    ctrl.firstName = "";
    ctrl.lastName = "";
    ctrl.email = "";
    ctrl.phone = "";
    ctrl.menuNumber = "";
    ctrl.invalidMenuNumber = false;
    ctrl.info = NewsletterService.getInfo();
    ctrl.message = "";


    ctrl.signup = function () {
      NewsletterService.getMenuItem(ctrl.menuNumber)
      .success(function (menuItem) {
        NewsletterService.setInfo(ctrl.firstName,
          ctrl.lastName,
          ctrl.email,
          ctrl.phone,
          ctrl.menuNumber,
          menuItem);
          ctrl.message = "Your information has been saved.";
          ctrl.invalidMenuNumber = false;
      }).catch(function (error) {
        ctrl.invalidMenuNumber = true;
      });

    };
  }
})();
