angular.module("myApp")
    .controller("restoreController", function ($scope, $http, $rootScope) {
        self = this;
        $scope.UserName = "";
        $scope.Questions = "";
        $scope.selectQuestion1;
        $scope.selectQuestion2;
        $scope.answer1;
        $scope.answer2;
        $scope.restoredPassword = "";
        $scope.yourPass = false;

        $scope.getQuestion = function () {
            $http.get('http://localhost:3000/users/getQuestions/' + $scope.UserName, { headers: { "x-auth-token": $rootScope.userToken } }).then(function (response) {
                $scope.Questions = response.data;


            });
        }

        $scope.restore = function () {
            var answers = {
                username:$scope.UserName,
                q1: $scope.selectQuestion1.Question1,
                ans1: $scope.answer1,
                q2: $scope.selectQuestion2.Question2,
                ans2: $scope.answer2
            }


            $http.post('http://localhost:3000/users/checkQuestion', answers)
                .then(function (response) {
                    if(response.data == "wrong answers")
                        alert("wrong answers")
                    else{
                    // check here if insert successfully
                    $scope.yourPass = true;
                    $scope.restoredPassword = response.data
                    }

                }, function (error) {
                })

        }


    });

