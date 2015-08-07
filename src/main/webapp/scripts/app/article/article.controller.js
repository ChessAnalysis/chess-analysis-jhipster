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
			
			angular.forEach(angular.element(".plot"), function(value, key) {
				var a = angular.element(value);
				a.append('<iframe width="500" height="400" frameborder="0" seamless="seamless" scrolling="no" src="https://plot.ly/~' + a.attr('id') + '/.embed?width=500&height=400"></iframe>');
			});

		}
	}
	$timeout(waitForRenderAndDoSomething); // Waits for first digest cycle*/


	$scope.labels = ["A00","A04","A05","A15","A40","A45","A46","B01","B06","B22","B23","B33","B40","B90","C00","D02"];
	$scope.series = ['Openings'];
	$scope.data = [
	               [68848,64539,50353,51714,51560,55619,56712,78271,73414,75995,60032,54638,56517,50568,55061,69214],
	               ];

});
