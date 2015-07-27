'use strict';

angular.module('jhipsterApp')
    .controller('CategoryController', function ($scope, Category) {
        $scope.categorys = [];
        $scope.loadAll = function() {
            Category.query(function(result) {
               $scope.categorys = result;
            });
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Category.get({id: id}, function(result) {
                $scope.category = result;
                $('#deleteCategoryConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Category.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteCategoryConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.category = {name: null, sort: null, icon: null, id: null};
        };
    });
