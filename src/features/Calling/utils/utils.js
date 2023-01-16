export const getLocalUserStream = async () => {
    try {
        let localUserStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        })

        return localUserStream
        
    } catch (error) {
        console.log("Failed to get user stream: ", error)
    }
}