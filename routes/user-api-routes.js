//
var db = require("../models");
//
module.exports = function(app) {
    // GET route for all users
    app.get("/user", function(req, res) {
        db.User.findAll({
            include: db.Rating
        }).then(function(ratings) {
            res.json(ratings);
        });
    });
    // POST route for adding a user
<<<<<<< HEAD
    app.post("/api/users/create", function(req, res) {
=======
    app.post("/api/user/create", function(req, res) {
>>>>>>> master
        db.User.create(req.body).then(function(result) {
          console.log("Added: " + req.body);
          res.json(result);
        });
      });
      // GET method for finding a specific author
<<<<<<< HEAD
      app.get("/api/users/:id", function(req, res) {
=======
      app.get("/api/user/:id", function(req, res) {
>>>>>>> master
        db.User.findOne({
          where: {
            id: req.params.id
          },
          include: db.Ratings
        }).then(function(ratings) {
          res.json(ratings);
        });
      });
}
//