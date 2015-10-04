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

.controller("SignupController", ['$scope', '$state', 'Restangular',
  function ($scope, $state, Restangular){

  $scope.newUser = {
    firstName: 'My',
    lastName: 'Huynh',
    phone: '0905452190',
    email: 'quocmykhtn@gmail.com',
    title: 'Web developer',
    gender: 'male',
    username: 'myhuynh',
    password: '1234',
    confirmpassword: '1234'
  };

  $scope.createUser = function () {
    $scope.isSubmiting = true;

    if (!$scope.newUser.firstName || !$scope.newUser.lastName ||
      !$scope.newUser.phone || !$scope.newUser.email || !$scope.newUser.title ||
      !$scope.newUser.username || !$scope.newUser.password || !$scope.newUser.confirmpassword) {
      return;
    }

    Restangular.all('User').customPOST({}, '', $scope.newUser)
    .then(function(user) {
      $state.go('login');
    }, function (err){
      console.log(err);
      if (err.data.id) {
        $scope.existing = true;
      }
    });
  };
}]);