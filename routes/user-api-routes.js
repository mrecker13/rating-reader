var bcrypt = require("bcrypt-nodejs");
var db = require("../models");
//
module.exports = function (app) {
    // GET route for all users
    app.get("/api/users/all", function (req, res) {
        db.User.findAll({
            include: db.Rating
        }).then(function (ratings) {
            res.json(ratings);
        });
    });
    // POST route for adding a user
    app.post("/api/users/create", function (req, res) {
        db.User.create(req.body).then(function (result) {
            console.log("Added: " + req.body);
            res.json(result);
        });
    });
    // GET method for finding a specific author
    app.get("/api/user/:username", function (req, res) {
        console.log(req.params);
        db.User.findOne({
            where: {
                username: req.params.username
            },
            include: db.Ratings
        }).then(function (ratings) {
            res.json(ratings);
        });
    });
}
//