angular.module("services").factory("uiProvider", ['$http', function ($http, $resource) {

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

        employees: "", // Employees data... {Name, comments, daysOfVacation}+

        employeesTabs : [],

        inputError: "",

        inputValidationError: "",

        isActive: false,

        selectedEmployee: "",

        activateSideTab: false,

        outerScope: false,

        showConfig : false,
        
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

        fetchEmployees: function () {
            var $this = this;
            $http.get("/fetchEmployees").success(function (results) {
                $this.employees = results;
            }.bind(this));
        },

        showEmployee: function (id) {
            this.selectedEmployee = id;
            if (this.employeesTabs.indexOf(this.getSelectedEmployee()) === -1) {
                this.employeesTabs.push(this.getSelectedEmployee());
                this.selectedEmployee = this.getSelectedEmployee()._id;
            }
            this.employeesTabs = _.uniq(this.employeesTabs, "_id");
            this.calculateDates();

        },

        getLastSavedEmployeeId: function () {
            $http.get("/getLastSavedEmployee").success(function (results) {
                this.selectedEmployee = results[0]._id;

            }.bind(this));
        },

        query: function (url, data) {
            return $http({url: url, method: "POST", withCredentials: true, data: data});
        },

        getSelectedEmployee: function () {
            for (var i = 0; i < this.employees.length; i++) {
                if (this.selectedEmployee === this.employees[i]._id) {
                    return this.employees[i];
                }
            }
            return null;
        },

        getEmployees: function (id) {
            for (var i = 0; i < this.employees.length; i++) {
                if (id === this.employees[i]._id) {
                    return this.employees[i];
                }
            }
            return null;
        },

        getEmployee: function () {
            for (var i = 0; i < this.employees.length; i++) {
                if (this.selectedEmployee === this.employees[i]._id) {
                    return this.employees[i];
                }
            }
            return null;
        },

        // Remove Tab
        removeEmployeeTab: function ($index) {

            if(this.employeesTabs.length === 1){
                this.selectedEmployee = "";
                this.employeesTabs.splice(0, 1);
            }

            if(this.employeesTabs.length > 1) {
                if($index === 0) {
                    if(this.selectedEmployee != this.employeesTabs[$index]._id){
                        this.employeesTabs.splice($index, 1);
                        return true;
                    }
                    this.selectedEmployee = this.employeesTabs[$index + 1]._id;
                    this.employeesTabs.splice($index, 1);
                    return true;
                }

                if($index > 0){
                    if($index === this.employeesTabs.length - 1 && this.selectedEmployee === ""){
                        if(this.employeesTabs.length > 1){
                            this.selectedEmployee = this.employeesTabs[$index - 1]._id;
                        }
                        this.employeesTabs.splice($index, 1);
                        return true;
                    }

                    if(this.employeesTabs[$index + 1] != undefined){
                        if(this.selectedEmployee === this.employeesTabs[$index]._id){
                            this.employeesTabs.splice($index, 1);
                            this.selectedEmployee = this.employeesTabs[$index]._id;
                        }else{
                            this.employeesTabs.splice($index, 1);
                        }
                        return true;
                    }
                    if(this.employeesTabs[$index - 1] != undefined){
                        if(this.selectedEmployee === this.employeesTabs[$index]._id){
                            this.employeesTabs.splice($index, 1);
                            this.selectedEmployee = this.employeesTabs[$index-1]._id;
                        }else{
                            this.employeesTabs.splice($index, 1);
                        }
                        return true;
                    }
                    this.employeesTabs.splice($index, 1);
                }else{
                    this.selectedEmployee = "";
                    this.employeesTabs.splice($index, 1);
                }

            }

        },

        toggleTab: function (scope) {
            if(this.showConfig === true){
                this.showConfig = false;
            }
            if (this.selectedEmployee === scope.i._id) {
                this.selectedEmployee = null;
            } else {
                this.selectedEmployee = scope.i._id;
            }
        },

        // addNew Employee.
        addNewEmployee: function (name) {
            var employeeData = {
                "Name": name,
                "Adresa": "",
                "DatumRodjenja": "",
                "BrojDanaOdmora": "",
                "Komentar": "",
                "Firma" : "",
                "OstaloDana" : 0,
                "Absentee" : []
            };

            if (employeeData.Name.length === 0) {
                this.inputError = true;
                return false;
            }

            this.query('/addNewEmployee', employeeData).success(function(data) {
                this.selectedEmployee = data._id;
                this.employeesTabs.push(data);
                this.fetchEmployees();
            }.bind(this));
        },

        addEmployeeAbsenteeData : function () {
            this.getEmployee().Absentee.push({
                date: $('.dates').val(),
                typeOfVacation: $('.typeOfVacation').val(),
                comment: $('.comments').val(),
                dateTo: $('.dateTo').val()
            });
        },

        saveEmployeeData : function() {
            event.preventDefault();

            var id = this.getEmployee()._id;
            var empData = {
                "_id" : id,
                "Adresa": this.getEmployee().Name,
                "DatumRodjenja": this.getEmployee().DatumRodjenja,
                "BrojDanaOdmora": this.getEmployee().BrojDanaOdmora,
                "Komentar": this.getEmployee().Komentar,
                "Firma" : this.getEmployee().Firma,
                "Absentee" : this.getEmployee().Absentee
            };

            for (var i = 0; i < empData.Absentee.length; i++) {
                if (empData.Absentee[i].date === undefined) {
                    return false;
                }
            }

            this.query('/saveEmployeeData', empData);
        },

        inputValidation: function () {
            return this.inputError = false;
        },

        removeEmployee: function () {
            event.preventDefault();
            if (confirm('Da li ste sigurni da zelite izbrisete zaposlenog?')) {
                var data = {
                    _id: this.selectedEmployee
                };
                JSON.stringify(data);
                for (var i = 0; i < this.employees.length; i++) {
                    if (this.employees[i]._id === data._id) {
                        this.employees.splice(i, 1);
                    }
                }

                this.employeesTabs.forEach(function(val, i) {
                    if(val._id === this.selectedEmployee){
                        this.employeesTabs.splice(i, 1);
                    }
                }.bind(this));

                return $http({url: '/removeEmployee', method: "POST", withCredentials: true, data: data});
            } else {
                return false;
            }
        },


        days : function(datesComments){
            return this.getDates(datesComments.date, datesComments.dateTo);
        },

        workingDays : function(days){
            return _countWorkingDays(days);
        },

        areDatesDefined : function(datesComments){
            if(datesComments.date && datesComments.dateTo){
                if(datesComments.daysTaken === 0){
                    datesComments.daysTaken = this.countWorkingDays(this.days(datesComments));
                    return false;
                }else{
                    datesComments.daysTaken = this.countWorkingDays(this.days(datesComments))
                }
            }
        },

        calculateDates: function () {
            var ostaloDana = Number(this.getSelectedEmployee().BrojDanaOdmora);
            var datesComments = this.getSelectedEmployee().Absentee;
            var sumUsedWorkingDays = 0;
            var slobodniDaniCounter = 0;

            for (var i = 0; i < datesComments.length; i++) {

                if(datesComments[i].date === undefined) break;
                var dateFrom = datesComments[i].date.split('/');

                if (dateFrom[2] === moment().format('YYYY')) {
                    if (datesComments[i].typeOfVacation === 'Odmor') {
                        sumUsedWorkingDays = sumUsedWorkingDays + this.workingDays(this.days(datesComments[i]));
                        this.areDatesDefined(datesComments[i]);
                    }
                    else if(datesComments[i].typeOfVacation === 'SlobodniRadniDan'){
                        slobodniDaniCounter++;
                    }
                }
            }

            this.getSelectedEmployee().OstaloDana = ostaloDana - sumUsedWorkingDays;
            this.getSelectedEmployee().BrojUzetihRadnihDana = slobodniDaniCounter;
        },

        toggleConfig : function(){
            this.showConfig = !this.showConfig;
            if(this.selectedEmployee != ""){
                this.selectedEmployee = "";
            }
        },

        removeAbsenteeRow : function(id){
            $http({url: '/removeAbsenteeRow', method: "POST", withCredentials: true, data: this.getEmployee()});
        },

        saveRow : function() {
            this.saveEmployeeData();
        }

        //showListOfAllEmployees : function() {
        //    $http({url: '/fetchEmployees', method: "GET"}).success(function(data) {
        //        for(var i = 0; i < data.length; i++){
        //            console.log(data[i]);
        //        }
        //    });
        //}

    };
}]);

