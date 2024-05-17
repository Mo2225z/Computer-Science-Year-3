// Route handler for web app
module.exports = function (app) {
  //Render page
  app.get("/addGame", function (req, res) {
    res.render("addGame.ejs", { user: req.session?.user });
  });
  app.post("/addGame", async function (req, res) {
    let data = await dbQuery("INSERT INTO games SET ?", req.body);
    res.redirect("/");
  });
};
