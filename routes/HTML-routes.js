//
var path = require("path");
//
module.exports = function(app) {

      app.get("/add", function(req, res) {
        res.render("add");
      });

      app.get("/item", function(req, res) {
        res.render("item");
      });

      app.get("/category", function(req, res) {
        res.render("category");
      });

      app.get("/login", function(req, res) {
        res.render("login");
      });
}
