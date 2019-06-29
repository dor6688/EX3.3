// poi controller
angular.module("myApp")
    .controller("poiController", function ($scope, $http, $rootScope) {
        self = this;
        $scope.selectCategory;
        $scope.cat_name;
        $scope.empty_result;
        $scope.heart = [];
        $scope.flag = [1, 1];
        // Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
/*
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}
*/
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
/*
span.onclick = function() { 
  modal.style.display = "none";
}
*/
        $scope.flag = [];
        if ($rootScope.favList === undefined) {
            $rootScope.favList = [];
        }
        $scope.default_image = "https://upload.wikimedia.org/wikipedia/commons/b/b9/GJL-fft-herz.svg";
        $scope.redHeart = "https://www.warrenstore.com/wp-content/uploads/2015/06/clipart-heart-LiKzza9ia.png"
        $http.get('http://localhost:3000/points/getCategories').then(function (response) {
            $scope.Categories = response.data;
        });

        $http.get('http://localhost:3000/points/ListOfPoints').then(function (response) {
            self.Pois = response.data;
            for (i in self.Pois) {
                self.found = false;
                angular.forEach($rootScope.favList, function (value, key) {
                    if (value === self.Pois[i].poiName) {

                        self.found = true;
                        $scope.heart[i] = $scope.redHeart;
                        $scope.flag[i] = 2;
                    }
                });
                if (self.found === false) {
                    $scope.heart[i] = $scope.default_image;
                    $scope.flag[i] = 1;
                }
            }
        });
        $scope.search = function () {
            $http.get('http://localhost:3000/points/ListOfPointsByCategory/' + $scope.selectCategory.categoryName)
                .then(function (response) {
                    self.Pois = response.data;
                    $scope.default_image = "https://upload.wikimedia.org/wikipedia/commons/b/b9/GJL-fft-herz.svg";
                    for (i in self.Pois) {
                        $scope.heart[i] = $scope.default_image;
                    }
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
                    } else {
                        $scope.default_image = "https://upload.wikimedia.org/wikipedia/commons/b/b9/GJL-fft-herz.svg";
                        for (i in self.Pois) {
                            $scope.heart[i] = $scope.default_image;
                        }
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


                }, function (error) {

                })
        }

        if ($rootScope.userToken != undefined) {
            $scope.like_poi = function (poi_name, i) {
                var data = { 'poiName': poi_name };
                if ($scope.flag[i] == 1) {
                    $scope.heart[i] = "https://www.warrenstore.com/wp-content/uploads/2015/06/clipart-heart-LiKzza9ia.png"
                    $scope.flag[i] = 2;


        $scope.like_poi = function (poi_name, i) {
            var data = { 'poiName': poi_name };
            if ($scope.flag[i] == 1) {
                $scope.heart[i] = "https://www.warrenstore.com/wp-content/uploads/2015/06/clipart-heart-LiKzza9ia.png"
                $scope.flag[i] = 2;
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
            else {
                $scope.heart[i] = "https://upload.wikimedia.org/wikipedia/commons/b/b9/GJL-fft-herz.svg"
                $scope.flag[i] = 1;
            }
        }
                    // $http.put('http://localhost:3000/privateUser/addFavoritePoi', data, {
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //         'x-auth-token': $rootScope.userToken
                    //     }
                    // })
                    //     .then(function (response) {
                    //         $rootScope.countFavorite += 1;
                    //     }, function (error) {

                    //     })
                    self.found = false;
                    angular.forEach($scope.favList, function (value, key) {
                        if (value === poi_name) {
                            self.found = true;
                        }
                    });
                    if (!self.found) {
                        $rootScope.favList.push(poi_name);
                        $rootScope.countFavorite += 1;
                    }

        $scope.AddReview = function (str){

        }



                }
                else {
                    $scope.heart[i] = "https://upload.wikimedia.org/wikipedia/commons/b/b9/GJL-fft-herz.svg"
                    $scope.flag[i] = 1;


                    self.found = false;
                    angular.forEach($scope.favList, function (value, key) {
                        if (value === poi_name) {
                            self.found = true;
                            window.alert("FOUND ! ")
                            window.alert($rootScope.favList)
                        }
                    });
                    if (self.found === true) {
                        var index = $rootScope.favList.indexOf(poi_name);
                        $rootScope.favList.splice(index, 1);
                        $rootScope.countFavorite -= 1;
                        window.alert($rootScope.favList)
                    }

                    // $http.delete('http://localhost:3000/privateUser/deleteFavoritePoi', data, {
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //         'x-auth-token': $rootScope.userToken
                    //     }
                    // })
                    //     .then(function (response) {
                    //         $rootScope.countFavorite -= 1;
                    //     }, function (error) {

                    //     })
                }
            }
        }
    });

