var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var _ = require('underscore')._;
var path = require('path');
var jsonfile = require('jsonfile');

var file, dir;
var arr = [];
var dirs = __dirname.split('/');

for(var i = 0; i < dirs.length; i++){
    if(dirs[i] != 'dist'){
        dir = __dirname + '/app';
        file = dir + '/data.json'
    }else{
        dir = __dirname;
        file = 'data.json';
    }
}

app.use(express.static(dir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);


// Read file, parse it, append data to array, serialize, replace file content.

// 1. Read file

fs.readFile(file, function(err, data){
    if(err){
        throw err;
    }
// 2. Parse it
// 3. Serialize it
    arr = JSON.parse(data);
});

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/save', function(req, res) {
    for(var i = 0; i < arr.length; i++){
        if(arr[i].Name === req.body.Name){
            arr.splice(i, 1);
        }
    }
    arr.push(req.body);

// 4. Replace file content

    jsonfile.writeFile(file, arr, {spaces : 2}, function(err){});
    res.sendStatus(200);
});

app.post('/remove', function(req, res) {
    for(var i = 0; i < arr.length; i++){
        if(arr[i].Name === req.body.Name){
            arr.splice(i, 1);
        }
    }
    jsonfile.writeFile(file, arr, {spaces : 2}, function(err){});
    res.sendStatus(200);
});

app.listen(app.get('port'));