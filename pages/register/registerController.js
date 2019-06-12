angular.module("myApp")
    .controller("registerController", function ($scope) {
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


        $scope.myFunc = function() {
            window.alert("First Name : " + $scope.password +"\n"
             + "LastName : "+ $scope.lastname +"\n")
        }
    });
