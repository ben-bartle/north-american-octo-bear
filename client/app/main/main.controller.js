'use strict';

angular.module('northAmericanOctoBearApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/items').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  });
