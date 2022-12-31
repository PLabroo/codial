
// Receiving the socket connection
module.exports.chatSockets = function (socketServer) {
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', (socket) => {
        console.log("New connection received", socket.id);

        socket.on('disconnect', () => {
            console.log("socket disconnected!");
        });

        socket.on('join_room', (data) => {
            console.log("Joining req data", data)
            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
        })

        socket.on('send_message', (data) => {
            io.in(data.chatroom).emit('receive_message', data);
        })
    });

}   