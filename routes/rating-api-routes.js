//
var db = require("../models");
//
module.exports = function(app) {
    // GET route for all items
    app.get("/", function(req, res) {
        db.Rating.findAll({
            include: db.User
        }).then(function(data) {
          var hbsObject = {
            ratings: data
          }
            res.render("index", hbsObject);
        });
    });
    // POST route for adding an item
    app.post("/api/rating/create", function(req, res) {
        db.Rating.create(req.body).then(function(result) {
          console.log("Added: " + req.body);
          res.json(result);
        });
      });

      // GET method for fining a specific post
      app.get("/api/rating/:id", function(req, res) {
        db. Rating.findOne({
          where: {
            id: req.params.id
          },
          include: [db.User]
        }).then(function(ratings) {
          res.json(ratings);
        });
      });
}