
userMod.controller("UserNewcallController", ['$scope', 'Restangular', '$state',
  function ($scope, Restangular, $state){
  $scope.current.stateName = 'new-call';
  angular.element("#name").focus();

  $scope.LogModel = {
  	fullName: '',
  	phone: '',
  	email: '',
  	group: 1,
  	time: 0,
  	response: 1,
  	content: '',
  	notes: '',
  	location: '',
    source: 1
  };

  $scope.createLog = function () {
  	Restangular.all('log').customPOST({}, 'createLog', $scope.LogModel)
  	.then(function(log) {
  		if (log.id) {
  			$state.go("users.user.logs", { reload : true});
  		}
  	});
  };

}]);