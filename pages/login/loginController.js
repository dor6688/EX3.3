angular.module("myApp")
    .controller("registerController", function ($scope, $http) {
        self = this;


        $scope.UserName = "";
        $scope.password = "";


        $scope.login = function() {
            var user = {
                username: $scope.UserName,
                password: $scope.password
            }

            $http.post('http://localhost:3000/users/Login', user)
            .then(function(response){
                // check here if insert successfully
                window.alert("Succeess !")
            },function (error){
                window.alert("NO !")
            })
        }
    });
