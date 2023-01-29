const { default: mongoose } = require("mongoose")
const User = require("../models/user")

exports.get_user_socket_id = async (passedUserId, callback) => {
    /**
     * Gets the socket id for an existing user
     * @param {[mongoose.Types.ObjectId]} passedUserId
     * @param {[Function]} callback
     * @returns {[Function]}
     */
    const foundUser = await User.findOne({ userId: passedUserId })
    
    if (!foundUser) return callback({ error: "User not found" })

    return callback({ "socketId": foundUser.socketId })
}

exports.update_user_socket_id = async (passedUserId, callback) => {
    /**
     * Updates the socket id for a user
     * @param {[mongoose.Types.ObjectId]} passedUserId
     * @param {[Function]} callback
     * @returns {[Function]}
     */

    const existingUser = await User.findOne({ userId: passedUserId })
    
    if (!existingUser) {
        const newUser = new User({
            userId: passedUserId,
            socketId: socket.id,
        })
        await newUser.save();
        
        return callback({ "newSocketId" : socket.id })
    }
    
    existingUser.socketId = socket.id;
    await existingUser.save();

    return callback({ "newSocketId" : socket.id })
}
