angular.module('directives').directive('appContainer', function(uiProvider){
    return {
        restrict : 'AE',
        templateUrl : 'view/templates/appContainer.html',
        link : function(scope){
            scope.sidebarOpen = false;
            
            scope.isSidebarOpen = function() {
                return scope.sidebarOpen;
            };
        }
    }
});