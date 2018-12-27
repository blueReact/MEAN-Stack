!function(){"use strict";function myCtrl(o,e,t,n,a){var s=this;s.fourNotFour="404";var r="Bearer "+localStorage.getItem("JWT");e.admin=localStorage.getItem("admin"),e.isLoggedIn=localStorage.getItem("isLoggedIn"),console.log(e.admin);var l=a.get("username");console.log(l),s.login=function(){t({method:"post",url:"/user/login",data:s.user,headers:{"Content-Type":"application/json",Authorization:r}}).then(function(o){s.response=o.data,console.log(s.response),localStorage.setItem("JWT",s.response.token),localStorage.setItem("admin",s.response.admin),localStorage.setItem("isLoggedIn",s.response.isLoggedIn),localStorage.setItem("userId",s.response.userId),n.path("/data")})["catch"](function(o){console.log(o)})},s.logout=function(){t.post("/user/logout",s.user).then(function(o){s.response=o.data,console.log(s.response)})["catch"](function(o){console.log(o),555===o.status&&(s.clearLocalStorage(),a.remove("username"),n.path("/login"))})},s.reset=function(){console.log(s.user.password+" ======="+localStorage.getItem("userId")),t({method:"post",url:"/user/reset",data:{password:s.user.password,retypePassword:s.user.passwordRetype,userId:localStorage.getItem("userId")},headers:{"Content-Type":"application/json",Authorization:r}}).then(function(o){s.response=o.data,console.log(s.response)})["catch"](function(o){console.log(o)})},s.registerUser=function(){console.log(s.register),t({method:"POST",url:"/user/register",data:s.register,headers:{"Content-Type":"application/json"}}).then(function(o){s.response=o.data,n.path("/login")})["catch"](function(o){console.log(o)})},t({method:"get",url:"/data",headers:{"Content-Type":"application/json",Authorization:r}}).then(function(o){console.log(o),s.response=o.data})["catch"](function(o){console.log(o)}),t({method:"get",url:"/api/blog",headers:{"Content-Type":"application/json",Authorization:r}}).then(function(o){console.log(o),s.blog=o.data})["catch"](function(o){console.log(o),401===o.status&&(s.err=o.data)}),s.clearLocalStorage=function(){window.localStorage.removeItem("JWT"),window.localStorage.removeItem("admin"),window.localStorage.removeItem("isLoggedIn"),window.localStorage.removeItem("userId")}}angular.module("myApp").controller("myCtrl",myCtrl),myCtrl.$inject=["$scope","$rootScope","$http","$location","$cookies"]}();function config(l){l.when("/login",{templateUrl:"partials/login.partial.html",controller:"myCtrl",controllerAs:"vm"}).when("/register",{templateUrl:"partials/register.partial.html",controller:"myCtrl",controllerAs:"vm"}).when("/data",{templateUrl:"partials/apiGet.partial.html",controller:"myCtrl",controllerAs:"vm"}).when("/blog",{templateUrl:"partials/blog.partial.html",controller:"myCtrl",controllerAs:"vm"}).when("/reset",{templateUrl:"partials/reset.partial.html",controller:"myCtrl",controllerAs:"vm"}).otherwise({templateUrl:"partials/404.partial.html",controller:"myCtrl",controllerAs:"vm"})}angular.module("myApp").config(config),config.$inject=["$routeProvider"];