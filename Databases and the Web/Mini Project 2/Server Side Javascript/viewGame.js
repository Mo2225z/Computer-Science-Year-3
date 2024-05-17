// Route handler for web app
module.exports = function (app) {
  //Render page
  app.get("/viewGame/:id", async function (req, res) {
    const data = await dbQuery("SELECT * FROM games WHERE id = ?", [
      req.params.id,
    ]);
    const ratings = await dbQuery(
      "SELECT ratings.*, users.username FROM ratings JOIN users ON ratings.user_id = users.id WHERE ratings.game_id = ? ",
      [req.params.id]
    );
    if (data.length < 1) {
      res.redirect("/");
    }
    const game = data[0];
    res.render("viewGame.ejs", {
      user: req.session?.user,
      game,
      ratings,
      e: req.query.e,
    });
  });
  app.post("/addRating", async function (req, res) {
    if (!req.session.user) {
      return res.redirect("viewGame/" + req.body.game_id + "/?e=t");
    }
    let data = await dbQuery("INSERT INTO ratings SET ?", {
      ...req.body,
      user_id: req.session.user,
    });
    res.redirect("/viewGame/" + req.body.game_id);
  });

   // API endpoint to get all games
   app.get("/api/viewGames", async function (req, res) {
    try {
      const games = await dbQuery("SELECT * FROM games");
      if (games.length === 0) {
        // Redirect to the root route if no games are found
        res.redirect("/");
      } else {
        res.json(games);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};
