//
var db = require("../models");
//
module.exports = function(app) {
    // GET route for all items
<<<<<<< HEAD:routes/api-routes.js
    app.get("/api/all", function(req, res) {
=======
    app.get("/api/users/all", function(req, res) {
>>>>>>> f47370fc860564df9ff34dbb2f24795197e40965:routes/user-api-routes.js
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