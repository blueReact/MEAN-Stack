(function () {
  "use strict";

  // articles.controller.js
  angular
    .module('myApp')
    .controller('mainController', mainController)

    mainController.$inject = ['$rootScope', '$http', '$location', '$cookies']; 

  function mainController() {

    var vm = this;
    vm.fourNotFour = 'Page not found - 404';    

  };
  

})();