'use strict';

angular.module('directives').directive('forceWindow', function($window) {
        return function($scope) {
            restrict:'A',
                $scope.initializeWindowSize = function() {
                    $scope.windowHeight = $window.innerHeight;
                    $scope.commentsHeight = $window.innerHeight - 570 + 'px';
                };
            $scope.initializeWindowSize();
            return angular.element($window).bind('resize', function() {
                $scope.initializeWindowSize();
                return $scope.$apply();
            });
        };
    });