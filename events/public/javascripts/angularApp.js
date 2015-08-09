var app = angular.module('eventsApp', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/templates/home.html',
        controller: 'MainCtrl'
      })
      .state('/submissions', {
        url: '/submissions',
        templateUrl: '/templates/submissions.html',
        controller: 'MainCtrl'
      })
      .state('/blog', {
        url: '/blog',
        templateUrl: '/templates/blog.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('home');
  }
]);

app.controller('MainCtrl', [
  '$scope',
  function($scope) {
    $scope.post = "hi";
    $scope.thisForm = "Form goes here";
  }]);