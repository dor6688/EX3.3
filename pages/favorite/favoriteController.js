// poi controller
angular.module("myApp")
    .controller("favoriteController", function ($scope, $http, $rootScope) {
        self = this;
        $scope.selectCategory;
        $scope.cat_name;
        $scope.empty_result;
        $scope.heart = [];
        $scope.flag = [];
        $scope.all_pois_favorite = [];
        $scope.default_image = "https://upload.wikimedia.org/wikipedia/commons/b/b9/GJL-fft-herz.svg";
        $scope.redHeart = "https://www.warrenstore.com/wp-content/uploads/2015/06/clipart-heart-LiKzza9ia.png"

        $http.get('http://localhost:3000/points/getCategories').then(function (response) {
            $scope.Categories = response.data;
        });

        $http.get('http://localhost:3000/privateUser/getFavPois', {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': $rootScope.userToken
            }
        })
            .then(function (response) {
                self.all_pois_favorite = response.data;
                self.Pois = self.all_pois_favorite;

                self.Pois = $rootScope.favList;
                $rootScope.countFavorite = self.Pois.length;
                if (self.Pois.length == 0) {
                    window.alert("Sorry, didn't found anything... ")
                } else {
                    for (i in self.Pois) {
                        $scope.heart[i] = $scope.redHeart;
                        $scope.flag[i] = 2;
                    }
                }
            }, function (error) {

            })

        // serach by category
        $scope.search = function () {
            $http.get('http://localhost:3000/points/ListOfPointsByCategory/' + $scope.selectCategory.categoryName)
                .then(function (response) {
                    var cat_Pois = []
                    self.all_poi_in_category = response.data;
                    self.Pois = $rootScope.favList;
                    for (item in self.Pois) {
                        self.tmp = self.Pois[item]
                        angular.forEach(self.all_poi_in_category, function (value, key) {
                            if (value.poiName === self.tmp.poiName) {
                                cat_Pois.push(self.tmp);
                            }
                        }, cat_Pois);
                    }
                    self.Pois = cat_Pois;

                    for (i in self.Pois) {
                        $scope.heart[i] = $scope.redHeart;
                        $scope.flag[i] = 2;
                    }
                }, function (error) {
                    window.alert("NO !")
                })

        }
        //sort by ratings 
        $scope.oreder = 1;
        $scope.sort = function () {

            if ($scope.order == 1) {
                $scope.order = 2;
                self.Pois.sort(function (a, b) {
                    return a.poiRate - b.poiRate;
                })
            } else {
                $scope.order = 1;
                self.Pois.sort(function (a, b) {
                    return b.poiRate - a.poiRate;
                })
            }
        }

        // save all favorite to database
        $scope.save = function () {

            for (i in self.Pois) {
                var data = { 'poiName': self.Pois[i].poiName };
                $http({
                    url: 'http://127.0.0.1:3000/privateUser/addFavoritePoi',
                    method: "put",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': $rootScope.userToken
                    },
                    data: data
                })
            }
        }

        // search by specific name
        $scope.search_by_name = function () {
            $http.get('http://localhost:3000/points/ListOfPoints/' + $scope.cat_name)
                .then(function (response) {
                    self.current_poi = response.data;
                    self.Pois = $rootScope.favList;
                    self.flag = false;

                    if (self.current_poi.length > 0 && $rootScope.favList.length > 0) {
                        angular.forEach(self.all_pois_favorite, function (value, key) {
                            if (value.poiName === self.current_poi[0].poiName) {
                                self.flag = true;
                            }
                        });
                        if (self.flag) {
                            self.Pois = self.current_poi;
                            for (i in self.Pois) {
                                $scope.heart[i] = $scope.redHeart;
                                $scope.flag[i] = 2;
                            }
                        } else {
                            self.Pois = [];
                        }

                    } else {
                        window.alert("Sorry, didn't found anything... ")
                        self.Pois = [];
                    }
                }, function (error) {

                })
        }
        // when click on image
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
        // when dislike a poi 
        $scope.like_poi = function (poi_name, i) {
            var data = { 'poiName': poi_name };
            if ($scope.flag[i] == 1) {
                $scope.heart[i] = "https://www.warrenstore.com/wp-content/uploads/2015/06/clipart-heart-LiKzza9ia.png"
                $scope.flag[i] = 2;

            }
            else {
                $scope.heart[i] = "https://upload.wikimedia.org/wikipedia/commons/b/b9/GJL-fft-herz.svg"
                $scope.flag[i] = 1;


                for (i in $rootScope.favList) {
                    if ($rootScope.favList[i].poiName === poi_name) {
                        self.found = true;
                        $scope.heart[j] = self.default_image;
                        $scope.flag[j] = 1;

                        var index = $rootScope.favList.findIndex(poi => poi.poiName == poi_name);
                        $rootScope.favList.splice(index, 1);
                        $rootScope.countFavorite = $rootScope.favList.length;
                        break;

                    }
                }
                if (self.found === false) {
                    $scope.heart[j] = $scope.$scope.redHeart;
                    $scope.flag[j] = 2;
                } else {
                    window.location.href = "#!favorite";
                }
            }
        }
    });

