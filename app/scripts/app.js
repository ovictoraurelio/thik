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
      //'ngCookies',
      //'ngPassport.basicStrategy',
]).run(
  ['$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
  ]
).config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
      //
      // For any unmatched url, redirect to /login
      //$urlRouterProvider.otherwise('home');
      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
     $urlRouterProvider
       .when('login', '/login')
       .otherwise('/login');

      $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        }).state("home", {
          // Use a url of "/" to set a state as the "index".
          url: "/",
          // Example of an inline template string. By default, templates
          // will populate the ui-view within the parent state's template.
          // For top level states, like this one, the parent template is
          // the index.html file. So this template will be inserted into the
          // ui-view within index.html.
          template: '<p class="lead">Welcome to the UI-Router Demo</p>' +
            '<p>Use the menu above to navigate. ' +
            'Pay attention to the <code>$state</code> and <code>$stateParams</code> values below.</p>' +
            '<p>Click these links—<a href="#/c?id=1">Alice</a> or ' +
            '<a href="#/user/42">Bob</a>—to see a url redirect in action.</p>'

        })

}]);

}());