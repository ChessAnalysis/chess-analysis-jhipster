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
    			var board = angular.element(document.querySelector( '#board' ));
    			ChessBoard('board', board.attr('class'));
    		}
    	}
    	$timeout(waitForRenderAndDoSomething); // Waits for first digest cycle*/
    	
    });
