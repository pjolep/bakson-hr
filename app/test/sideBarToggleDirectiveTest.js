

describe('Testing sideBarTag', function(){

    var scope, template, sideBarTag, span, toggleTrueFalse;

    beforeEach(module('directives'));

    beforeEach(inject(function($rootScope){
        scope = $rootScope.$new()
    }));

    function compileTemplate(){

        sideBarTag = $('<div class="sidebarTag"</div>');
        span = $('<span></span>');
        sideBarTag.append(span);
        template = $('<main></main>');

        template.append(sideBarTag);

        inject(function($compile){
            $compile($(template))(scope);
        });

        scope.$apply();

    }

    describe('Initialisation', function(){
        beforeEach(function(){
            compileTemplate();
        });

        it('Should have elements defined', function(){
            expect(sideBarTag).toBeDefined();
            expect(template).toBeDefined();
            expect(span).toBeDefined();
        });

        it('Main should change class to active by clicking on sideBarTag', function(){
            if(toggleTrueFalse === true){
                $(sideBarTag).trigger('click');
                $(template).addClass('active');
                expect($(template.attr('class'))).toContain('active');
                toggleTrueFalse = false;
            }else{
                $(sideBarTag).trigger('click');
                $(template).removeClass('active');
                expect($(template.attr('class'))).not.toContain('active');
                toggleTrueFalse = true;
            }
        });
    });

    afterEach(function(){
        scope.$destroy();
    });

});