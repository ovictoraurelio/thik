(function () {

'use strict';

/**
 * @ngdoc overview
 * @name thikApp
 * @description
 * # thikApp
 *
 * Main module of the application.
 */


angular.module('thikApp', [
      'ui.router',
      'ngCookies',
      'ngPassport.basicStrategy',
]).config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
      //
      // For any unmatched url, redirect to /login
      $urlRouterProvider.otherwise('login');

      $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html'
        });
}]);

}());