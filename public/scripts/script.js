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

    // http GET
    $http.get('/data')
      .then(function (response) {
        console.log(response);
        vm.response = response.data;
      })
      .catch(function (response) {
        console.log(response);
      });

  };

})();