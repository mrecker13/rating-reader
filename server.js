// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var db = require("./models");
var exphbs = require("express-handlebars");
var expressJWT = require("express-jwt");
var jwt = require("jsonwebtoken");
var config = require("./config.js");


var PORT = process.env.PORT || 8080;

var app = express();

// Sets up the Express app to handle data parsing
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting up our middleware to have protected API routes
app.use(expressJWT({ secret: config.tokenSecret }).unless({ 
    // select paths to not be authorized
    path: ["/", "/api/home", "/add", "/api/rating/create", "/item", /^\/item\/.*/, "/user", /^\/api\/user\/.*/, "/api/users/all", "/api/users/create", "/category", /^\/category\/.*/, "/login", "/user/login"] 
}));

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