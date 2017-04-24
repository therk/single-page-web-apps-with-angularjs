(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig)
  .run(function ($rootScope) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
      console.error(error);
    });
  });

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/templates/home.html'
    })
    .state('categories', {
      url: '/categories',
      template: '<categories categories="menuCtrl.categories"/>',
      controller: 'MenuController as menuCtrl',
      resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })
    .state('items', {
      url: '/category-items/{id}',
      template: '<items items="menuItemsCtrl.items"/>',
      controller: 'MenuItemsController as menuItemsCtrl',
      resolve: {
        items: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
          return MenuDataService.getItemsForCategory($stateParams.id);
        }]
      }
    });
  }
})();
