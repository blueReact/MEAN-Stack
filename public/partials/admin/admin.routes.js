// route-config.js
angular
  .module('myApp')
  .config(config);

config.$inject = ['$routeProvider'];

function config($routeProvider) {
  $routeProvider

    .when('/admin', {
      templateUrl: 'partials/admin/admin.partial.html',
      controller: 'adminCtrl',
      controllerAs: 'vm'
    });
}