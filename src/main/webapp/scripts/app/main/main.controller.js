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
			$timeout(waitForRenderAndDoSomething); // Wait for all templates to be loaded
		} else {

			angular.element("#fullpage").fullpage({
				'verticalCentered': false,
				'css3': true,
				'navigation': true,
				'navigationPosition': 'right',
				'navigationTooltips': ['Home', 'Insights', 'Motivations', 'Contact'],
			});

			$('.md table').addClass('table');

			angular.forEach(angular.element(".board"), function(value, key){
				var a = angular.element(value);
				ChessBoard(a.attr('id') , a.attr('id'));
			});

			angular.forEach(angular.element(".plot"), function(value, key){
				var a = angular.element(value);
				a.append('<iframe width="640" height="480" frameborder="0" seamless="seamless" scrolling="no" src="https://plot.ly/~' + a.attr('id') + '/.embed?width=640&height=480"></iframe>');
			});

		}
	}
	$timeout(waitForRenderAndDoSomething); // Waits for first digest cycle*/

});
