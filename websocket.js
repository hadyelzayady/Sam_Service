const localserver = require('http').createServer();
const udp_server = require('./udp_server')

const io = require('socket.io')(localserver, {
});

conn_socket = io.on('connect', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('message', function (message) {
        console.log('received message from websocket', message.value);
        udp_server.send("hello", 1234, function (erro, bytes) {
            console.log("error:", erro)
        })

    });
    socket.on('sendToBoard', function (sim_info) {
        value = sim_info.value
        IP = sim_info.IP
        port = sim_info.port
        pin_id = sim_info.pin_id
        console.log("IP port", pin_id, value)
        console.log('received send to board from websocket:', IP, port);
        data = Buffer.alloc(2, 'pin')
        data[0] = pin_id
        data[1] = value
        data.writeInt8(pin_id, 0)
        value = value ? 1 : 0
        data.writeInt8(value, 1)
        console.log(data)
        udp_server.send(data, 1919, IP, function (erro, bytes) {
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
