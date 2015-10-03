userMod

.config(['$stateProvider', function config($stateProvider) {
  
  $stateProvider.state('login', {
    url: '/login',
    views: {
      'main': {
        controller: 'LoginController',
        templateUrl: 'userMod/login.tpl.jade'
      }
    }
  });
}])

.controller("LoginController", ['$scope', '$state', function ($scope, $state){

	$scope.goToProfile = function () {
		$state.go('users.user.overview', {userId: 2});
	};

  $scope.login = function () {

  };
}]);