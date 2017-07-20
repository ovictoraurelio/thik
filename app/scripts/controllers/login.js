
(function () {

    'use strict';

    /**
     * @ngdoc function
     * @name victorAurelioApp.controller:LoginCtrl
     * @description
     * # LoginCtrl
     * Controller of the thik@ovictoraurelio
     */
    angular.module('thikApp').controller('LoginCtrl', ['$scope', '$window', function($scope, $window){
        console.log('hellooooo');
        $scope.hgt = $window.innerHeight - 24;
        console.log($scope.hgt);
    }]);

}());