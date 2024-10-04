const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

let users = require("../data/users.json");

const User = require("../models/userModel");

exports.register = async (req, res) => {
	// Validation

	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const { name, email, password, role } = req.body;

	try {
		// Check if user exists
		let user = await User.findOne({ email });
		if (user) return res.status(400).json({ msg: "User already exists" });

		// Create new user
		user = new User({
			name,
			email,
			password,
			role,
		});

		// Hash password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		await user.save();

		// Create JWT
		const payload = { user: { id: user.id, role: user.role } };
		jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
			if (err) throw err;
			res.json({ token });
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};

exports.login = async (req, res) => {
	// Validation
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { username, password } = req.body;

	try {
		// Check if user exists
		const user = users.find((u) => u.username === username);
		if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

		// Check password
		const isMatch = password === user.password;
		if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

		res.json({
			data: {
				msg: "success",
				role: user.role,
				twofactor: { enabled: user["2fa_enabled"], method: user["2fa_method"] },
			},
		});

		// Generate 2FA code
		// const twoFactorCode = Math.floor(100000 + Math.random() * 900000).toString();
		// user.twoFactorCode = twoFactorCode;
		// user.twoFactorExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
		// await user.save();

		// Send 2FA code via email
		// const sendEmail = require("../utils/sendEmail");
		// await sendEmail(user.email, "Your 2FA Code", `Your verification code is ${twoFactorCode}`);

		// res.json({ msg: "2FA code sent to your email" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};

exports.verify2FA = async (req, res) => {
	const { email, code } = req.body;

	try {
		let user = await User.findOne({ email });
		if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

		if (user.twoFactorCode !== code || user.twoFactorExpires < Date.now()) {
			return res.status(400).json({ msg: "Invalid or expired code" });
		}

		// Clear 2FA fields
		user.twoFactorCode = undefined;
		user.twoFactorExpires = undefined;
		user.twoFactorEnabled = true;
		await user.save();

		// Generate JWT
		const payload = { user: { id: user.id, role: user.role } };
		jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
			if (err) throw err;
			res.json({ token });
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
};
