var socket = require('./websocket');
var udp_server = require('./udp_server');

var MessageHeaders = require('./Constants').MessageHeader

function messageParser(packet) {

}
//there is multi cast option in udp server (check doc)
udp_server.on('message', (packet, rinfo) => {
    //    header,msg=messageParser(packet)
    try {
        packet = JSON.parse(packet)
        console.log(packet.port_id)
        console.log(`server got: ${packet} from ${rinfo.address}:${rinfo.port}`);
        socket.emit('message', packet)

    }
    catch (err) {

    }
});

