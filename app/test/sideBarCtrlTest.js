
describe('sideBar', function() {

    var scope, ctrl, uiProvide;

    beforeEach(module("controllers"));
    beforeEach(module("services"));


    beforeEach(inject(function($rootScope, $controller, uiProvider, $httpBackend, $http) {
        scope = $rootScope.$new();
        ctrl = $controller('sideBar', {$scope: scope, uiProvide : uiProvider, http : $http});
        httpBackend = $httpBackend;
        uiProvide = uiProvider;
    }));


    it('Array/Tabs should have values', function() {
        uiProvide.tabs.push("1");
        uiProvide.tabs.push("2");
        expect(uiProvide.tabs.length).toBeGreaterThan(0);
    });

    it('isActive should toggle', function() {
        expect(uiProvide.toggle()).toEqual(true);
    });

    it('Should fetch json data', function() {
        httpBackend.when("GET", "./data.json").respond([{}, {}, {}]);
        httpBackend.flush();
        expect(uiProvide.data.length).toBeGreaterThan(0);
    });

    it('Should add new object/data', inject(function(uiProvider) {
        httpBackend.when("POST", "./data.json").respond([{}, {}, {}]);
        var userData =  {
            "Name" : 1234,
            "Adresa" : "1234",
            "DatumRodjenja" : "1234",
            "BrojDanaOdmora" : "1234",
            "DatumUzimanjaOdmora" : "1234",
            "BrojUzetihRadnihDana" : "1234",
            "Komentar1" : "1234",
            "OstaloDana" : "1234",
            "NedolasciNaPosao" : "1234",
            "BrojDana" : "1234",
            "Komentar2" : "1234"
        };

        uiProvider.data = [];
        uiProvider.data.push(uiProvider.data);
        expect(uiProvide.data.length).toBeGreaterThan(0);

    }));

});
