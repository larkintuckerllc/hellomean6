angular.module('myApp').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/wines', {
      	  		templateUrl: 'views/wines-list.html',
       			controller: 'WinesListCtrl'
      		}).
     		when('/wines-add', {
       			templateUrl: 'views/wines-add.html',
			controller: 'WinesAddCtrl'
      		}).
     		when('/wines/:_id', {
       			templateUrl: 'views/wines-detail.html',
			controller: 'WinesDetailCtrl'
      		})
}]);
