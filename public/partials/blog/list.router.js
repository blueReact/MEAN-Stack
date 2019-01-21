// route-config.js
angular
  .module('myApp')
  .config(config);

config.$inject = ['$routeProvider'];

function config($routeProvider) {
  $routeProvider
   
    .when('/list', {
      templateUrl: 'partials/blog/list.partial.html',
      controller: 'listCtrl',
      controllerAs: 'vm'
    })
    .when('/detail/:id', {
      templateUrl: 'partials/blog/detail.partial.html',
      controller: 'listCtrl',
      controllerAs: 'vm'
    }); 

  }