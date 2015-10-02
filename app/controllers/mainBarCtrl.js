angular.module("controllers").controller("mainView", function($scope, uiProvider) {
    $scope.uiProvider = uiProvider;
    $scope.removeTab = function(){
        uiProvider.removeTab(this);
    };
    $scope.dataMenu = function(){
        uiProvider.dataMenu(this);
    };
    $scope.getData = function() {
        uiProvider.getData(this);
    };
    $scope.saveData = function() {
        uiProvider.saveData(this);
    };
    $scope.removeName = function(){
        uiProvider.removeName(this);
    };
    $scope.Math = window.Math;
});


