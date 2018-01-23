//
var path = require("path");
//
module.exports = function(app) {
    // getting to the test.html

      app.get("/add", function(req, res) {
        res.render("add");
      });
}