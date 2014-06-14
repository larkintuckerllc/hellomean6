var winesControllers = angular.module('winesControllers', []);

winesControllers.controller('WinesListCtrl', ['$scope', 'navigator', 'Wines',  'linkedIn', function ($scope, navigator, Wines, linkedIn) {
        if (linkedIn.authenticated()) {
		$scope.wines = Wines.query(
			{token: linkedIn.token},
			function() {
				// SUCCESS
			},
			function(res) {
				// ERROR
                                if (res.status == 403) {
                                        linkedIn.logout();
                                        navigator.navigate('/login');
                                } else {
                                        navigator.navigate('/network-error');
                                }
			}
		);
		$scope.navigate = navigator.navigate;
        } else {
                navigator.navigate('/login');
        }
}]);

winesControllers.controller('WinesAddCtrl', ['$scope', 'navigator', 'Wines', 'Wineries', 'linkedIn', 'blockUI', function ($scope, navigator, Wines, Wineries, linkedIn, blockUI) {
        if (linkedIn.authenticated()) {
		$scope.nameError = false;
		$scope.wineryError = false;
		$scope.wineries = Wineries.query(
			{token: linkedIn.token},
			function() {
				// SUCCESS
			},
			function(res) {
				// ERROR
                                if (res.status == 403) {
                                        linkedIn.logout();
                                        navigator.navigate('/login');
                                } else {
                                        navigator.navigate('/network-error');
                                }
			}
		);
		$scope.addWine = function() {
			blockUI.start();
			$scope.nameError = false;
			$scope.wineryError = false;
			var newWine = new Wines({name: $scope.wineName, winery: $scope.winery_Id});
			newWine.$save(
				{token: linkedIn.token},
				function() {
					// SUCCESS
					navigator.navigate('/wines');
					blockUI.stop();
				},
				function(res) {
					// ERROR
					if (res.status == 403) {
						linkedIn.logout();
						navigator.navigate('/login');
						blockUI.stop();
					} else {
						if (res.status == 400) {
							if (res.data.errors.name) { 
								$scope.nameError = true;
							}
							if (res.data.errors.winery) { 
								$scope.wineryError = true;
							}
						 	blockUI.stop();
						} else {
							navigator.navigate('/network-error');
							blockUI.stop();
						}
					}
				}
			);
		};
		$scope.navigate = navigator.navigate;
        } else {
                navigator.navigate('/login');
        }
}]);

winesControllers.controller('WinesDetailCtrl', ['$scope', 'navigator', '$routeParams', 'Wines', 'Wineries', 'linkedIn', 'blockUI',  function($scope, navigator, $routeParams, Wines, Wineries, linkedIn, blockUI) {
        if (linkedIn.authenticated()) {
		$scope.nameError = false;
		$scope.wine = Wines.get({token: linkedIn.token, _id: $routeParams._id}, 
			function() {
				// SUCCESS
				$scope.winery = Wineries.get({token: linkedIn.token, _id: $scope.wine.winery},
					function() {
						// SUCCESS
						$scope.wineName = $scope.wine.name;
					},
					function() {
						// ERROR
						if (res.status == 403) {
							linkedIn.logout();
							navigator.navigate('/login');
						} else {
							navigator.navigate('/network-error');
						}
					}
				);
			},
			function() {
				// ERROR
				if (res.status == 403) {
					linkedIn.logout();
					navigator.navigate('/login');
				} else {
					navigator.navigate('/network-error');
				}
			}
		);
		$scope.updateWine = function() {
			blockUI.start();
			$scope.nameError = false;
			$scope.wine.name = $scope.wineName;
			$scope.wine.$update(
				{token: linkedIn.token},
				function() {
					// SUCCESS
					navigator.navigate('/wines');
					blockUI.stop();
				},
				function(res) {
					// ERROR
					if (res.status == 403) {
						linkedIn.logout();
						navigator.navigate('/login');
						blockUI.stop();
					} else {
						if (res.status == 400) {
							if (res.data.errors.name) { 
								$scope.nameError = true;
							}
							blockUI.stop();
						} else {
							navigator.navigate('/network-error');
							blockUI.stop();
						}
					}
				}
			);
		};
		$scope.deleteWine = function() {
			blockUI.start();
			$scope.wine.$delete(
				{token: linkedIn.token},
				function() {
					// SUCCESS
					navigator.navigate('/wines');
					blockUI.stop();
				},
				function() {
					// ERROR
					if (res.status == 403) {
						linkedIn.logout();
						navigator.navigate('/login');
						blockUI.stop();
					} else {
						navigator.navigate('/network-error');
						blockUI.stop();
					}
				}
			);
		};
		$scope.navigate = navigator.navigate;
        } else {
                navigator.navigate('/login');
        }
}]);
