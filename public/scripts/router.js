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
    .when('/apirestricted', {
      templateUrl: 'partials/apiPost.partial.html',
      controller: 'myCtrl',
      controllerAs: 'vm'
    }) 
    .when('/data', {
      templateUrl: 'partials/apiGet.partial.html',
      controller: 'myCtrl',
      controllerAs: 'vm'
    })     
    .otherwise({
      templateUrl : "partials/404.partial.html",
      controller: 'myCtrl',
      controllerAs: 'vm'
    });


  }