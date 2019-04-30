const localserver = require('http').createServer();
const udp_server = require('./udp_server')

const io = require('socket.io')(localserver, {
});


conn_socket = io.on('connect', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('message', function () {
        console.log('received message from websocket');
        udp_server.send("hello", 1234, function (erro, bytes) {
            console.log("error:", erro)
        })

    });
    socket.on('reset', function (ip, port) {
        console.log('received reset from websocket:', ip, port);
        udp_server.send("reset", port, ip, function (erro, bytes) {
            console.log("error:", erro)
        })

    });
});
localserver.listen(3003);
module.exports = conn_socket