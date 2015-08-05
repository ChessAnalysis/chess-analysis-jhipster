'use strict';

angular.module('jhipsterApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('rapport', {
                parent: 'site',
                url: '/rapport',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/rapport/rapport.html',
                        controller: 'RapportController'
                    }
                },
                resolve: {
                    
                }
            });
    });
