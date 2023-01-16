require("dotenv").config();

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 6556;

// creating a new express application
const app = express();

// creating a new server using the express application to allow socket io also listen on the server
const httpServer = createServer(app);

// configuring a new socket io instance
const io = new Server(httpServer, {
    cors: process.env.FRONTEND_URL,
    methods: ["GET", "POST"]
})

// listening for when a client connects
io.on("connection", (socket) => {
    console.log("connected with: ", socket.id);

    // send a message to a user
    socket.on("send-message", (message, userSocketId) => {
        // emit an event to the recipient to receive the new message
        io.to(userSocketId).emit("receive-message", message);
    })

    // call a user
    socket.on("call-user", (userToCall, signalData, from, name, callType) => {
        // emit an event to the recipient of the call
        io.to(userToCall).emit("receiving-call", signalData, from, name, callType)
    })

    // answer a user
    socket.on("answer-call", (to, signal) => {
        io.to(to).emit("call-accepted", signal)
    })

    // update a user's video status(showing or not on a peer call)
    socket.on("update-video-status", (userSocketId, value) => {
        io.to(userSocketId).emit("update-video-status", value)
    })

    // update a user's audio status(muted or not on a peer call)
    socket.on("update-audio-status", (userSocketId, value) => {
        io.to(userSocketId).emit("update-audio-status", value)
    })

    // cancel a peer call
    socket.on("cancel-call", (userSocketId) => {
        io.to(userSocketId).emit("call-cancelled")
    })

    socket.on("disconnect", () => {
        console.log("User with socket id: ", socket.id, " disconnected")
        // socket.broadcast.emit("call-ended")
    })
})

// listening on the port
httpServer.listen(PORT, () => console.log("Server running on port " + PORT));
