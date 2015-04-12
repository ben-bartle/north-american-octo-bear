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
  	})
  	.controller('Main.ViewitemCtrl',function ($scope,$http,$state){
  		$scope.item = {};
  		$http.get('/api/items/' + $state.params.itemId).success(function(item){
			$scope.item = item;	
  		});
  	})
  	.controller('Main.EdititemCtrl',function ($scope,$http,$state){
  		$scope.editdata = [];
  		$scope.item = {};
  		$http.get('/api/items/' + $state.params.itemId).success(function(item){
			var temp = [];
			$scope.item = item;
  			for (var key in item.data){	
				temp.push( { key: key, value: item.data[key] });
 			}
			$scope.editdata = temp;	
			$scope.notes = item.userNotes;
  		});

  		$scope.deleteRow = function (index){
  			$scope.editdata.splice(index,1);
  		};
  		$scope.addRow = function (index){
  			$scope.editdata.push ({ key: '', value: '' });
  		};
  		$scope.save = function() {
  			var data = {};
  			for (var i in $scope.editdata){
  				var key = $scope.editdata[i].key;
  				if (!key.match(/^[a-zA-Z]/)) {
  					continue;	
  				}
  				data[key] = $scope.editdata[i].value;
  			}
  			$scope.item.data = data;
  			$scope.item.userNotes = $scope.notes;
  			$http.put('/api/items/' + $scope.item._id, $scope.item).success(function(result){
				$state.go('^');			
  			});
  		};
  		$scope.cancel = function () {
  			$state.go('^');
  		};
  	});
