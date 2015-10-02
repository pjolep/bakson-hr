


angular.module('directives').directive('toggle', function(uiProvider){
    return {
        restrict : 'E',
        templateUrl : 'templates/sideBarToggleDirective.html',
        scope : {
            data1 : '='
        },
        link : function(scope, el, attrs){
            var icon = el.find('i'), switcher = true;
            el.bind('click', function() {
                if(switcher){
                    $(icon).attr('class', 'fa fa-angle-double-right fa-2x');
                    switcher = false;
                }else{
                    $(icon).attr('class', 'fa fa-angle-double-left fa-2x');
                    switcher = true;
                }
            });
        }
    }
});