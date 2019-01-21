(function () {
  "use strict";

  // articles.controller.js
  angular
    .module('myApp')
    .controller('listCtrl', listCtrl);

  listCtrl.$inject = ['$http', '$location', '$routeParams', '$sce', 'shareDataService'];

  function listCtrl($http, $location, $routeParams, $sce, shareDataService) {

    var vm = this;
    var token = "Bearer" + " " + localStorage.getItem("JWT");

    vm.currentBook = "<p>some description</p>";

    // get
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
        vm.blogGet = response.data;
      })
      .catch(function (err) {
        console.log(err);
      });


    // post  
    $http({
        method: 'post',
        url: '/api/detail',
        data: {
          'blog': $routeParams.id
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })
      .then(function (response) {
        console.log('geto ne', response);
        vm.blogGetOne = response.data;
      })
      .catch(function (err) {
        console.log(err);
      });



    // delete
    vm.delete = function (id) {
      console.log(id);
      $http({
          method: 'delete',
          url: '/api/blog',
          data: {
            'id': id
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        })
        .then(function (response) {
          console.log('Delete response', response);
          vm.blogGetOne = response.data;
        })
        .catch(function (err) {
          console.log(err);
        });
    };


    vm.edit = function (id) {

      // get
      $http({
          method: 'get',
          url: '/api/blog/'+id,          
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        })
        .then(function (response) {
          console.log(response);
          vm.blogGet = response.data;
          shareDataService.addList(vm.blogGet);
          
          $location.path("/admin");
        })
        .catch(function (err) {
          console.log(err);
        });
    };




  }


})();