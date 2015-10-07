

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
            var input = el.find('input')[0],
                submit = el.find('input')[1];
            submit.addEventListener("click", function() {
                if(input.value.length > 2){
                    input.value = "";
                }
            });
            $(input).keypress(function(event) {
                if ( event.which == 13 ) {
                    event.preventDefault();
                    if(input.value.length > 2){
                        input.value = "";
                    }
                }
            });

            var li = el.find('list');
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
