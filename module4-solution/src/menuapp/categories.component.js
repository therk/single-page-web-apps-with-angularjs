(function () {
  angular.module('MenuApp')
  .component('categories', {
    templateUrl: 'src/templates/categories.html',
    bindings: {
      categories: '<'
    }
  });
})();
