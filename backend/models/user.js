const { Schema, model } = require("mongoose");

// defining the structure for how users will be stored
const userSchema = new Schema({
    userId: String,
    socketId: String,
})

// creating a new model using the structure(schema) defined above
const User = new model("User", userSchema);

module.exports = User;
