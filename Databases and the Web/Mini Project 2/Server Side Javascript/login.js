const bcrypt = require("bcryptjs");
const {
   body,
   validationResult
} = require('express-validator');
module.exports = function (app) {
   //Render page
   app.post("/login", // Sanitization chain
      body('email').isEmail().normalizeEmail(),
      body('password').trim(), async function (req, res) {
         const {
            email,
            password
         } = req.body;

         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.redirect("/?auth=invalid_input");
         }

         let data = await dbQuery("SELECT * FROM users WHERE email = ?", [email]);
         if (data.length < 1) {
            return res.redirect("/?auth=false");
         }
         const user = data[0];
         if (!isPasswordMatch(user.password, password)) {
            return res.redirect("/?e=t");
         }
         req.session.user = user.id;
         res.redirect("/");
      });

   app.get("/logout", async function (req, res) {
      req.session.destroy((err) => {
         if (err) {
            console.log(err);
         } else {
            res.redirect("/");
         }
      });
   });

   const isPasswordMatch = async (password, userPassword) => {
      return bcrypt.compare(password, userPassword);
   };
};