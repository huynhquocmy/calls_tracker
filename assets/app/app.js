/*
 I gonna declare all submodules here to prevent incorrect pipeline order.
 It seems to be a little bit coupling at first but we have to inject module dependency here anyway.
 */

var appMod = angular.module('callTracker', [
  'restangular',
  'templates-app',
  'ui.bootstrap',
  'ui.router',
  'callTracker.user'
])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',

  function myAppConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
])
.controller('AppCtrl', ['$scope', '$window', '$log', function AppCtrl($scope, $window, $log, $mdToast, $rootScope) {
}]);

var userMod = angular.module('callTracker.user', ['ui.router']);