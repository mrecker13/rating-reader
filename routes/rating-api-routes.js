//
var db = require("../models");
//
module.exports = function (app) {
  // GET route for all items
  app.get("/", function (req, res) {
    db.Rating.findAll({
      include: db.User,
      order: [["createdAt", "DESC"]]
    }).then(function (data) {
      var hbsObject = {
        ratings: data
      }
      res.render("index", hbsObject);
    });
  });
  // POST route for adding an item
  app.post("/api/rating/create", function (req, res) {
    console.log(req.body);
    db.Rating.create(req.body).then(function (result) {
      console.log("Added: " + req.body);
      res.json(result);
    });
  });

  // GET method for fining a specific post
  app.get("/api/rating/:id", function (req, res) {
    db.Rating.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function (ratings) {
      res.json(ratings);
    });
  });

  app.get("/item/:item", function (req, res) {
    db.Rating.findAll({
      include: db.User,
      where: {
        item: req.params.item
      }
    }).then(function (data) {
      // console.log(data[0].dataValues);
      for (var i = 0; i < data.length; i++) {
        var hbsObject = {
          ratings: data[i].dataValues
        }
      }
      res.json(hbsObject);
    })
  })
}