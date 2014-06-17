var app = angular.module('myApp', ['ngRoute']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/home',
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


  .when('/login', {
    templateUrl: '/partials/login.html',
    controller: 'LoginController'
  })


        .otherwise({ redirectTo: '/home' });

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

app.factory("AuthenticationService", function($location) {
  return {
    login: function(credentials) {
      if (credentials.username !== "aaa" || credentials.password !== "ddd") {
        alert("Username must be 'aaa', password must be 'ddd'");
      } else {
        $location.path('/people');
      }
    },
    logout: function() {
      $location.path('/login');
    }
  };
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

app.controller('peopleAllController', function($scope, myService, AuthenticationService) {
    $scope.message = "welcome to people page!";
    $scope.people = myService.getPeople();
    $scope.logout = function() {
        AuthenticationService.logout();
    };
});

app.controller('aboutController', function($scope) {
    $scope.message = "welcome to about page!";
});

app.controller("LoginController", function($scope, $location, AuthenticationService) {
  $scope.credentials = { username: "", password: "" };

  $scope.login = function() {
    AuthenticationService.login($scope.credentials);
  }
});

app.controller('NavbarController', function ($scope, $location) {
    $scope.getClass = function (path) {
        if ($location.path().substr(0, path.length) == path) {
            return true
        } else {
            return false;
        }
    }
});

app.directive("showsMessageWhenHovered", function() {
  return {
    restrict: "A", // A = Attribute, C = CSS Class, E = HTML Element, M = HTML Comment
    link: function(scope, element, attributes) {
      var originalMessage = scope.message;
      element.bind("mouseenter", function() {
        scope.message = attributes.message;
        scope.$apply();
      });
      element.bind("mouseleave", function() {
        scope.message = originalMessage;
        scope.$apply();
      });
    }
  };
});


