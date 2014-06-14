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
        .when('/articles/:articleID',
            {
                controller: 'articlesController',
                templateUrl: '/partials/articles.html'
            })
        .when('/about',
            {
                controller: 'aboutController',
                templateUrl: '/partials/about.html'
            })
        .otherwise({ redirectTo: '/' });
});
