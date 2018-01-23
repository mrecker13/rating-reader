//
var path = require("path");
//
module.exports = function(app) {

      app.get("/add", function(req, res) {
        res.render("add");
      });
}