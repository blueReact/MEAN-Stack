(function () {
  'use strict';

  // articles.controller.js
  angular
    .module('myApp')
    .controller('myCtrl', myCtrl);

  myCtrl.$inject = ['$scope', '$http'];

  function myCtrl($scope, $http) {

    var vm = this;
    vm.data = "Angularjs";
    vm.fourNotFour = "404";

    console.log(vm.data);

    // login
    vm.submit = function () {
      $http.post('/api/login', vm.user).then(function (response) {
          vm.response = response.data;
          localStorage.setItem("JWT", vm.response.token)
        })
        .catch(function (err) {
          console.log(err)
        })
    }

    // restricted API
    vm.apiPost = function () {
      $http({
          method: 'POST',
          url: '/api',
          data: vm.apiPost,
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        })
        .then(function (response) {
          vm.response = response.data;
        })
        .catch(function (err) {
          console.log(err);
        })
    }

    // http GET
    var token3rdparty = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidHl1aSIsInBhc3N3b3JkIjoidHl1aSJ9LCJpYXQiOjE1NDI1NDczMTN9.46o8a-2ksgGpXhco0w-ljm-meCkbgFWWBzZefVfseoc';
    $http({
        method: 'get',
        url: '/data',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token3rdparty
        }
      })
      .then(function (response) {
        console.log(response);
        vm.response = response.data;
      })
      .catch(function (err) {
        console.log(err);
      });

  };

})();