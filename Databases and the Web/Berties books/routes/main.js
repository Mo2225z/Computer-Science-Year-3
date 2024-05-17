module.exports = function (app, shopData) {
  // Handle our routes
  app.get("/list", function (req, res) {
    let sqlquery = "SELECT * FROM books"; // query database to get all the
    // books
    // execute sql query
    db.query(sqlquery, (err, result) => {
      if (err) {
        res.redirect("./");
      }
      let newData = Object.assign({}, shopData, { availableBooks: result });
      console.log(newData);
      res.render("list.ejs", newData);
    });
  });

  app.get("/bargainbooks", function (req, res) {
    let sqlquery = "SELECT name, price FROM books WHERE price<20;"; // query database to get all the
    // books
    // execute sql query
    db.query(sqlquery, (err, result) => {
      if (err) {
        res.redirect("./");
      }
      let newData = Object.assign({}, shopData, { availableBooks: result });
      console.log(newData);
      res.render("bargainbooks.ejs", newData);
    });
  });
  ///Render addbook
  app.get("/addbook", function (req, res) {
    res.render("addbook.ejs", shopData);
  });

  app.post("/bookadded", function (req, res) {
    // saving data in database
    let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
    // execute sql query
    let newrecord = [req.body.name, req.body.price];
    db.query(sqlquery, newrecord, (err, result) => {
      if (err) {
        return console.error(err.message);
      } else
        res.send(
          " This book is added to database, name: " +
            req.body.name +
            " price: " +
            req.body.price
        );
    });
  });
  //Render index
  app.get("/", function (req, res) {
    res.render("index.ejs", shopData);
  });
  //Render about
  app.get("/about", function (req, res) {
    res.render("about.ejs", shopData);
  });
  //render search
  app.get("/search", function (req, res) {
    res.render("search.ejs", shopData);
  });
  //Render search result and query database
  app.get("/search-result", function (req, res) {
    let sqlquery =
      "SELECT * FROM books WHERE name LIKE " +
      "'" +
      "%" +
      req.query.keyword +
      "%" +
      "'";
    console.log(sqlquery);
    //Query database
    db.query(sqlquery, (err, result) => {
      if (err) {
        res.redirect("./");
      }
      let newData = Object.assign({}, shopData, { availableBooks: result });
      console.log(newData);
      res.render("search-result.ejs", newData);
    });
  });
  //Render register
  app.get("/register", function (req, res) {
    res.render("register.ejs", shopData);
  });
  //Post on registered form
  app.post("/registered", function (req, res) {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const plainPassword = req.body.password;
    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
      // Store hashed password in your database.
    })

    res.send("hello");
  });
};
