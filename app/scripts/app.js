(function () {

'use strict';

/**
 * @ngdoc overview
 * @name victorAurelioApp
 * @description
 * # victorAurelioApp
 *
 * Main module of the application.
 */


angular.module('thikApp', [
      'ui.router',
      //'ngCookies',
      //'ngPassport.basicStrategy',
]).config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
      //
      // For any unmatched url, redirect to /state1
      $urlRouterProvider.otherwise('login');

      $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        });

    /*$routeProvider.when('/', {
        templateUrl: 'views/login.html', controller: 'LoginCtrl'
    }).otherwise({
        redirectTo: '/'
    });*/
}]);

}());