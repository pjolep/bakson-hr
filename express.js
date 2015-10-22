var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var _ = require('underscore')._;
var path = require('path');
var jsonfile = require('jsonfile');
var basicAuth = require('basic-auth');
var config = require('./config/config.json');


var file, dir = __dirname;
var data = [], absentData;
var dirs = __dirname.split('/');



var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    ObjectID = require('mongodb').ObjectID;

var list = path.join(__dirname, '/../..');

for(var i = 0; i < dirs.length; i++){
    if(dirs[i] != 'dist'){
        dir = __dirname + '/app/';
        file = dir + 'data.json';
    }else{
        dir = __dirname;
        file = 'data.json';
    }
}


var auth = function (req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.sendStatus(401);
    }

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }

    if (user.name === config.username && user.pass === config.password) {
        return next();
    } else {
        return unauthorized(res);
    }
};

app.get('/', auth, function(req, res) {
    res.sendFile(path.join(dir + 'index.html'))
});

app.use(express.static(dir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || config.port);

var url =
    'mongodb://localhost:27017/Employees'
    || process.env.MONGOLAB_URI
    || process.env.MONGOHQ_URL
    || process.env.OPENSHIFT_NODEJS_PORT;

MongoClient.connect(url, function(err, db) {

    if(err) throw err;

    var selectAll = function(db, collection, onFinish) {
        data = [];
        var cursor = db.collection(collection).find( );
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                data.push(doc);
            } else {
                onFinish(data);
            }
        });
    };

    var selectLast = function(db, collection, onFinish) {
        data = [];
        var cursor = db.collection(collection).find().sort({$natural: -1}).limit(1);
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                data.push(doc);
            } else {
                onFinish(data);
            }
        });
    };

    app.post('/addNewEmployee', function(req, res) {
        db.collection('employees').insert(req.body);
        res.send(req.body);
    });

    app.post('/saveEmployeeData', function(req, res) {
        var arr = [];
        req.body.Absentee.forEach(function(val){
            arr.push({
                //_id : ObjectID(req.body._id),
                date : val.date,
                dateTo : val.dateTo,
                typeOfVacation : val.typeOfVacation,
                comment : val.comment
            });
        });

        db.collection('employees').update(
            {_id:ObjectID(req.body._id)},
                {$set: {
                    Adresa: req.body.Adresa,
                    DatumRodjenja: req.body.DatumRodjenja,
                    BrojDanaOdmora: req.body.BrojDanaOdmora,
                    Komentar: req.body.Komentar,
                    Firma: req.body.Firma,
                    Absentee : arr
                }
            }
        );
        res.sendStatus(200);
    });

    app.post('/removeAbsenteeRow', function(req, res) {
        db.collection('employees').remove( {_id: ObjectID(req.body._id)});
        var id = req.body._id;
        req.body._id = ObjectID(id);
        db.collection('employees').insert(req.body);
        res.sendStatus(200);
    });

    app.get('/getLastSavedEmployee', function(req, res) {
        selectLast(db, 'employees', function(data) {
            res.setHeader('Content-type', 'application/json');
            res.send(data);
        });
    });

    app.get('/fetchEmployees', function(req, res) {
        assert.equal(null, err);
        selectAll(db, 'employees', function(data) {
            res.setHeader('Content-type', 'application/json');
            res.send(data);
        });
    });

    app.post('/removeEmployee', function(req, res) {
        db.collection('employees').remove( {_id: ObjectID(req.body._id)});
        res.sendStatus(200);
    });

});
app.listen(app.get('port'));
