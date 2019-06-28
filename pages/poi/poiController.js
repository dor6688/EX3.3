// poi controller
angular.module("myApp")
    .controller("poiController", function ($scope, $http) {
        self = this;
        $scope.selectCategory;
        $scope.cat_name;
        $scope.empty_result;
        /*$http.get('http://localhost:3000/points/ListOfPoints').then(function (response) {
            self.Pois = response.data;
        });
        */
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
                        $scope.empty_result = true;
                    }
                }, function (error) {

                })
        }
        $scope.open_description_window = function(poi_watch, poi_desc, poi_rate){
            var newWin = open('url', 'windowName', 'height=300,width=300');
            full_description = "Poi Watching : " + poi_watch + "<br>" +
                                "Poi description : " + poi_desc + "<br>" +
                                "Poi rate : " + poi_rate                              

            newWin.document.write(full_description);
        }
    });


// open new window and insert text into it
// var newWin = open('url', 'windowName', 'height=300,width=300');
// newWin.document.write('html to write...');
