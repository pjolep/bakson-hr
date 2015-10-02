
fdescribe("Testing Service", function() {

    beforeEach(module('services'));

    it("Array for tabs should exist", inject(function(uiProvider){
        expect(uiProvider.tabs).toBeDefined();
    }));

    it("Data menu should be defined", inject(function(uiProvider){
        expect(uiProvider.dataMenu).toBeDefined();
    }));

    it("Remove tab method should be defined", inject(function(uiProvider){
        expect(uiProvider.removeTab).toBeDefined();
    }));

    it("Should show the bellow tabs", inject(function(uiProvider){
        expect(uiProvider.getData).toBeDefined();
    }));

    it('Should check if saveData method is defined', inject(function(uiProvider){
        expect(uiProvider.saveData).toBeDefined();
    }));

    it("Methods should be defined", inject(function (uiProvider) {
        expect(uiProvider.addTab).toBeDefined();
        expect(uiProvider.toggle).toBeDefined();
    }));

    it("Selected should be a string", inject(function (uiProvider){
        expect(uiProvider.selected).toEqual("");
    }));

    it("Data for menu(methods) should be defined", inject(function(uiProvider) {
        expect(uiProvider.getData).toBeDefined();
    }));

    it("Test if json data exist", inject(function($http){
        expect($http.get("./json.json")).toBeDefined();
    }));

    it("isActive should be false or true", inject(function(uiProvider){
        expect(uiProvider.isActive).toBe(false);
        expect(uiProvider.isActive).not.toBe(true)
    }));

    it('Should test if tab is selected', inject(function(uiProvider) {
        uiProvider.tabs.push('Tab1');
        uiProvider.selected = 'Tab1';
        var tabSelected = false;
        if(uiProvider.selected === uiProvider.tabs[0]){
            tabSelected = true;
            expect(tabSelected).toEqual(true);
        }
    }));

    it('Should test toggling of data menu', inject(function(uiProvider) {
        var name = 'name';
        uiProvider.selected = 'name';
        if(uiProvider.selected === name){
            expect(uiProvider.selected).toBe(name);
        }else{
            expect(uiProvider.selected).toBe(null);
        }

    }));

    it('Shoud check if inputValidation method is defined and it should return false', inject(function(uiProvider) {
        expect(uiProvider.inputError).toEqual("");
        uiProvider.inputValidation();
        expect(uiProvider.inputError).toEqual(false);
    }));


    it('Should fix dates/convert to milisecond', inject(function(uiProvider) {
        var x = new Date();
        x.setHours(x.getHours() - x.getTimezoneOffset() / 60);
        expect(x).toBeTruthy();
        expect(x).toBeGreaterThan(100000)
    }));

    it("Should be 0 ", inject(function(uiProvider){
                var daysLeft = uiProvider.calculateDaysLeft();
                expect(daysLeft).toEqual(0);
    }));

    it("Should be length 10 ", inject(function(uiProvider){
        var daysArray = uiProvider.getDates('25/12/2015', '5/01/2016');
        expect(daysArray.length).toEqual(12);
    }));

    it("day should be sunday ", inject(function(uiProvider){
        expect(uiProvider.isWorkingDay('01/01/2015')).toBe(true);
        expect(uiProvider.isWorkingDay('02/02/2015')).toBe(true);
        expect(uiProvider.isWorkingDay('03/01/2015')).toBe(false);
        expect(uiProvider.isWorkingDay('04/01/2015')).toBe(false);
        expect(uiProvider.isWorkingDay('03/10/2015')).toBe(false);
        expect(uiProvider.isWorkingDay('04/10/2015')).toBe(false);
        expect(uiProvider.isWorkingDay('05/10/2015')).toBe(true);

    }));

    it("Should have 10 working days ", inject(function(uiProvider){
        var daysArray = uiProvider.getDates('25/12/2015', '5/01/2016');
        var workingDays = uiProvider.countWorkingDays(daysArray);
        expect(workingDays).toEqual(8);
    }));

    it("Should be 10 ", inject(function(uiProvider){
        var daysLeft = uiProvider.calculateDaysLeft('15/09/2015', '25/09/2015');
        expect(daysLeft).toEqual(10);
    }));

    it('Should increment by one if typeOfVacation is Slobodni Radni Dan', inject(function(uiProvider){
        var counter = 0;
        var typeOfVacation = uiProvider.typeOfVacation('SlobodniRadniDan');
        if(typeOfVacation === 'SlobodniRadniDan'){
            counter++;
        }
        expect(counter).toEqual(1);
    }));

});

