// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var db = require("./models");

var PORT = process.env.PORT || 8080;

var app = express();

// Sets up the Express app to handle data parsing
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));


db.sequelize.sync({force: true}).then(function(){
    app.listen(PORT, function(){
        console.log("App on port", PORT)
    });
});