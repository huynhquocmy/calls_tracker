
userMod.controller("UserLogsController", ['$scope', 'Restangular', '$stateParams',
 function ($scope, Restangular, $stateParams){

  $scope.getAllLogs = function () {
    Restangular.all('log').all('getLogs').getList({
      userId: $stateParams.userId
    }).then(function(logs) {
      $scope.logs = logs;
      $scope.sortLogs();
    });
  };

  $scope.getAllLogs();
  $scope.searchLogs = '';
  $scope.current.stateName = 'logs';

  $scope.sortType = 'date';

  $scope.sortLogs = function () {
    switch($scope.sortType) {
      case 'date':
        $scope.logs = _.sortBy($scope.logs, function (log) {
          return log.createdAt;
        }).reverse();
        break;
      case 'name':
        $scope.logs = _.sortBy($scope.logs, function (log) {
          return log.fullName;
        });
        break;
      case 'location':
        $scope.logs = _.sortBy($scope.logs, function (log) {
          return log.location;
        });
        break;
    }
  };

}]);