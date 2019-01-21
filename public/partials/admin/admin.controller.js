(function () {
  "use strict";

  // articles.controller.js
  angular
    .module('myApp')
    .controller('adminCtrl', adminCtrl);


  adminCtrl.$inject = ['$rootScope', '$http', '$location', '$cookies', 'shareDataService'];


  function adminCtrl($rootScope, $http, $location, $cookies, shareDataService) {

    var vm = this;    

    var token = "Bearer" + " " + localStorage.getItem("JWT");
    

    // checking if I can get the cookiename
    // //if($cookies.get('username')) {
    // var favouriteCookie = $cookies.get('username')
    // console.log(favouriteCookie);
    // //}


    vm.blogPost = function () {

      // console.log('vm.title', vm.title)
      // console.log('vm.description', vm.description)
      // console.log('vm.html', vm.html)
      
      $http({
          method: 'post',
          url: '/api/blog',
          data: {
            'blog': vm.html,
            'title': vm.title,
            'description': vm.description,
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
    }; 

    
    // edit values
    vm.edit = shareDataService.getList();
    console.log(vm.edit[0].result[0].decode);
    vm.title = vm.edit[0].result[0].title;
    vm.description= vm.edit[0].result[0].description;
    vm.html = vm.edit[0].result[0].decode;



    vm.blogPut = function () {

      // console.log('vm.title', vm.title)
      // console.log('vm.description', vm.description)
      // console.log('vm.html', vm.html)
      
      $http({
          method: 'put',
          url: '/api/blog',
          data: {
            'blog': vm.html,
            'title': vm.title,
            'description': vm.description
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
    };
  }


})();