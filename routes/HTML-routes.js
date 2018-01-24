module.exports = function(app) {

      app.get("/", function(req, res) {
        res.render("index");
      });

      app.get("/add", function(req, res) {
        res.render("add");
      });

      app.get("/item", function(req, res) {
        res.render("item");
      });

      app.get("/category", function(req, res) {
        res.render("category");
      });
}