'use strict';

angular.module('northAmericanOctoBearApp')
  	.controller('MainCtrl', function ($scope, $http) {
    	$scope.lists = [];

    	$http.get('/api/itemlists').success(function(lists) {
      		$scope.lists = lists;
    	});
  	})
  	.controller('Main.ViewlistCtrl', function ($scope,$http,$stateParams) {
  		$scope.items = [];
  		$scope.listid = $stateParams.listid;
  		$http.get('/api/itemlists/' + $stateParams.listid).success(function(list) {
  			$scope.listname = list.name;
  			$scope.itemIds = list.itemIds;
  			$scope.items = list.items;
  		});
  	});
