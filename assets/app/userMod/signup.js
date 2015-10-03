userMod

.config(['$stateProvider', function config($stateProvider) {
  
  $stateProvider.state('signup', {
    url: '/signup',
    views: {
      'main': {
        controller: 'SignupController',
        templateUrl: 'userMod/signup.tpl.jade'
      }
    }
  });
}])

.controller("SignupController", ['$scope', '$state', function ($scope, $state){
}]);