let app = angular.module('myApp', ["ngRoute"]);



// config routes
app.config(function($routeProvider)  {
    $routeProvider

        // homepage
        .when('/', {
            templateUrl: 'pages/home/home.html',
            controller : 'homeController as homeCtrl'
        })
        // about
        .when('/about', {
            templateUrl: 'pages/about/about.html',
            controller : 'aboutController as abtCtrl'
        })
        // poi
        .when('/poi', {
            templateUrl: 'pages/poi/poi.html',
            controller : 'poiController as poiCtrl'
        })
        .when('/httpRequest', {
            templateUrl: 'pages/http/request.html',
            controller : 'httpController as httpCtrl'
        })
        .when('/register', {
            templateUrl: 'pages/register/register.html',
            controller : 'registerController as registerCtrl'
        })
         .when('/login', {
             templateUrl: 'pages/login/login.html',
             controller : 'loginController as loginCtrl'
         })
         .when('/restore', {
            templateUrl: 'pages/restore/restore.html',
            controller : 'restoreController as restoreCtrl'
        })
        .when('/favorite', {
            templateUrl: 'pages/favorite/favorite.html',
            controller : 'favoriteController as favoriteCtrl'
        })
        
       // other
        .otherwise({ redirectTo: '/' });
});