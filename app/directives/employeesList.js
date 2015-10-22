
angular.module('directives').directive('employeesList', function(uiProvider){
    return {
        restrict : 'E',
        scope : {
            employees : '='
        },
        templateUrl : 'view/templates/employeesList.html',
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
            
            scope.addNewEmployee = function() {
                var employeeName = $("#employeeName");
                uiProvider.addNewEmployee(employeeName.val());
            };
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
