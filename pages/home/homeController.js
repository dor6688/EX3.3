angular.module("myApp")
    .controller("homeController", function ($scope, $http) {
        self = this;
      
        $http.get('http://localhost:3000/points/getRandomPOI/').then(function(response){
            alert("HERE")
                    self.randomPois=response.data;
    
                });



    });
