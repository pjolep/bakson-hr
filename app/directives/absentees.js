angular.module('directives').directive('tabs', function(uiProvider){
    return {
        restrict : 'AE',
        templateUrl : 'view/templates/absentees.html',
        link : function(scope, el, attr){
            var inputs, select;

            function inputValidation(){
                inputs = el.find('input');
                select = el.find('select');
                for(var i = 0; i < inputs.length; i++){
                    if(inputs[i].value.length === 0){
                        $(inputs[i]).addClass('inputError');
                    }else{
                        $(inputs[i]).removeClass('inputError');
                    }
                }
                for(var j = 0; j < select.length; j++){
                    if(select[j].options[0].value === '? string: ?'){
                        $(select[j]).addClass('inputError');
                    }else{
                        $(select[j]).removeClass('inputError');
                    }
                }
            }

            el.bind('click', function() {
                inputValidation();
            });
            el.bind('keypress', function () {
                inputValidation()
            });

            scope.getDaysTaken = function(){
                uiProvider.getDates()
            }

        }
    }
});