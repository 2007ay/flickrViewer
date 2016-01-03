var express = require('express');
var mongoose = require('mongoose');
//var flickrRestServices = require('./flickrRestService');
var flickrRestService = require("./flickrRestService").flickrRestService;
var service = new flickrRestService();
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./controllers'));

mongoose.connect('mongodb://localhost/trippy', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

//to remove
app.get('/signup', function(req, res) {
	res.sendFile( __dirname + "/views/signup.html");
});

var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

