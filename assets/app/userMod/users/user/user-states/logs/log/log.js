
userMod.controller("UserLogDetailsController", ['$scope', '$state', '$stateParams',
  'Restangular',
  function ($scope, $state, $stateParams, Restangular){

  
  $scope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
  	$scope.preState = fromState.name || 'users.user.logs';
  });

  $scope.getLogInfo = function () {

    var logId = $stateParams.logId;
    Restangular.all('log').all('getLogById').get('', {
      logId: logId
    })
    .then(function(log) {
      if (log.id) {
        $scope.LogModel = log;
      }
    });
  };

  $scope.getLogInfo();

  $scope.edit = false;

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

  /*
  	Allow edit field when user clicking to edit button
  */

  $scope.editLog = function () {
  	$scope.edit = true;
  	setTimeout(function() {
  		angular.element("#name").focus();
  	}, 100);
  };

  $scope.updateLog = function () {
  	Restangular.all('log').all('updateLog').customPUT($scope.LogModel)
  	.then(function(log){
  		$scope.backToPreviousState();
  	});
  };

  $scope.backToPreviousState = function () {
  	$state.go($scope.preState);
  };

}]);