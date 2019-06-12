// poi controller
angular.module("myApp")
.controller("poiController", function ($scope, $http) {
    self = this;
    $scope.name = "shula";

    // self.cities = {
    //     1: {name:"Paris", state: "France", image: "https://media-cdn.tripadvisor.com/media/photo-s/0d/f5/7c/f2/eiffel-tower-priority.jpg"},
    //     2: {name:"Jerusalem", state: "Israel", image: "https://cdni.rt.com/files/2017.12/article/5a3fe04efc7e93cd698b4567.jpg"},
    //     3: {name:"London", state: "England", image: "http://www.ukguide.co.il/Photos/England/London/British-Royal-Tour.jpg"}
    //}
    $http.get('http://localhost:3000/points/ListOfPoints/').then(function(response){
                self.Pois=response.data;

            });
});





        // "poiWatching": 30,
        // "categoryName": "Food",
        // "poiURL": "https://www.fodors.com/wp-content/uploads/2018/10/11_UltimateRome_-CentroStorico-768x512.jpg"