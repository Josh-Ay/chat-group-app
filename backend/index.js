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
    socket.on("call-user", (userToCall, signalData, from, name) => {
        // emit an event to the recipient of the call
        io.to(userToCall).emit("call-user", signalData, from, name)
    })

    // answer a user
    socket.on("answer-call", (to, signal) => {
        io.to(to).emit("call-accepted", signal)
    })

    socket.on("disconnect", () => {
        console.log("disconnected")
        socket.broadcast.emit("call-ended")
    })
})

// listening on the port
httpServer.listen(PORT, () => console.log("Server running on port " + PORT));
