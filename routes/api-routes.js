//
var db = require("../models");
//
module.exports = function(app) {
    // GET route for all items
    app.get("api/all", function(req, res) {
        db.User.findAll({
            include: db.Rating
        }).then(function(ratings) {
            res.json(ratings);
        });
    });
    // POST route for adding an item
    app.post("/api/create", function(req, res) {
        db.User.create(req.body).then(function(ratings) {
          res.json(ratings);
        });
      });
    // DESTROY route for deleting an item
    app.delete("/api/item/:id", function(req, res) {
        db.User.destroy({
          where: {
            id: req.params.id
          }
        }).then(function(ratings) {
          res.json(ratings);
        });
      });
      // GET method for fining a specific post
      app.get("/api/authors/:id", function(req, res) {
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