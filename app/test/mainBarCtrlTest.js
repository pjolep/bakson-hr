

describe('mainBarCtrl Test', function(){

    var scope, ctrl, uiProvide;

    beforeEach(module('controllers'));
    beforeEach(module('services'));

    beforeEach(inject(function($rootScope, $controller, uiProvider) {
        scope = $rootScope.$new();
        ctrl = $controller('mainView', {$scope: scope, uiProvide : uiProvider});
        uiProvide = uiProvider;
    }));

    it('Should remove the tab', function(){
        uiProvide.tabs.push(1);
        expect(uiProvide.tabs.length).toBeGreaterThan(0);
        uiProvide.tabs.pop();
        expect(uiProvide.tabs.length).toBeLessThan(1);
    });

    it('Should show menu when tab is clicked', function(){
        uiProvide.selected = 'SomeString';
        if(uiProvide.selected === "SomeString"){
            uiProvide.selected = null;
            expect(uiProvide.selected).toEqual(null);
        }else{
            expect(uiProvide.selected).toEqual('SomeString');
        }
    });

    it('Should show tabs', function(){
        if(uiProvide.tabs.length === 0){
            for(var i = 0; i < 10; i++){
                uiProvide.tabs.push(i);
            }
            expect(uiProvide.tabs.length).toBeGreaterThan(0)
        }else{
            expect(uiProvide.tabs).toEqual([]);
        }
    });

    it('Should have saveData method Defined', function() {
        expect(uiProvide.saveData).toBeDefined();
    });

    it('Should have removeName method Defined', function() {
        expect(uiProvide.removeName).toBeDefined();
    });




});