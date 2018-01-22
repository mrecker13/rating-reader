// Dependencies
var express = require('express');
var bodyParser = require('body-parser');

var port = process.env.PORT || 8080;

var app = express();

// Sets up the Express app to handle data parsing
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
