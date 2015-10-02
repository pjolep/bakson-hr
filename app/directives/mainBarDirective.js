angular.module('directives').directive('mainBar', function(){
    return {
        restrict : 'AE',
        templateUrl : 'templates/mainBarDirective.html',
        link : function(scope, el, attr){

        }
    }
});



angular.module('directives').directive('resizable', function($window) {
    return function($scope) {
        $scope.initializeWindowSize = function() {
            $scope.windowHeight = $window.innerHeight;
            return $scope.windowWidth = $window.innerWidth;
        };
        $scope.initializeWindowSize();
        return angular.element($window).bind('resize', function() {
            $scope.initializeWindowSize();
            return $scope.$apply();
        });
    };
});
