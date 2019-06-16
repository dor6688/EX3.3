
angular.module("myApp")
    .controller("loginController", function ($scope, $http) {
        self = this;
        $scope.token;
        $scope.UserName = "";
        $scope.Question1 = "";
        $scope.Question2 = "";

        $scope.password = "";
        $scope.forgot = false;
        $scope.login = function() {
            var user = {
                username: $scope.UserName,
                password: $scope.password
            }

            $http.post('http://localhost:3000/users/login', user)
            .then(function(response){
                // check here if insert successfully
                $scope.token = response.data
                userToken = $scope.token
                window.alert($scope.token)
                alert(userToken)
            },function (error){
                window.alert("NO !")
            })
        }

        $scope.funcForget = function(){
            $scope.forgot = true;
        }
        


    });
