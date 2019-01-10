(function () {
  "use strict";

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
          $location.path("/data")
        })
        .catch(function (err) {
          console.log(err)
        });
    }

    // logout
    vm.logout = function () {
      $http.post('/user/logout', vm.user).then(function (response) {
          vm.response = response.data;
          console.log(vm.response);
        })
        .catch(function (err) {
          console.log(err);
          if (err.status === 555) {
            vm.clearLocalStorage();
            $cookies.remove('username');
            $location.path("/");
          }
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

    // http GET data
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



    // blog
    $http({
        method: 'get',
        url: '/api/blog',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })
      .then(function (response) {
        console.log(response);
        vm.blog = response.data;
      })
      .catch(function (err) {
        console.log(err);
        if (err.status === 401) {
          vm.err = err.data
        }
      });


    // to clear specific local storage based on key i.e JWT in this case
    vm.clearLocalStorage = function () {
      window.localStorage.removeItem("JWT");
      window.localStorage.removeItem("admin");
      window.localStorage.removeItem("isLoggedIn");
      window.localStorage.removeItem("userId");
    }

  };

})();