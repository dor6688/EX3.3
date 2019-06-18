// poi controller
angular.module("myApp")
    .controller("poiController", function ($scope, $http) {
        self = this;
        $scope.selectCategory ;
        /*$http.get('http://localhost:3000/points/ListOfPoints').then(function (response) {
            self.Pois = response.data;
        });
        */
        $http.get('http://localhost:3000/points/getCategories').then(function (response) {
            $scope.Categories = response.data;
        });
        $scope.search = function() {
            $http.get('http://localhost:3000/points/ListOfPointsByCategory/' + $scope.selectCategory.categoryName)
            .then(function(response){
                self.Pois = response.data;
            },function (error){
                window.alert("NO !")
            })
        }
    });

