angular.module("myApp")
    .controller("loginController", function ($scope, $http) {
        self = this;
        $scope.token;

        $scope.UserName = "";
        $scope.password = "";
        $scope.forgot = false;
        alert($scope.forgot)
        $scope.login = function() {
            var user = {
                username: $scope.UserName,
                password: $scope.password
            }

            $http.post('http://localhost:3000/users/Login', user)
            .then(function(response){
                // check here if insert successfully
                $scope.token = response.data
                window.alert($scope.token)
            },function (error){
                window.alert("NO !")
            })
        }

        $scope.funcForget = function(){
            
            $scope.forgot = true;
            alert($scope.forgot)
        }
    });
