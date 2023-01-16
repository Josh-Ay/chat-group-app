const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    userId: String,
})

const User = new model("User", userSchema);

module.exports = User;
