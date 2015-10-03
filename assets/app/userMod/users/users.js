userMod
  .config(['$stateProvider', function config($stateProvider) {
    
    $stateProvider.state('users', {
      url: '/users',
      views: {
        'main': {
          controller: 'UsersController',
          templateUrl: 'userMod/users/users.tpl.jade'
        }
      }
    });
  }])

  .controller('UsersController', ['$scope', function ($scope) {
    console.log('You are at users state');
  }]);
