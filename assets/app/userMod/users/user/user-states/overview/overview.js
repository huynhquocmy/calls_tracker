
userMod.controller("UserOverviewController", ['$scope', 'highchartService', 'Restangular', '$stateParams',
 function ($scope, highchartService, Restangular, $stateParams){
  
  var charts = highchartService;

  $scope.current.stateName = 'overview';

  $scope.selectedDate = 'week';


	$scope.getLogsByDate = function (params) {
		Restangular.all('log').all('getLogsByDate').getList({
			startDate: params.startDate,
			endDate: params.endDate,
			userId: $stateParams.userId 
		}).then(function(logs) {
			$scope.filterLogs = logs;
			$scope.renderChart();
		});
	};

	$scope.getTodayLogs = function () {
		var startDate = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
	  var endDate = moment().add(1,'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');

		Restangular.all('log').all('getLogsByDate').getList({
			startDate: startDate,
			endDate: endDate,
			userId: $stateParams.userId 
		}).then(function(logs) {
			$scope.logs = logs;
		});
	};

	$scope.getTodayLogs();

	$scope.getLogsHistory = function () {
		var params = {
			startDate: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
			endDate: moment().add(1,'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
		};

		switch ($scope.selectedDate) {
			case 'week': {
				params.startDate = moment().startOf('isoweek').format('YYYY-MM-DD HH:mm:ss');
				params.endDate = moment().endOf('isoweek').format('YYYY-MM-DD HH:mm:ss');
				break;
			}

			case 'month': {
				params.startDate = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
				params.endDate = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');
				break;
			}

			case 'year': {
				params.startDate = moment().startOf('year').format('YYYY-MM-DD HH:mm:ss');
				params.endDate = moment().endOf('year').format('YYYY-MM-DD HH:mm:ss');
				break;
			}
		}

		$scope.getLogsByDate(params);
	};

	$scope.getLogsHistory();

	$scope.renderChart = function (data) {
		charts.element("#user-bar-charts")
		.filterType($scope.selectedDate)
		.data($scope.filterLogs)
		.formatData()
		.renderBarChart();
	};
}]);