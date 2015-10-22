


//fdescribe('Data tabs directive test', function() {
//
//    var scope, compile, directiveElem, test;
//
//    beforeEach(function() {
//        module('directives');
//        inject(function($compile, $rootScope, $httpBackend, $templateCache){
//            compile = $compile;
//            scope = $rootScope.$new();
//        });
//
//        directiveElem = getCompiledElement();
//
//    });
//
//    function getCompiledElement(){
//        var element = angular.element('<tabs></tabs>');
//        var compiledElement = compile(element)(scope);
//        scope.$apply();
//        return compiledElement;
//    }
//
//    it('Should return some data', function() {
//        console.log(directiveElem);
//    });
//
//});