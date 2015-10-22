angular.module("controllers").controller("mainView", function($scope, uiProvider) {
    $scope.uiProvider = uiProvider;
    $scope.removeTab = function(index){
        uiProvider.removeEmployees(index);
    };
    $scope.toggleTab = function(){
        uiProvider.toggleTab(this);
    };
    $scope.saveEmployee = function() {
        uiProvider.saveEmployee(this);
    };
    $scope.removeEmployee = function(){
        uiProvider.removeEmployee(this);
    };
    $scope.Math = window.Math;
});


