'use strict';

angular.module('jhipsterApp')
.controller('ArticleController', function ($scope, Category, Article) {
	$scope.articles = [];
	$scope.loadAll = function() {
		Article.query(function(result) {
			$scope.articles = result;
		});
	};
	$scope.loadAll();

	$scope.delete = function (id) {
		Article.get({id: id}, function(result) {
			$scope.article = result;
			$('#deleteArticleConfirmation').modal('show');
		});
	};

	$scope.confirmDelete = function (id) {
		Article.delete({id: id},
				function () {
			$scope.loadAll();
			$('#deleteArticleConfirmation').modal('hide');
			$scope.clear();
		});
	};

	$scope.refresh = function () {
		$scope.loadAll();
		$scope.clear();
	};

	$scope.clear = function () {
		$scope.article = {title: null, date: null, shortDescription: null, longDescription: null, sort: null, icon: null, id: null};
	};

	$scope.categories = Category.query();

	$scope.showTable = function (e) {
		$scope.currentCategory = e;
	}
});
