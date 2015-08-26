'use strict';

angular.module('jhipsterApp')
.controller('MainController', function ($scope, Principal, $timeout, $http, $state) {
	Principal.identity().then(function(account) {
		$scope.account = account;
		$scope.isAuthenticated = Principal.isAuthenticated;
	});
	
	$http.get('/api/articles').then(function(result) {
		$scope.articles = result.data;
		angular.forEach($scope.articles, function(value, key) {
			value.pathToMd = "assets/article/" + value.path + ".md";
		})
	});
	
	$scope.isAuthenticated = Principal.isAuthenticated;
    $scope.$state = $state;

	$scope.moveSectionDown = function() {
		$.fn.fullpage.moveSectionDown();
	}

	var waitForRenderAndDoSomething = function() {
		if($http.pendingRequests.length > 0) {
			$timeout(waitForRenderAndDoSomething);
		} else {

			angular.element('.md table').addClass('table');

			angular.forEach(angular.element(".board"), function(value, key) {
				var a = angular.element(value);
				ChessBoard(a.attr('id') , a.attr('id'));
			});

			angular.forEach(angular.element(".plot"), function(value, key) {
				var a = angular.element(value);
				a.append('<iframe width="500" height="400" frameborder="0" seamless="seamless" scrolling="no" src="https://plot.ly/~' + a.attr('id') + '/.embed?width=500&height=400"></iframe>');
			});

		}
	}
	$timeout(waitForRenderAndDoSomething);

});
