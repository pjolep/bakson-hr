

angular.module('directives').directive('sideBar', function(){
    return {
        restrict : 'E',
        templateUrl : 'templates/sideBarDirective.html',
        scope : {
            data1 : '='
        },
        link : function(scope, el, attr){

        }
    }
});

angular.module('directives').directive('list', function(){
    return {
        restrict : 'E',
        scope : {
            data2 : '='
        },
        templateUrl : 'templates/sideBarListDirective.html',
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