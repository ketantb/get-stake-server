const mongoose = require("mongoose");
const Userschema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    otp: { type: String },
    password: { type: String },
    userType: { type: String },
    isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("user", Userschema);