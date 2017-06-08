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
  'ngRoute'
]).config(['$routeProvider',function($routeProvider){

    $routeProvider.when('/', {
        templateUrl: 'views/login.html', controller: 'LoginCtrl'
    }).otherwise({
        redirectTo: '/'
    });
}]);

}());