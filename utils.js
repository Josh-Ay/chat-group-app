exports.findRoom = (allRooms, channelId, roomId) => {
    const foundRoomForChannel = allRooms[channelId];
        
    if (!foundRoomForChannel) return null
    if (foundRoomForChannel.room !== roomId) return null

    return foundRoomForChannel;
}