//
var path = require("path");
//
module.exports = function(app) {
    // getting to the test.html
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../veiws/test.html"));
      });
}