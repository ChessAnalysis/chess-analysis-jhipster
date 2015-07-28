'use strict';

angular.module('jhipsterApp')
    .controller('ArticleDetailController', function ($scope, $timeout, $http, $rootScope, $stateParams, entity, Article, Category) {
        $scope.article = entity;
        $scope.load = function (id) {
            Article.get({id: id}, function(result) {
                $scope.article = result;
            });
        };
        $rootScope.$on('jhipsterApp:articleUpdate', function(event, result) {
            $scope.article = result;
        });
        
        var waitForRenderAndDoSomething = function() {
      	  if($http.pendingRequests.length > 0) {
      	      $timeout(waitForRenderAndDoSomething); // Wait for all templates to be loaded
      	  } else {
      		var ruyLopez = 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R';
      		var board = ChessBoard('board', ruyLopez);
      	  }
      	}
      $timeout(waitForRenderAndDoSomething);
    });
