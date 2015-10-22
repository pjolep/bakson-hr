describe('Testing mainBar', function() {

    var scope, section, compile, compiledElement, element, divLeft, divRight,
        removeForm, saveForm;

    beforeEach(module('directives'));

    beforeEach(inject(function($compile, $rootScope, $httpBackend) {
        compile = $compile;
        scope = $rootScope.$new();
        $httpBackend.whenGET('view/templates/mainBarDirective.html').respond(200, '');
    }));

    function compileTemplate(){

        element = angular.element('<main-bar></main-bar>');
        compiledElement = compile(element)(scope);

        section = $('<section class="qwerty" ng-if="uiProvider.getSelectedEmployee()"></section>');
        divLeft = $('<div class="qwertyColleft"></div>');
        divRight = $('<div class="qwertyColright"></div>');
        removeForm = $('<form method="post" action="/remove" class="save"></form>');
        saveForm = $('<form method="post" action="/save" class="save"></form>');
        $(section).append(divLeft);
        $(section).append(divRight);
        $(section).append(removeForm);
        $(section).append(saveForm);
        compiledElement.append(section);

        scope.$apply();

    }


    beforeEach(function() {
        compileTemplate()
    });

    it('Section should be defined', function() {
        expect(compiledElement.find('section')).toBeDefined();
    });

    it('Section should have class qwerty', function() {
        expect(compiledElement.find('section').attr('class')).toContain('qwerty')
    });

    it('Should contain two forms', function() {
        expect(compiledElement.find('form').length).toBeGreaterThan(1);
        expect(compiledElement.find('form').length).not.toBeGreaterThan(2);
    });

    it('Should containt two div containers for data (qwertyColleft/qwertyCollRight)', function() {
        expect(compiledElement.find('div').length).toBeGreaterThan(1);
        expect(compiledElement.find('form').length).not.toBeGreaterThan(2)
    });

});
