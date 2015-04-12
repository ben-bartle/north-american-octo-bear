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
      }).state('main.viewitem', {
        url: 'view/:itemId',
        templateUrl: 'app/main/main.viewitem.html',
        controller: 'Main.ViewitemCtrl'
      }).state('main.edititem', {
        url: 'edit/:itemId',
        templateUrl: 'app/main/main.edititem.html',
        controller: 'Main.EdititemCtrl'
      });
  });