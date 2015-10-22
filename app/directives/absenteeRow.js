angular.module('directives').directive('absenteeRow', function(uiProvider, $http){
    return {
        restrict : 'AE',
        templateUrl : 'view/templates/absenteeRow.html',
        scope : {
            row : '=',
            index : '@',
            last : '@',
            first : '@'
        },
        link : function(scope, el, attrs){

            scope.deleteRow = function($event){
                if(confirm('Da li ste sigurni da zelite da obrisete red?')){
                    $(el).on('click', function(event){
                            event.preventDefault();
                            el.remove();
                            uiProvider.getEmployee().Absentee.splice(
                                uiProvider.getEmployee().Absentee.indexOf(scope.row), 1
                            );
                            uiProvider.removeAbsenteeRow(scope.row, $event);
                            uiProvider.calculateDates();
                    });
                }
            }

        }
    }
});