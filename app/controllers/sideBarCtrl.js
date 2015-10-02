angular.module("controllers").controller("sideBar", function($scope, uiProvider){
    $scope.uiProvider = uiProvider;
    uiProvider.fetchData();
    $scope.toggle = function() {
        uiProvider.toggle();
    };
    $scope.addTab = function(){
        uiProvider.addTab(this);
    };
    $scope.addNew = function(){
        uiProvider.addNew(this);
    };
});