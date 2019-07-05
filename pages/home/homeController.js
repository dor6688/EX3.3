angular.module("myApp")
    .controller("homeController", function ($scope, $http, $rootScope) {
        self = this;
        $scope.review;



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

            $scope.addReview = function(value){
                self.text  = $scope.review;
                window.alert($scope.review);
            }

        }





    });


angular.module("myApp").directive("modalWindow", function () {
        return {
            restrict: "E",
            template: "<button ng-click='open()' class='btn btn-info'>{{poi.poiName}}</button><div ng-hide='hidden' class='trans-layer'></div><div class='modal-container' ng-class='{modalactive: !hidden}' ng-transclude></div>",
            scope: true,
            transclude: true,
            controller: function ($scope) {
                $scope.hidden = true;
                $scope.open = function () {
                    $scope.hidden = false;
                };
            },
            link: function (scope, ele, attrs) {
                $(ele).find('.trans-layer').on('click', function (event) {
                    scope.hidden = true;
                    scope.$apply();
                })
            }
        }
    });

