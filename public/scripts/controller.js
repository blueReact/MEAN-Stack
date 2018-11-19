(function () {
  'use strict';

  // articles.controller.js
  angular
    .module('myApp')
    .controller('myCtrl', myCtrl);

  myCtrl.$inject = ['$scope', '$http', '$location'];

  function myCtrl($scope, $http, $location) {

    var vm = this;    
    vm.fourNotFour = "404";

    console.log(vm.data);

    // login
    vm.login = function () {
      $http.post('/login', vm.user).then(function (response) {
          vm.response = response.data;
          // console.log(vm.response);
          localStorage.setItem("JWT", vm.response.token)
          $location.path("/data")
        })
        .catch(function (err) {
          console.log(err)
        });
    }
    
    var token = "Bearer" + " " + localStorage.getItem("JWT");
    // console.log(token);

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
      }

  };

})();