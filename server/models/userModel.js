const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String }, // Optional for social logins
	twoFactorEnabled: { type: Boolean, default: false },
	twoFactorCode: { type: String },
	twoFactorExpires: { type: Date },
	socialId: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
