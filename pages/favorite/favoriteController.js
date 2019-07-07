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
        $scope.review1;
        $scope.review2;

        $scope.default_image = "https://upload.wikimedia.org/wikipedia/commons/b/b9/GJL-fft-herz.svg";
        $scope.redHeart = "https://www.warrenstore.com/wp-content/uploads/2015/06/clipart-heart-LiKzza9ia.png"

        $http.get('http://localhost:3000/points/getCategories').then(function (response) {
            $scope.Categories = response.data;
        });

        if ($rootScope.favList == undefined) {
            $http.get('http://localhost:3000/privateUser/getFavPois', {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $rootScope.userToken
                }
            })
                .then(function (response) {
                    $scope.favInDB = response.data;
                    self.Pois = response.data;
                    $rootScope.favList = self.Pois;
                    $rootScope.countFavorite = self.Pois.length;

                    window.location.href = "#!home";
                }, function (error) {

                })
        } else {
            self.Pois = $rootScope.favList;
            if (self.Pois.length == 0) {
                window.alert("Sorry, didn't found anything... ")
            } else {
                for (i in self.Pois) {
                    $scope.heart[i] = $scope.redHeart;
                    $scope.flag[i] = 2;
                }
            }
        }

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

            for (j in self.Pois) {
                var data = { 'poiName': self.Pois[j].poiName }
                $http.put('http://localhost:3000/privateUser/addFavoritePoi', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': $rootScope.userToken
                    }
                })
                    .then(function (response) {
                    }, function (error) {

                    })
            }
        }
     
           

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
                    if(error.data= "something went wrong")
                    window.alert("you have already reviewed this poi")
                })

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
        $scope.up = function (id) {
            self.i = 0;
            while (self.i < $rootScope.favList.length) {
                if (self.i == id && self.i > 0) {
                    self.tmp = $rootScope.favList[self.i - 1];
                    $rootScope.favList[self.i - 1] = $rootScope.favList[self.i];
                    $rootScope.favList[self.i] = self.tmp;
                    break;
                }
                self.i += 1;
            }
            window.location.href = "#!favorite";
        }

        $scope.down = function (id) {
            self.i = 0;
            while (self.i < $rootScope.favList.length) {
                if (self.i == id && self.i < $rootScope.favList.length - 1) {
                    self.tmp = $rootScope.favList[self.i + 1];
                    $rootScope.favList[self.i + 1] = $rootScope.favList[self.i];
                    $rootScope.favList[self.i] = self.tmp;
                    break;
                }
                self.i += 1;
            }
            window.location.href = "#!favorite";
        }


        // when dislike a poi 
        $scope.like_poi = function (poi_name, i) {
            var data = { 'poiName': poi_name };
            $http.delete('http://localhost:3000/privateUser/removeFavPoi', {
                data,
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $rootScope.userToken
                }
            })
                .then(function (response) {
                    for (i in $rootScope.favList) {
                        if ($rootScope.favList[i].poiName === poi_name) {
                            self.found = true;
                            $scope.heart[i] = self.default_image;
                            $scope.flag[i] = 1;

                            var index = $rootScope.favList.findIndex(poi => poi.poiName == poi_name);
                            $rootScope.favList.splice(index, 1);
                            $rootScope.countFavorite = $rootScope.favList.length;
                            break;

                        }
                    }
                }, function (error) {

                })
        }
    });
