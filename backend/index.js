require("dotenv").config();

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 6556;
const crypto = require("crypto");
const socketController = require("./controllers/socketController");
const { findRoom } = require("./utils");

const rooms = {};

// connecting to mongodb
require("./config/db")();

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

    // end a peer call
    socket.on("call-ended", (userSocketId) => {
        io.to(userSocketId).emit("call-ended")
    })

    // create a new room for a group call
    socket.on("create-room", async (currentChannelId, idsToCall, callback) => {
        console.log("User ids to call: ", idsToCall);
        // console.log(rooms)
        
        if (rooms[currentChannelId]) {
            if (rooms[currentChannelId].peers.length === 7) return callback({ error: "Room has reached maximum particioants of 7" });

            console.log("room already exists, joining");
            return callback({ "roomId": rooms[currentChannelId].room, "peers": rooms[currentChannelId].peers })
        }

        const newRoomId = crypto.randomUUID();
        console.log("Room created with id: ", newRoomId);
        rooms[currentChannelId] = {
            room: newRoomId,
            peers: [],
        }

        return callback({ "roomId": newRoomId, "peers": [] })
    })

    // update users in room
    socket.on("update-users-in-room", (userId, userSocketId, channelId, roomId, signalData) => {
        const foundRoomForChannel = findRoom(rooms, channelId, roomId);

        if (!foundRoomForChannel) return

        if (foundRoomForChannel.peers.find(peer => peer.socketId === userSocketId)) return 

        const newPeerObj = {
            userId: userId,
            roomId: roomId,
            signal: signalData,
            socketId: userSocketId,
        };
        foundRoomForChannel.peers.push(newPeerObj);

        foundRoomForChannel.peers.forEach(peer => {
            if (peer.userSocketId === userSocketId) return
            io.to(peer.socketId).emit("user-joined-room", { user: newPeerObj })
        })
    })

    socket.on("leave-room", (userSocketId, channelId, roomId) => {
        const foundRoomForChannel = findRoom(rooms, channelId, roomId);
        if (!foundRoomForChannel) return

        const currentPeers = foundRoomForChannel.peers.slice();
        foundRoomForChannel.peers = currentPeers.filter(peer => peer.socketId === userSocketId);
        
        foundRoomForChannel.peers.forEach(peer => {
            io.to(peer.socketId).emit("user-left-room", { user: userSocketId })
        })
    })

    // get users in room
    socket.on("get-users-in-room", (channelId, roomId, callback) => {
        const foundRoomForChannel = findRoom(rooms, channelId, roomId);
        if (!foundRoomForChannel) return callback({ peers: [] });

        return callback({ peers: foundRoomForChannel.peers });
    })

    // get socket id of user
    socket.on("get-user-socket-id", socketController.get_user_socket_id);
    
    // update current user socket id
    socket.on("update-user-socket-id", socketController.update_user_socket_id);

    socket.on("disconnect", () => {
        console.log("User with socket id: ", socket.id, " disconnected")
        io.sockets.emit("user-disconnected", socket.id)
        Object.values(rooms).forEach((value, index) => {
            value.peers.forEach((user) => {
                if (user.userSocketId === socket.id) {
                    rooms[Object.keys(rooms)[index]].peers = rooms[Object.keys(rooms)[index]].peers.filter(peer => peer.userId !== user.userId);
                }
            })
        })
    })
})

// listening on the port
httpServer.listen(PORT, () => console.log("Server running on port " + PORT));
