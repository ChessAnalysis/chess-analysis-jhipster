'use strict';

angular.module('jhipsterApp')
.controller('RapportController', function ($scope, Principal, $timeout, $http) {
	
	var styleSheets = document.styleSheets;
	for (var i = 0; i < styleSheets.length; i++) {
		if(styleSheets[i].href != null) {
			console.log(styleSheets[i].href.indexOf("bower_components"));
		}
       if(styleSheets[i].href != null && 
    		   (styleSheets[i].href.indexOf("bower_components") > -1
    				   || styleSheets[i].href.indexOf("main.css") > -1)) {
    	   styleSheets[i].disabled = true;
    	   console.log('disabled !!');
       }
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

			$('.md table').addClass('table');

			angular.forEach(angular.element(".board"), function(value, key){
				var a = angular.element(value);
				ChessBoard(a.attr('id') , a.attr('id'));
			});

		}
	}
	$timeout(waitForRenderAndDoSomething); // Waits for first digest cycle*/

});
