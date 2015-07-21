'use strict';

angular.module('jhipsterApp').controller('ArticleDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Article', 'Category',
        function($scope, $stateParams, $modalInstance, entity, Article, Category) {

        $scope.article = entity;
        $scope.categorys = Category.query();
        $scope.load = function(id) {
            Article.get({id : id}, function(result) {
                $scope.article = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('jhipsterApp:articleUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.article.id != null) {
                Article.update($scope.article, onSaveFinished);
            } else {
                Article.save($scope.article, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
