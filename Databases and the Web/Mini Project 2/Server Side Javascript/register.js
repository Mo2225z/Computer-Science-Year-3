const bcrypt = require("bcryptjs");
const {
	body,
	validationResult
} = require('express-validator');

module.exports = function(app) {
	//Render page
	app.get("/register", function(req, res) {
		const {
			error
		} = req.query;
		res.render("register.ejs", {
			error,
			user: req.session?.user
		});
	});

	app.post("/register", // Defined sanitization and validation chain
		body('first_name').trim().escape(),
		body('last_name').trim().escape(),
		body('username').trim().escape(),
		body('email').isEmail().normalizeEmail(),
		body('password').trim(),
		body('c_password').trim(), async function(req, res) {
			const {
				first_name,
				last_name,
				username,
				email,
				password,
				c_password
			} =
			req.body;
			// Check for validation errors
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.redirect("/register?error=Invalid input");
			}
			
			if (password !== c_password) {
				return res.redirect("/register?error=Passwords do not match");
			}

			let data = await dbQuery("SELECT * FROM users WHERE email = ?", [email]);
			if (data?.length > 0) {
				return res.redirect("/register?error=Email already taken");
			}
			data = await dbQuery("SELECT * FROM users WHERE username = ?", [username]);
			if (data?.length > 0) {
				return res.redirect("/register?error=Username already taken");
			}

			const hashedPassword = await hashPassword(password);

			const user = await dbQuery("INSERT INTO users SET ?", {
				first_name,
				last_name,
				username,
				email,
				password: hashedPassword,
			});
			if (user.insertId) {
				req.session.user = user.insertId;
				res.redirect("/");
			} else {
				res.redirect("/register");
			}
		});

	const hashPassword = async (password) => {
		return await bcrypt.hash(password, 8);
	};
};