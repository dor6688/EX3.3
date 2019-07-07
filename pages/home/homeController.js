angular.module("myApp")
    .controller("homeController", function ($scope, $http, $rootScope) {
        self = this;
        $scope.review1;
        $scope.review2;
        if ($rootScope.userToken == undefined) {
            $http.get('http://localhost:3000/points/getRandomPOI').then(function (response) {
                self.randomPois = response.data;

            });
        }
        else {
            $http.get('http://localhost:3000/privateUser/getRecommendedPoi', {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $rootScope.userToken
                }
            })
                .then(function (response) {
                    self.recommendedPois = response.data;

                }, function (error) {
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
                })

            $scope.addReview = function (value, rate, poi) {
                var new_review = {
                    poiName: poi,
                    poiReview: value,
                    rank: rate
                }
                $http.post('http://localhost:3000/privateUser/addReview', new_review, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': $rootScope.userToken
                    }
                })
                    .then(function (response) {
                        window.alert("Thank you for your review !");
                    }, function (error) {
                    })

            }

        }





    });


angular.module("myApp").directive("modalWindow", function () {



    return {
        restrict: "E",
        template: "<button ng-click='open(poi.poiName)' class='btn btn-info'>{{poi.poiName}}</button><div ng-hide='hidden' class='trans-layer'></div><div class='modal-container' ng-class='{modalactive: !hidden}' ng-transclude></div>",
        scope: true,
        transclude: true,
        controller: function ($scope, $http) {
            $scope.hidden = true;

            $scope.open = function (poi_name) {
                $scope.hidden = false;

                var poi_name_jason = {
                    poiName: poi_name
                }

                $http.put('http://localhost:3000/points/addPoiWatching', poi_name_jason)
                    .then(function (response) { }, function (error) { })


            };
        },
        link: function (scope, ele, attrs) {
            $(ele).find('.trans-layer').on('click', function (event) {
                scope.hidden = true;
                scope.$apply();
                //window.location.href = "#!home";

            })
        }
    }
});