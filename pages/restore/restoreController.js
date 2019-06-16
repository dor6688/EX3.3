angular.module("myApp")
    .controller("restoreController", function ($scope, $http) {
        self = this;
        $scope.UserName = "";
        $scope.Questions="";
        $scope.selectQuestion1;
        $scope.selectQuestion2;
        $scope.answer1;
        $scope.answer2;
        $scope.restoredPassword="";
        $scope.yourPass=false;
      
        $scope.getQuestion=function(){
            $http.get('http://localhost:3000/privateUser/getQuestions/' + $scope.UserName ).then(function(response){
            $scope.Questions=response.data;
                
    
            });
        }

        $scope.restore=function(){
            var answers = {
                q1: $scope.selectQuestion1.Question1,
                ans1:$scope.answer1,
                q2: $scope.selectQuestion2.Question2,
                ans2:$scope.answer2
            }
        $scope.yourPass=true;


            $http.post('http://localhost:3000/privateUser/checkQuestion', answers)
            .then(function(response){
                // check here if insert successfully
                $scope.restoredPassword = response.data

            },function (error){
                window.alert("NO !")
            })




        }


    });

        