'use strict';

angular.module('northAmericanOctoBearApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      }).state('main.viewlist', {
        url: ':listid',
        templateUrl: 'app/main/main.viewlist.html',
        controller: 'Main.ViewlistCtrl'

      });
  });