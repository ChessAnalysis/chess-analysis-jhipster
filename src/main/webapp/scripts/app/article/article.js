'use strict';

angular.module('jhipsterApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('article', {
                parent: 'site',
                url: '/article/:article',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/article/article.html',
                        controller: 'ArticleController'
                    }
                },
                resolve: {
                    
                }
            });
    });
