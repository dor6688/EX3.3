
angular.module("myApp")
    .controller("loginController", function ($scope, $http,$rootScope) {
        alert($rootScope.userNameLogged)

        self = this;
        $scope.token;
        $scope.UserName = "sdv";
        $scope.Question1 = "";
        $scope.Question2 = "";
        $scope.password = "123Ssssss";
        $rootScope.userNameLogged;
        $scope.forgot = false;
        $scope.success=false;
        $scope.login = function() {
            var user = {
                username: $scope.UserName,
                password: $scope.password
            }
            //{ headers: {"x-auth-token":$rootScope.userToken}}

            $http.post('http://localhost:3000/users/login',user )
            .then(function(response){
                // check here if insert successfully
                $rootScope.userToken=response.data;
                $rootScope.userNameLogged=$scope.UserName;
                window.location.href = "#!home";
            },function (error){
                window.alert("NO !")
            })
        }

        $scope.funcForget = function(){
            $scope.forgot = true;
        }
        


    });
