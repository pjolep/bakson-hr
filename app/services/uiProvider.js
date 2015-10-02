angular.module("services").factory("uiProvider", ['$http', function ($http) {

    function _getDates(startDate, stopDate) {
        var dateArray = [];
        var startDateSplit = startDate.split('/'),
            stopDateSplit = stopDate.split('/');
        var currentDate = moment(startDateSplit[2] + '-' + (startDateSplit[1]) + '-' + startDateSplit[0]),
            endDate = moment(stopDateSplit[2] + '-' + (stopDateSplit[1]) + '-' + stopDateSplit[0]);
        var diffDays = Math.abs(moment(currentDate).diff(moment(endDate), 'days'));
        while (diffDays >= 0) {
            dateArray.push(moment(currentDate).format('DD/MM/YYYY'));
            currentDate = moment(currentDate).add(1, 'days');
            diffDays = diffDays - 1;
        }
        return dateArray;
    }

    function _isWorkingDay(day){
        var daySplit = day.split('/');
        var date = new Date(daySplit[2], daySplit[1] - 1, daySplit[0]);
        var res = (date.getDay() !== 6 && date.getDay() !== 0);
        return res;
    }

    function _countWorkingDays(daysArray) {
        if (daysArray === undefined || daysArray.length === 0) return 0;
        var workingDays = daysArray.filter(function(date){
            return _isWorkingDay(date);
        });
        return workingDays.length;
    }


    var calcDaysLeft = function (dateFrom, dateTo) {
        if (dateFrom === undefined || dateTo === undefined) return 0;
        var dateFrom = dateFrom.split('/');
        var dateTo = dateTo.split('/');

        return 10;
    };

    return {

        data: null,

        tabs: [],

        DatesComments: [],

        inputError: "",

        inputValidationError: "",

        isActive: false,

        selected: "",

        activateSideTab: false,

        outerScope: false,

        calculateDaysLeft: function (dateFrom, dateTo) {
            return calcDaysLeft(dateFrom, dateTo);
        },

        getDates: function (startDate, stopDate) {
            return _getDates(startDate, stopDate);
        },

        countWorkingDays: function (daysArray){
          return _countWorkingDays(daysArray);
        },

        isWorkingDay: function(day){
            return _isWorkingDay(day);
        },

        fetchData: function () {
            var t = this;
            $http.get("./data.json").success(function (d) {
                t.data = d;
            });
        },

        addTab: function (scope, $index) {
            if (this.tabs.indexOf(scope.i) === -1) {
                this.tabs.push(scope.i);
                this.selected = scope.i.Name;
            }
        },

        toggle: function () {
            return this.isActive = !this.isActive;
        },

        removeTab: function ($index, scope) {
            this.tabs.splice($index, 1);
            if (($index) === this.tabs.length) {
                return false;
            }
        },

        dataMenu: function (scope) {
            if (this.selected === scope.i.Name) {
                this.selected = null;
            } else {
                this.selected = scope.i.Name;
            }
        },

        getData: function (scope) {
            for (var i = 0; i < this.tabs.length; i++) {
                if (this.selected === this.tabs[i].Name) {
                    return this.tabs[i];
                }
            }
            return null;
        },

        // addNew Employee

        addNew: function () {
            var userData = {
                "Name": $('.nameClass > input').val(),
                "Adresa": "",
                "DatumRodjenja": "",
                "BrojDanaOdmora": "",
                //"DatumUzimanjaOdmora" : "",
                "BrojUzetihRadnihDana": Number(""),
                "Komentar1": "",
                "OstaloDana": Number(""),
                "DatesComments": [],
                "Komentar2": ""
            };
            if (userData.Name.length === 0) {
                this.inputError = true;
                return false;
            }
            this.data.push(userData);
            return $http({url: '/save', method: "POST", withCredentials: true, data: userData});
        },

        inputValidation: function () {
            return this.inputError = false;
        },

        saveData: function (scope) {
            event.preventDefault();
            var data = {
                "Name": this.getData().Name,
                "Adresa": this.getData().Adresa,
                "DatumRodjenja": this.getData().DatumRodjenja,
                "BrojDanaOdmora": this.getData().BrojDanaOdmora,
                //"DatumUzimanjaOdmora" : this.fixDates(this.getData().DatumUzimanjaOdmora),
                "BrojUzetihRadnihDana": Number(this.getData().BrojUzetihRadnihDana),
                "Komentar1": this.getData().Komentar1,
                "OstaloDana": Number(this.getData().OstaloDana),
                "DatesComments": this.getData().DatesComments,
                "Komentar2": this.getData().Komentar2
            };

            for (var i = 0; i < data.DatesComments.length; i++) {
                if (data.DatesComments[i].date === undefined && data.DatesComments[i].comment === undefined) {
                    return false;
                }
            }

            return $http({url: '/save', method: "POST", withCredentials: true, data: data});
        },

        removeName: function () {
            event.preventDefault();
            if (confirm('Da li ste sigurni da zelite izbrisete zaposlenog?')) {
                var data = {
                    Name: this.selected
                };
                JSON.stringify(data);
                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i].Name === data.Name) {
                        this.data.splice(i, 1);
                    }
                }
                this.tabs.splice(this.tabs.indexOf(this.selected), 1);
                return $http({url: '/remove', method: "POST", withCredentials: true, data: data});
            } else {
                return false;
            }
        },

        addDate: function () {
            event.preventDefault();
            return this.getData().DatesComments.push({
                date: $('.date').val(),
                typeOfVacation: $('.typeOfVacation').val(),
                comment: $('.comment').val(),
                dateTo: $('.dateTo').val()
            });
        },

        calculateDates: function () {
            var ostaloDana = Number(this.getData().BrojDanaOdmora);
            var datesComments = this.getData().DatesComments;
            var sumUsedWorkingDays = 0;
            for (var i = 0; i < datesComments.length; i++) {
                if (datesComments[i].date === undefined) {
                    break;
                }
                var dateFrom = datesComments[i].date.split('/'),
                    dateTo = datesComments[i].dateTo.split('/');
                if (dateFrom[2] === moment().format('YYYY')) {
                    if (datesComments[i].typeOfVacation === 'Odmor') {
                        var days = this.getDates(datesComments[i].date, datesComments[i].dateTo);
                        var workingDays = _countWorkingDays(days);
                        sumUsedWorkingDays = sumUsedWorkingDays + workingDays;
                    }
                }
            }
            this.getData().OstaloDana = ostaloDana - sumUsedWorkingDays;
        },

        typeOfVacation : function(typeOfVacation) {
             return typeOfVacation;
        },

        calculateSlobodneDane : function () {
            var counter = 0;
            var datesComments = this.getData().DatesComments;
            for (var i = 0; i < datesComments.length; i++) {
                if (datesComments[i].date != undefined) {
                    var dateSplit = datesComments[i].date.split('/');
                    if (dateSplit[2] === moment().format('YYYY')) {
                        //'SlobodniRadniDan'
                        if (datesComments[i].typeOfVacation === this.typeOfVacation('SlobodniRadniDan')) {
                            counter++;
                        }
                    }
                }
            }
            this.getData().BrojUzetihRadnihDana = counter;
        }

    };
}]);



