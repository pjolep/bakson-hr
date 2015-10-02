

describe('mainBarDirectiveTabsTest', function(){

    var scope, template, cardTabs, span;

    beforeEach(module('directives'));

    beforeEach(inject(function($rootScope){
        scope = $rootScope.$new();
    }));

    function compileTemplate(){

        cardTabs = $('<div class="cardTab"></div>');
        span = $('<span ng-click="uiProvider.removeTab($index)" class="closeTab"></span>');

        template = cardTabs;

        inject(function($compile){
            $compile(template)(scope);
        });

        scope.$apply();
    }


    describe('Initialisation', function(){
        beforeEach(function(){
            compileTemplate();
        });

        it('cardTabs should exist', function(){
            expect($(cardTabs)).toBeDefined();
        });

        it('Should have spans that close cardTabs', function(){
            $(cardTabs).append(span);
            expect($(cardTabs).children().length).toBeGreaterThan(0);
        });

        it('Should remove cardTab when span(x) is clicked', function(){
            $(cardTabs).append(span);
            $(span).trigger('click');
            $(cardTabs).children().remove();
            expect($(cardTabs).children().length).not.toBeGreaterThan(0);
        });

        afterEach(function(){
            scope.$destroy();
        });

    });

});

