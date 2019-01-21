// route-config.js
angular
  .module('myApp')
  .config(config);

config.$inject = ['$routeProvider'];

function config($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/user/login.partial.html',
      controller: 'userCtrl',
      controllerAs: 'vm'
    })  
    .when('/register', {
      templateUrl: 'partials/user/register.partial.html',
      controller: 'userCtrl',
      controllerAs: 'vm'
    })     
    .when('/reset', {
      templateUrl: 'partials/user/reset.partial.html',
      controller: 'userCtrl',
      controllerAs: 'vm'
    });

  }