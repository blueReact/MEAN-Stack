(function () {
  "use strict";

  // articles.controller.js
  angular
    .module('myApp')
    .controller('userCtrl', userCtrl);


  userCtrl.$inject = ['$rootScope', '$http', '$location', '$cookies'];


  function userCtrl($rootScope, $http, $location, $cookies) {

    var vm = this;    

    var token = "Bearer" + " " + localStorage.getItem("JWT");
    // console.log(token);

    // global and runs everytime
    //if(localStorage.getItem("admin")) {
    $rootScope.admin = localStorage.getItem("admin");
    //}      
    //if(localStorage.getItem("isLoggedIn")) {
    $rootScope.isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log($rootScope.admin);
    //}

    // checking if I can get the cookiename
    //if($cookies.get('username')) {
    var favouriteCookie = $cookies.get('username')
    console.log(favouriteCookie);
    //}


    // login
    vm.login = function () {
      $http({
          method: 'post',
          url: '/user/login',
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
          localStorage.setItem("userId", vm.response.userId)
          $location.path("/list")
        })
        .catch(function (err) {
          console.log(err)
        });
    }


    // reset
    vm.reset = function () {

      console.log(vm.user.password + " =======" + localStorage.getItem("userId"));
      $http({
          method: 'post',
          url: '/user/reset',
          data: {
            'password': vm.user.password,
            'retypePassword': vm.user.passwordRetype,
            'userId': localStorage.getItem("userId")
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        })
        .then(function (response) {
          vm.response = response.data;
          console.log(vm.response);
        })
        .catch(function (err) {
          console.log(err);
        });
    }


    // restricted User
    vm.registerUser = function () {
      console.log(vm.register);
      $http({
          method: 'POST',
          url: '/user/register',
          data: vm.register,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
          vm.response = response.data;      
          $location.path("/"); //login    
        })
        .catch(function (err) {
          console.log(err);          
        });
    }


  }


})();