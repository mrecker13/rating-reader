// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var db = require("./models");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 8080;

var app = express();

// Sets up the Express app to handle data parsing
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/html-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/rating-api-routes.js")(app);

db.sequelize.sync({force: false}).then(function(){
    app.listen(PORT, function(){
        console.log("App on port", PORT)
    });
});