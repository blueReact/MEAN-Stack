(function () {
  "use strict";

  // articles.controller.js
  angular
    .module('myApp')
    .controller('headerCtrl', headerCtrl);


  headerCtrl.$inject = ['$rootScope', '$http', '$location', '$cookies'];


  function headerCtrl($rootScope, $http, $location, $cookies) {

    var vm = this;    

    var token = "Bearer" + " " + localStorage.getItem("JWT");
    // console.log(token);

    // global and runs everytime    
    $rootScope.admin = localStorage.getItem("admin");    
    $rootScope.isLoggedIn = localStorage.getItem("isLoggedIn");
    
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

    // to clear specific local storage based on key i.e JWT in this case
    vm.clearLocalStorage = function () {
      window.localStorage.removeItem("JWT");
      window.localStorage.removeItem("admin");
      window.localStorage.removeItem("isLoggedIn");
      window.localStorage.removeItem("userId");
    }

  };



})();