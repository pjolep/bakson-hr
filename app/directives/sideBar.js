

angular.module('directives').directive('sideBar', function(){
    return {
        restrict : 'E',
        templateUrl : 'view/templates/sideBar.html',
        scope : {
            employees : '='
        },
        link : function(scope, el, attr){

        }
    }
});


//- Rescrict

//1. 'A' - 'Attribute'
//2. 'E' - 'Element'
//3. 'C' - 'Class'
//4. 'M' - 'Comment'

//- Require

//1. require: '^ngModel',

//- Template

//1.
