(function () {
  'use strict';

  // articles.controller.js
  angular
    .module('myApp')
    .controller('myCtrl', myCtrl);

  myCtrl.$inject = ['$scope', '$rootScope', '$http', '$location', '$cookies'];

  function myCtrl($scope, $rootScope, $http, $location, $cookies) {

    var vm = this;    
    vm.fourNotFour = "404";

    var token = "Bearer" + " " + localStorage.getItem("JWT");
    // console.log(token);

    // global and runs everytime
    $rootScope.admin =localStorage.getItem("admin");
    $rootScope.isLoggedIn =localStorage.getItem("isLoggedIn");
    console.log($rootScope.admin);

    // checking if I can get the cookiename

    var favouriteCookie = $cookies.get('username')
    console.log(favouriteCookie);

    // login
    vm.login = function () {
      $http({
        method: 'post',
        url: '/login',
        data: vm.user,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      }).then(function (response) {
          vm.response = response.data;
           console.log(vm.response);
           
          localStorage.setItem("JWT", vm.response.token)
          localStorage.setItem("admin", vm.response.admin)
          localStorage.setItem("isLoggedIn", vm.response.isLoggedIn)
          $location.path("/data")
        })
        .catch(function (err) {
          console.log(err)
        });
    }

    // logout
    vm.logout = function () {
      $http.post('/logout', vm.user).then(function (response) {
          vm.response = response.data;
          console.log(vm.response);  
        })
        .catch(function (err) {
          console.log(err);
          if(err.status === 555) {
            vm.clearLocalStorage();
            $cookies.remove('username');
            $location.path("/login");
          }
        });
    }
    
    

    // restricted User
    vm.registerUser = function () {
      console.log(vm.register);
      $http({
          method: 'POST',
          url: '/register/api',
          data: vm.register,
          headers: {
            'Content-Type': 'application/json'           
          }
        })
        .then(function (response) {
          vm.response = response.data;
          $location.path("/login");
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    // http GET
    // var token3rdparty = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidHl1aSIsInBhc3N3b3JkIjoidHl1aSJ9LCJpYXQiOjE1NDI1NDczMTN9.46o8a-2ksgGpXhco0w-ljm-meCkbgFWWBzZefVfseoc';
   
    $http({
        method: 'get',
        url: '/data',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })
      .then(function (response) {
        console.log(response);
        vm.response = response.data;
      })
      .catch(function (err) {
        console.log(err);
      });


      // to clear specific local storage based on key i.e JWT in this case
      vm.clearLocalStorage = function(){
        window.localStorage.removeItem("JWT");
        window.localStorage.removeItem("admin");
        window.localStorage.removeItem("isLoggedIn");
      }

  };

})();