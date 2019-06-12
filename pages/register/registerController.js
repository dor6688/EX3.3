angular.module("myApp")
    .controller("registerController", function ($scope, $http) {
        $scope.firstname = "";
        $scope.lastname = "";
        $scope.username = "";
        $scope.city = "";
        $scope.email = "";
        $scope.q1 = "";
        $scope.a1 = "";
        $scope.q2 = "";
        $scope.a2 = "";
        $scope.category = "";
        $scope.password = "";

        $scope.sumbit = function() {
            $http.get('http://localhost:3000/points/ListOfPoints').then(function(response){
                window.alert(response.data);
            });
        }


    });
