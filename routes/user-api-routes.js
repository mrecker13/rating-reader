var bcrypt = require("bcrypt-nodejs");
var db = require("../models");
//
module.exports = function(app) {
    // GET route for all items
    app.get("/api/users/all", function(req, res) {
        db.User.findAll({
            include: db.Rating
        }).then(function(ratings) {
            res.json(ratings);
        });
    });
    // POST route for adding an item
    app.post("/api/users/create", function(req, res) {
        db.User.create(req.body).then(function(result) {
          console.log("Added: " + req.body);
          res.json(result);
        });
      });

      // GET method for fining a specific post
      app.get("/api/users/:id", function(req, res) {
        db. User.findOne({
          where: {
            id: req.params.id
          },
          include: [db.Ratings]
        }).then(function(ratings) {
          res.json(ratings);
        });
      });
}