// route-config.js
angular
  .module('myApp')
  .config(config);

config.$inject = ['$routeProvider'];

function config($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/main.partial.html',
      controller: 'myCtrl',
      controllerAs: 'vm'
    })    
    .otherwise({
      templateUrl : "partials/404.partial.html",
      controller: 'myCtrl',
      controllerAs: 'vm'
    });
}