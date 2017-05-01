(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'http://murmuring-headland-82265.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
