
angular.module("myApp")
    .controller("loginController", function ($scope, $http,$rootScope) {
        self = this;
        $scope.token;
        $scope.UserName = "";
        $scope.Question1 = "";
        $scope.Question2 = "";
        $scope.password = "";
        $rootScope.userNameLogged;
        $scope.forgot = false;
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
                window.alert($rootScope.userToken)
            },function (error){
                window.alert("NO !")
            })
        }

        $scope.funcForget = function(){
            $scope.forgot = true;
        }
        


    });
