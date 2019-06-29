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
        $scope.selectCategory1;
        $scope.selectCategory2;
        $scope.password = "";
        $http.get('http://localhost:3000/Countries/getCountries').then(function (response) {
            $scope.Countries = response.data;

        });

        $http.get('http://localhost:3000/points/getCategories').then(function (response) {
            $scope.Categories = response.data;

        });

        function hasLowerCase(str) {
            return (/[a-z]/.test(str));
        }

        function hasUpperCase(str) {
            return (/[A-Z]/.test(str));
        }
        function hasNumber(myString) {
            return /\d/.test(myString);
        }

        function onlyCharacters(str) {
            return /^[a-zA-Z]+$/.test(str);
        }

        $scope.sumbit = function () {
            if (!hasLowerCase($scope.password) || !hasUpperCase($scope.password) || !hasNumber($scope.password) || ($scope.password + '').length < 5 || ($scope.password + '').length > 10) {
                alert("password must contain at least one number and one uppercase and lowercase letter, and between 5 to 10 characters")
            }
            else if (($scope.username + '').length > 8 || ($scope.username + '').length < 3 || !onlyCharacters($scope.username)) {

                alert("user name must contain only letters and between 3 to 8 characters")

            }
            else if($scope.selectCategory1.categoryName1 == $scope.selectCategory2.categoryName2){
                alert("Categories must be different. please select different category")

            }
            else{
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
                    cn: $scope.selectCategory.categoryName1,
                    cn: $scope.selectCategory.categoryName2,
                }
                $http.post('http://localhost:3000/users/addUser', new_user)
                    .then(function (response) {
                        // check here if insert successfully
                        window.location.href = "#!login";

                    }, function (error) {
                        window.alert("NO !")
                    })
            }
        }


    });
