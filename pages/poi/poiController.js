// poi controller
angular.module("myApp")
.controller("poiController", function ($scope, $http) {
    self = this;
    $http.get('http://localhost:3000/points/ListOfPoints/').then(function(response){
                self.Pois=response.data;

            });
});

