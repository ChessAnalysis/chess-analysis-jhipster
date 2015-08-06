'use strict';

angular.module('jhipsterApp')
.controller('ArticleController', function ($scope, Principal, $timeout, $http, $stateParams) {
	
	console.log($stateParams.article);
	$scope.md = "/assets/resources/ " + $stateParams.article;

	var waitForRenderAndDoSomething = function() {
		if($http.pendingRequests.length > 0) {
			$timeout(waitForRenderAndDoSomething); // Wait for all templates to be loaded
		} else {

			$('.md table').addClass('table');

			angular.forEach(angular.element(".board"), function(value, key){
				var a = angular.element(value);
				ChessBoard(a.attr('id') , a.attr('id'));
			});

		}
	}
	$timeout(waitForRenderAndDoSomething); // Waits for first digest cycle*/

});
