'use strict';

angular.module('jhipsterApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('article', {
                parent: 'entity',
                url: '/articles',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'jhipsterApp.article.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/article/articles.html',
                        controller: 'ArticleController'
                    }
                }
            })
            .state('article.detail', {
                parent: 'entity',
                url: '/article/{id}',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'jhipsterApp.article.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/article/article-detail.html',
                        controller: 'ArticleDetailController'
                    }
                }
            })
            .state('article.new', {
                parent: 'article',
                url: '/new',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/article/article-dialog.html',
                        controller: 'ArticleDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {title: null, subtitle: null, path: null, date: null, id: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('article', null, { reload: true });
                    }, function() {
                        $state.go('article');
                    })
                }]
            })
            .state('article.edit', {
                parent: 'article',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/article/article-dialog.html',
                        controller: 'ArticleDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Article', function(Article) {
                                return Article.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('article', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
