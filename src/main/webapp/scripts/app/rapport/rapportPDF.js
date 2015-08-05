'use strict';

angular.module('jhipsterApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('rapportPDF', {
                parent: 'site',
                url: '/rapportPDF',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/rapport/rapportPDF.html',
                        controller: 'RapportPDFController'
                    }
                },
                resolve: {
                    
                }
            });
    });
