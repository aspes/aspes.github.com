var app = angular.module('myApp', ['ngRoute']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                controller: 'homeController',
                templateUrl: '/partials/home.html'
            })
        //Define a route that has a route parameter in it (:customerID)
        .when('/people/:personID',
            {
                controller: 'peopleController',
                templateUrl: '/partials/people.html'
            })
        .when('/people',
            {
                controller: 'peopleAllController',
                templateUrl: '/partials/people.html'
            })
        .when('/about',
            {
                controller: 'aboutController',
                templateUrl: '/partials/about.html'
            })
        .otherwise({ redirectTo: '/' });

});

app.service('myService', function() {
    this.getPeople = function() {
        return people;
    };

    this.getPerson = function(id) {
        return people[id];
    };

    var people = [
        {name: "John", city: "New York"},
        {name: "Tom", city: "Atlanta"},
        {name: "Kelly", city: "Seattle"},
        {name: "Ann", city: "Phoenix"}
        ];   
});

app.controller('homeController', function($scope) {
    $scope.message = "welcome to home page!";
});

app.controller('peopleController', function($scope, $routeParams, myService) {
    $scope.message = "welcome to people page!";
    var pID = ($routeParams.personID) ? parseInt($routeParams.personID) : -1;
    if (pID < 0) {
        $scope.people = myService.getPeople();
    } else {
        $scope.people = [myService.getPerson(pID)];
    }
});

app.controller('peopleAllController', function($scope, myService) {
    $scope.message = "welcome to people page!";
    $scope.people = myService.getPeople();
});

app.controller('aboutController', function($scope) {
    $scope.message = "welcome to about page!";
});

