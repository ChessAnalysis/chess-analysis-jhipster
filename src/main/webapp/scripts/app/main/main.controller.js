'use strict';

angular.module('jhipsterApp')
.controller('MainController', function ($scope, $location, $anchorScroll, Principal, $http, $timeout) {
	Principal.identity().then(function(account) {
		$scope.account = account;
		$scope.isAuthenticated = Principal.isAuthenticated;
	});

	$scope.go = function(page) {
		$location.hash(page);
		$anchorScroll();
	}

	$('.carousel').carousel({
		interval: 50000
	})

	$scope.prevItem = function() {
		$('.carousel').carousel('prev');
	}

	$scope.nextItem = function() {
		$('.carousel').carousel('next');
	}

	var waitForRenderAndDoSomething = function() {
		if($http.pendingRequests.length > 0) {
			$timeout(waitForRenderAndDoSomething); // Wait for all templates to be loaded
		} else {
			$('.carousel table').addClass('table');
			
			var board = angular.element(document.querySelector( '#board' ));
			ChessBoard('board', board.attr('class'));
		}
	}
	$timeout(waitForRenderAndDoSomething); // Waits for first digest cycle

});
