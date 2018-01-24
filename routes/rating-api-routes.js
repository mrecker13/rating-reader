//
var db = require("../models");
//
module.exports = function(app) {
    // GET route for all items
    app.get("/api/home", function(req, res) {
        db.Rating.findAll({
            include: db.User,
            order: [["createdAt", "DESC"]]
        }).then(function(data) {
          console.log(data);
            res.json(data);
        });
    });

    
    // POST route for adding an item
    app.post("/api/rating/create", function(req, res) {
      console.log(req.body);
        db.Rating.create(req.body).then(function(result) {
          console.log("Added: " + req.body);
          res.json(result);
        });
      });

    app.get("/item/:item", function(req, res) {
      db.Rating.findAll({
        include: db.User,
        where: {
          item: {
            $like: "%" + req.params.item + "%"
          }
        }
      }).then(function(data) {
        res.json(data);
      })
    })

    app.get("/category/:category", function(req, res) {
      db.Rating.findAll({
        include: db.User,
        where: {
          category: {
            $like: "%" + req.params.category + "%"
          }
        }
      }).then(function(data) {
        res.json(data);
      })
    })
}