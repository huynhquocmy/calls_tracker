userMod
  .config(['$stateProvider', function config($stateProvider) {
    
    $stateProvider.state('users.user', {
      url: '/:userId/overview',
      abstract: true,
      views: {
        'content': {
          controller: 'UserController',
          templateUrl: 'userMod/users/user/user.tpl.jade'
        }
      }
    });
  }])

  .controller('UserController', ['$scope', 'highchartService', 'Restangular',
    '$stateParams', '$timeout',
    function ($scope, highchartService, Restangular, $stateParams, $timeout) {
    var charts = highchartService;
    

    $scope.current = {};

    $scope.getNumberOfLogs = function () {
      Restangular.all('log').all('getCountLogs').getList({
        userId: $stateParams.userId
      }).then(function(count) {
        $scope.todayLogs = _.find(count, function (item) {
          return item.type === 'today';
        }).value;

        $scope.weekLogs = _.find(count, function (item) {
          return item.type === 'week';
        }).value;

        $scope.monthLogs = _.find(count, function (item) {
          return item.type === 'month';
        }).value;

        $scope.allLogs = _.find(count, function (item) {
          return item.type === 'all';
        }).value;

      });
    };
    
    $scope.currentResponseFilter = 'week';
    $scope.getNumberOfResponse = function () {

      var params = {
          startDate: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
          endDate: moment().startOf('day').add(1, 'day').format('YYYY-MM-DD HH:mm:ss')
      };

      if ($scope.currentResponseFilter === 'week') {
        params = {
          startDate: moment().startOf('isoweek').format('YYYY-MM-DD HH:mm:ss'),
          endDate: moment().endOf('isoweek').format('YYYY-MM-DD HH:mm:ss')
        };
      }

      if ($scope.currentResponseFilter === 'month') {
        params = {
          startDate: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
          endDate: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
        };
      }

      if ($scope.currentResponseFilter === 'all') {
        params = {};
      }

      params.userId = $stateParams.userId;

      Restangular.all('log').all('getCountResponseLogs').get('', params).then(function(count) {
        $scope.positiveLogs = _.find(count, function (item) {
          return item.type === 'positive';
        }).value;

        $scope.negativeLogs = _.find(count, function (item) {
          return item.type === 'negative';
        }).value;

        charts.element("#user-pie-chart")
        .formatedData([
              ['Positive', $scope.positiveLogs],
              ['Negative', $scope.negativeLogs]
        ])
        .renderPieChart();
      });
    };

    $scope.getUserProfile = function () {
      var userId = $stateParams.userId;
      Restangular.all('user').all('getUserById').get('', {
        userId: userId
      })
      .then(function (user) {
        $timeout(function (){
          $scope.$apply(function () {
            $scope.currentUser = user;
            console.log(user);
          })
        })

      })
    };

    $scope.getUserProfile();
    $scope.getNumberOfResponse();
    $scope.getNumberOfLogs();

  }]);