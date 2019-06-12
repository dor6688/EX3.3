angular.module("myApp")
    .controller("registerController", function ($scope, $http) {
        self = this;
        $scope.firstname = "";
        $scope.lastname = "";
        $scope.username = "";
        $scope.city = "";
        $scope.selectCountry;
        $scope.email = "";
        $scope.q1 = "";
        $scope.a1 = "";
        $scope.q2 = "";
        $scope.a2 = "";
        $scope.selectCategory;
        $scope.password = "";
        $http.get('http://localhost:3000/Countries/getCountries').then(function(response){
            $scope.Countries=response.data;

        });

        $http.get('http://localhost:3000/points/getCategories').then(function(response){
            $scope.Categories=response.data;

        });
        
        $scope.sumbit = function() {
            var new_user = {

                firstname: $scope.firstname,
                lastname: $scope.lastname,
                username: $scope.username,
                password: $scope.password,
                city: $scope.city,
                Country: $scope.selectCountry.Name,
                email: $scope.email,
                q1: $scope.q1,
                ans1: $scope.a1,
                q2: $scope.q2,
                ans2: $scope.a2,
                cn: $scope.selectCategory.categoryName,
            }
            $http.post('http://localhost:3000/users/addUser', new_user)
            .then(function(response){
                // check here if insert successfully
                window.alert("Succeess !")
            },function (error){
                window.alert("NO !")
            })
        }


    });
