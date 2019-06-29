angular.module("myApp")
    .controller("homeController", function ($scope, $http, $rootScope) {
        self = this;

        $http.get('http://localhost:3000/points/getRandomPOI').then(function (response) {
            self.randomPois = response.data;

        });
        if ($rootScope.userToken != undefined) {
            $http.get('http://localhost:3000/privateUser/getRecommendedPoi', {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $rootScope.userToken
                }
            })
                .then(function (response) {
                    self.recommendedPois = response.data;

                }, function (error) {
                    window.alert("NO !")
                })


            $http.get('http://localhost:3000/privateUser/getLastFavPoi', {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $rootScope.userToken
                }
            })
                .then(function (response) {
                    self.lastSaved = response.data;

                }, function (error) {
                    window.alert("NO !")
                })

        }


    });
