var angular = require('angular');
//var ngRoute = require('../dependencies/angular.router.js');
var $ = require('jquery');

var app = angular.module('speakApp', []);

/*app.controller('PageController', function ($scope) {
 $scope.posts = [];
 $scope.speak = {created_by: '', created_at:'', text:''}

 $scope.post = function () {
        $scope.speak.created_at = new Date();
        $scope.posts.push($scope.speak);
        $scope.speak = { created_by: '', created_at: '', post: '' };

    };
 
}); */

app.controller('registerController', ['$scope', '$http', function ($scope, $http) {
    $scope.register = function () {
      $http.post ('/auth/signup', {username: $scope.username, password: $scope.password})
              .then(function onSuccess(data) {
                  window.location = '/api/speak';
              })
                .catch (function onError(err) {
                   console.log(err);
                });
    }; 
            console.log('i am here')
}]);

app.controller('loginController', ['$scope', '$http', function ($scope, $http) {
    $scope.login = function () {
        console.log($scope.password);
        $http.post('/auth/login', { username: $scope.username, password: $scope.password })
            .then(function onSuccess(data) {
               window.location = '/api/speak';
            })
            .catch(function onError(err) {
                console.log(err)
            });
    };
}]);

app.controller('speakController', ['$scope','$http', function($scope, $http) {
    
    console.log(window.SPEAK.username)
    if (window.SPEAK.username) {
        $scope.user = true;
       console.log($scope.user)
    } else {
        $scope.show = true;
    }
    $('input[type="submit"]').click(function(){
        $.ajax({
          url: '/api/speak',
          method: 'POST',
          data: {
              username: window.SPEAK.username,
              text: $scope.speak
          },
          success: function() {
              window.location = '/api/speak'
              $scope.text = '';
              return;
          },
            error: function (err) {
                console.log(err);
            }
        })
    })
    }]);
