// about controller
angular.module("myApp")
.controller("aboutController", function ($scope, $http) {
    // button click count
    self = this;
   
    
    $http.get('http://localhost:3000/points/ListOfPoints').then(function (response) {
        self.Pois = response.data;

    });
});