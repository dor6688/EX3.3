
angular.module("myApp")
    .controller("loginController", function ($scope, $http, $rootScope) {

        self = this;
        $scope.token;
        $scope.UserName = "a";
        $scope.Question1 = "";
        $scope.Question2 = "";
        $scope.password = "a";
        $rootScope.userNameLogged;
        $scope.forgot = false;
        $scope.success = false;
        $scope.login = function () {
            var user = {
                username: $scope.UserName,
                password: $scope.password
            }
            //{ headers: {"x-auth-token":$rootScope.userToken}}

            $http.post('http://localhost:3000/users/login', user)
                .then(function (response) {
                    if (response.data == "user name or password are invalid")
                        window.alert("user name or password are invalid")
                    else if (response.data == "password is wrong")
                        window.alert("password is wrong")
                    else {
                        $rootScope.userToken = response.data;
                        $rootScope.userNameLogged = $scope.UserName;
                        window.location.href = "#!favorite";
                    }
                    // check here if insert successfully
                }, function (error) {
                })
        }

        $scope.funcForget = function () {
            $scope.forgot = true;
        }



    });
