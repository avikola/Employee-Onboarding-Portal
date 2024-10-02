const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String }, // Optional for social logins
		role: { type: String, enum: ["HR", "Employee"], default: "Employee" },
		twoFactorEnabled: { type: Boolean, default: false },
		twoFactorCode: { type: String },
		twoFactorExpires: { type: Date },
		socialId: { type: String }, // For social logins
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
