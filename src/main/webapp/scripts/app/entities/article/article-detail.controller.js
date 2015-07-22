'use strict';

angular.module('jhipsterApp')
    .controller('ArticleDetailController', function ($scope, $rootScope, $stateParams, entity, Article, Category) {
        $scope.article = entity;
        $scope.load = function (id) {
            Article.get({id: id}, function(result) {
                $scope.article = result;
            });
        };
        $rootScope.$on('jhipsterApp:articleUpdate', function(event, result) {
            $scope.article = result;
        });
        
    });
