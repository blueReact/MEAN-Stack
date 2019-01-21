
(function () {
  "use strict";

  // blog.factory.js
angular
  .module('myApp')
  .factory('shareDataService', shareDataService);

  shareDataService.$inject = ['$http', '$location', '$sce'];
  
  function shareDataService($http, $location, $sce){
    
    var myList = [];

    var addList = function (newObj) {
      myList.push(newObj);
    }

    var getList = function () {
     return myList;
    }
   
    return {
      addList: addList,
      getList: getList
    };

  }


})();