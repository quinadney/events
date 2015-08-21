var app = angular.module('eventsApp', ['ui.router', 'infinite-scroll']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/templates/home.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise: ['posts', function(posts) {
            return posts.getAll();
          }]
        }
      })
      .state('submissions', {
        url: '/submissions',
        templateUrl: '/templates/submissions.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise: ['posts', function(posts) {
            return posts.getAll();
          }]
        }
      })
      .state('form', {
        url: '/form',
        templateUrl: '/templates/form.html',
        controller: 'MainCtrl'
      })
      .state('blog', {
        url: '/blog',
        templateUrl: '/templates/blog.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('home');
    // $locationProvider.html5Mode(true);
  }
]);

app.factory('posts', ['$http', function($http){
  console.log('fuck');
  var postData = {
    posts: []
  };

  postData.getAll = function() {
    return $http.get('/posts').success(function(data) {
      angular.copy(data, postData.posts);
    });
  };

  postData.create = function(post) {
    console.log('post: ', post);
    return $http.post('/posts', post).success(function(data) {
      console.log(data);
      postData.posts.push(data);
      console.log(postData);
    });
  };

  postData.get = function(id) {
    console.log('trying ', id);
    return $http.get('/posts/' + id).then(function(res) {
      return res.data;
    });
  };
  console.log(postData);
  return postData;
}]);

app.controller('MainCtrl', [
  '$scope', '$http', 'posts', '$stateParams',
  function($scope, $http, posts) {

    $scope.posts = posts.posts;

    $scope.post = "hi";
    $scope.thisForm = "Form goes here";

    $scope.images = [1, 2, 3, 4, 5, 6, 7, 8];

    $scope.loadMore = function() {
      var last = $scope.images[$scope.images.length - 1];
      for(var i = 1; i <= 8; i++) {
        $scope.images.push(last + i);
      }
    };

    $scope.changeType = function(type) {
      $scope.type = type;

      if (type === 'event') {
        $scope.establishmentActive = false;
        $scope.eventActive = true;
      } else if (type === 'establishment') {
        $scope.eventActive = false;
        $scope.establishmentActive = true;
      }
    };

    $scope.createPost = function() {
      // return $http.get('/posts').success(function(data) {
      //   angular.copy(data, postData.posts);
      // });
      console.log(posts);
      // posts.getAll();
      // posts.getAll();
      posts.create({
        title: $scope.title,
        category: $scope.category,
        size: $scope.size,
        tags: $scope.tags,
        information: $scope.information
      });

      console.log({title: $scope.title,
        category: $scope.category,
        size: $scope.size,
        tags: [$scope.tags],
        information: $scope.information});

    };
  }]);

app.run( ['$rootScope', '$state', '$stateParams',
  function ($rootScope,   $state,   $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams; 
  }
]);