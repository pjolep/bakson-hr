angular.module("controllers").controller("sideBar", function($scope, uiProvider){
    $scope.uiProvider = uiProvider;
    uiProvider.fetchEmployees();
    $scope.toggle = function() {
        uiProvider.toggle();
    };
    $scope.showEmployee = function(id){
        uiProvider.showEmployee(id);
    };
});