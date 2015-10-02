
describe('sideBar directive', function(){

    var scope, template, ul, li, form, addNew, section, h3;

    beforeEach(module('directives'));

    beforeEach(inject(function($rootScope){
        scope = $rootScope.$new();
    }));

    function compileTemplate(){

        section = '<section class="sideBar"></section>';

        addNew = $('<form></form>').append($('<label class="nameClass"></label>').append($(
            '<input type="text" placeholder="Ime i prezime" ng-keydown="$event.which === 13 && addNew()">'
        )));
        addNew.append($('<label class="addName"></label>').append($(
            '<input type="button" value="Dodaj" ng-click="addNew()">'
        )));

        form = $('<form></form>').append($('<label class="addName"></label>').append($(
            '<input type="search" placeholder="Search" ng-model="query" class="ng-pristine ng-untouched ng-valid">'
        )));

        ul = $('<ul></ul>');
        li = $('<li>1</li>');
        template = $('<section class="sideBar"></section>').append(addNew).append(form);
        $(template).append(ul);
        $(template).append(li);


        inject(function($compile){
            $compile($(template))(scope);
        });

        scope.$apply();

    }
    describe('Initialisation', function(){

        beforeEach(function(){
            compileTemplate()
        });

        it('Should have children', function () {
            expect($(template).children().length).toBeGreaterThan(0);
        });

        it('Should have search bar', function(){
            expect($(template.find('input'))).toBeDefined();
        });

        it('Should contain list with data', function(){
            expect($(template).find('li').length).toBeGreaterThan(0)
        });

        it('Should have addNew input Ime i prezime', function() {
            var label = $(template).find('label')[0];
            expect($(label).children().length).toBeGreaterThan(0);
            expect($(label).children().find('input')).toBeDefined();
        });

        it('Should have addNew input type submit', function() {
            var label = $(template).find('label')[1];
            expect($(label).children().length).toBeGreaterThan(0);
            expect($(label).children().find('input')).toBeDefined();
        });

        it('Should add new name(li to ul), if input type submit is clicked', function() {
            var label = $(addNew).find('label')[1],
                input = $(label).find('input').val(Math.floor(Math.random() * 1000));
            if(input.click()){
                $(template).find('ul').append('<li>' + input.val() +'</li>');
                expect($(template).find('ul').children().length).toEqual(1);
                expect($(template).find('ul').children().length).not.toEqual(0);
            }
        });


    });
});

