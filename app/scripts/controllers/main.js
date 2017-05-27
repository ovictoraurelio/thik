
(function () {

    'use strict';

    /**
     * @ngdoc function
     * @name victorAurelioApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the victorAurelioApp
     */
    angular.module('thikApp').controller('MainCtrl', ['$scope', function($scope){

        $scope.monitores0 = [
            {
                name: 'Adrion Cavalcante',
                details: ['Engenharia da computação - 4º Período.'],
                link: 'http://cin.ufpe.br/~acaf2',
                picture: 'images/adrion.jpg'
            },
            {name: 'Carlos Henrique Caloête Pena',details: ['Engenharia da computação - 6º periodo', 'Monitor desde 2015-2','Membro RoboCIn - VIsão'],link: 'http://cin.ufpe.br/~chcp', picture: 'images/carlos.jpg'},
            {name: 'Mariana Barros',details: ['Engenharia da Computação.'],link: 'http://cin.ufpe.br/~msb4', picture: 'images/mariana.jpg'}];

        $scope.monitores1 = [
            {name: 'Nathan Prestwood',details:[ 'Engenharia da computação'],link: 'http://cin.ufpe.br/~nmf2', picture: 'images/nathan.jpg'},
            {name: 'Thiago Moura',details:[ 'Engenharia da Computação.'],link: 'http://cin.ufpe.br/~tms3', picture: 'images/thiago.jpg'},
            {name: 'Victor Aurélio',details:[ 'Engenharia da Computação - 3º Periodo', 'Desenvolver Web'],link: 'http://victoraurelio.com', picture: 'images/victor.jpg'}
        ];
    }]);

}());