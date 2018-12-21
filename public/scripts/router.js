// route-config.js
angular
  .module('myApp')
  .config(config);

config.$inject = ['$routeProvider'];

function config($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'partials/login.partial.html',
      controller: 'myCtrl',
      controllerAs: 'vm'
    })  
    .when('/register', {
      templateUrl: 'partials/register.partial.html',
      controller: 'myCtrl',
      controllerAs: 'vm'
    }) 
    .when('/data', {
      templateUrl: 'partials/apiGet.partial.html',
      controller: 'myCtrl',
      controllerAs: 'vm'
    })
    .when('/blog', {
      templateUrl: 'partials/blog.partial.html',
      controller: 'myCtrl',
      controllerAs: 'vm'
    })     
    .otherwise({
      templateUrl : 'partials/404.partial.html',
      controller: 'myCtrl',
      controllerAs: 'vm'
    });

  }