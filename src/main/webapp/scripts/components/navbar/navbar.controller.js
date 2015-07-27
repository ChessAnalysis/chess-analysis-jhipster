'use strict';

angular.module('jhipsterApp')
    .controller('NavbarController', function ($scope, $location, $state, Auth, Principal) {
        $scope.isAuthenticated = Principal.isAuthenticated;
        $scope.$state = $state;

        $scope.logout = function () {
            Auth.logout();
            $state.go('home');
        };
        
    });

angular.module('jhipsterApp').filter("property", ["$filter", function($filter){
    var parseString = function(input){
        return input.split(".");
    }

    function getValue(element, propertyArray) {
        var value = element;

        angular.forEach(propertyArray, function(property) {
            value = value[property];
        });

        return value;
    }

    return function (array, propertyString, target) {
        var properties = parseString(propertyString);

        return $filter('filter')(array, function(item){
            return getValue(item, properties) == target;
        });
    }
}]);