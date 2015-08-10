'use strict';

angular.module('jhipsterApp')
.controller('MainController', function ($scope, Principal, $timeout, $http) {
	Principal.identity().then(function(account) {
		$scope.account = account;
		$scope.isAuthenticated = Principal.isAuthenticated;
	});

	$scope.moveSectionDown = function() {
		$.fn.fullpage.moveSectionDown();
	}

	$http.get('/api/service/getMdFiles').
	then(function(response) {
		$scope.mdFiles = response.data;

	}, function(response) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
	});


	var waitForRenderAndDoSomething = function() {
		if($http.pendingRequests.length > 0) {
			$timeout(waitForRenderAndDoSomething);
		} else {

			angular.forEach(angular.element(".md"), function(value, key) {
				var a = angular.element(value);
				a.find('h2').append(' <a href="/#/article/' + a.attr('ng-param').split('/')[3] + '" class="btn-lg"><span class="glyphicon glyphicon-zoom-in"></span></a>');
			});

			angular.element("#fullpage").fullpage({
				'verticalCentered': false,
				'css3': true,
				'navigation': true,
				'navigationPosition': 'right',
				'navigationTooltips': ['Home', 'Insights', 'Motivations', 'Documentation'],
			});

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
