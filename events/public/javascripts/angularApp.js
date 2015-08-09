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
      });

    $urlRouterProvider.otherwise('home');
  }
]);

app.controller('MainCtrl', [
  '$scope',
  function($scope) {
    $scope.post = "hi";
  }]);