const express = require("express");
const { check } = require("express-validator");

const { register, login, verify2FA } = require("../controllers/authController");

const router = express.Router();

// Register user
// POST /api/auth/register
router.post(
	"/register",
	[
		check("name", "Name is required").notEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check("password", "Password must be 6 or more characters").isLength({ min: 6 }),
		check("role", "Role must be either HR or Employee").isIn(["HR Manager", "Employee"]),
	],
	register
);

// Login user
// POST /api/auth/login
router.post(
	"/login",
	[
		check("username", "Please include a valid username").exists(),
		check("password", "Password is required").exists(),
	],
	login
);

// Verify 2FA code
// POST /api/auth/verify-2fa
router.post(
	"/verify-2fa",
	[
		check("email", "Please include a valid email").isEmail(),
		check("code", "Code is required").exists(),
	],
	verify2FA
);

module.exports = router;
