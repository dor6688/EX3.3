// poi controller
angular.module("myApp")
    .controller("poiController", function ($scope, $http, $rootScope) {
        self = this;
        $scope.selectCategory;
        $scope.cat_name;
        $scope.empty_result;
        $scope.heart = "https://upload.wikimedia.org/wikipedia/commons/b/b9/GJL-fft-herz.svg"
        $scope.flag = 1;
        $http.get('http://localhost:3000/points/getCategories').then(function (response) {
            $scope.Categories = response.data;
        });
        $scope.search = function () {
            $http.get('http://localhost:3000/points/ListOfPointsByCategory/' + $scope.selectCategory.categoryName)
                .then(function (response) {
                    self.Pois = response.data;
                }, function (error) {
                    window.alert("NO !")
                })
        }
        $scope.search_by_name = function () {
            $http.get('http://localhost:3000/points/ListOfPoints/' + $scope.cat_name)
                .then(function (response) {
                    self.Pois = response.data;
                    if (self.Pois.length == 0) {
                        window.alert("Sorry, didn't found anything... ")
                    }
                }, function (error) {

                })
        }
        $scope.open_description_window = function (poi_watch, poi_desc, poi_rate, poi_name) {
            var poi_name_jason = {
                poiName: poi_name
            }
            $http.put('http://localhost:3000/points/addPoiWatching', poi_name_jason)
                .then(function (response) {
                    poi_watch2 = response.data[0].poiWatching;
                    var newWin = open('url', 'windowName', 'height=300,width=300');
                    full_description = "Poi Watching : " + poi_watch2 + "<br>" +
                        "Poi description : " + poi_desc + "<br>" +
                        "Poi rate : " + poi_rate

                    newWin.document.write(full_description);

                }, function (error) {

                })
        }


        $scope.like_poi = function (poi_name) {
            var data = { 'poiName': poi_name };
            if ($scope.flag == 1) {
                $scope.heart = "https://www.warrenstore.com/wp-content/uploads/2015/06/clipart-heart-LiKzza9ia.png"
                $scope.flag = 2;
                $http({
                    url:'http://127.0.0.1:3000/privateUser/addFavoritePoi',
                    method: "put",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': $rootScope.userToken
                    },
                    data : data
                })
            }
            else {
                $scope.heart = "https://upload.wikimedia.org/wikipedia/commons/b/b9/GJL-fft-herz.svg"
                $scope.flag = 1;
            }
        }





    });

