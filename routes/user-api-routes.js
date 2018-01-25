var bcrypt = require("bcrypt-nodejs");
var db = require("../models");
var jwt = require("jsonwebtoken");
var config = require("./../config.js");
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

  app.post("/user/login", function (req, res) {
    db.User.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (data) {
      console.log(data);
      // we are comparing the plain text password 
      // with the hashsed password here
      bcrypt.compare(req.body.password, data.password, function (err, result) {
        // if the hash and the plain text password match
        if (result) {
          // then issue a token to the user 
          // with a message
          var token = jwt.sign({ username: data.username }, config.tokenSecret);
          res.json({ message: "Passwords matched!", successs: true, token: token, id: data.id, username: data.username });
        } else {
          // otherwise let the client know
          // that they have a bad password
          res.status(400).json({ message: "Bad password", success: false })
        }

      });
    });
  });

      // GET method for finding a specific author
      app.get("/api/user/:username", function (req, res) {
        db.User.findOne({
            include: db.Rating,
          where: {
            username: { $like: "%" + req.params.username + "%" }
          }        
        }).then(function (ratings) {
          res.json(ratings);
        });
      });
    }
//