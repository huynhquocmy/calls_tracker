userMod

  .config(['$stateProvider', function config($stateProvider) {
    $stateProvider.state('users.user.overview', {
      url: '',
      views: {
        'user-states': {
          templateUrl: 'userMod/users/user/user-states/overview/overview.tpl.jade',
          controller: 'UserOverviewController',
        }
      }
    });
  }])
  .config(['$stateProvider', function config($stateProvider) {
    $stateProvider.state('users.user.logs', {
      url: '/logs',
      views: {
        'user-states': {
          templateUrl: 'userMod/users/user/user-states/logs/logs.tpl.jade',
          controller: 'UserLogsController',
        }
      }
    });
  }])
  .config(['$stateProvider', function config($stateProvider) {
    $stateProvider.state('users.user.setting', {
      url: '/setting',
      views: {
        'user-states': {
          templateUrl: 'userMod/users/user/user-states/setting/setting.tpl.jade',
          controller: 'UserSettingController',
        }
      }
    });
  }])

  .config(['$stateProvider', function config($stateProvider) {
    $stateProvider.state('users.user.new-call', {
      url: '/new-call',
      views: {
        'user-states': {
          templateUrl: 'userMod/users/user/user-states/new-call/new-call.tpl.jade',
          controller: 'UserNewcallController',
        }
      }
    });
  }])

  .config(['$stateProvider', function config($stateProvider) {
    $stateProvider.state('users.user.log-details', {
      url: '/log-details/:logId',
      views: {
        'user-states': {
          templateUrl: 'userMod/users/user/user-states/logs/log/log.tpl.jade',
          controller: 'UserLogDetailsController',
        }
      }
    });
  }])

  .controller('UserStatesController', ['scope', function () {
    console.log('User states');
  }]);