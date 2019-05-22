var socket = require('./websocket');
var udp_server = require('./udp_server');

var MessageHeaders = require('./Constants').MessageHeader

function parseSimData(packet) {

    binday_data = Buffer.from(packet, 0, 2)
    console.log("binary data", binday_data)
    pin_number = binday_data.readInt8(0)
    value = binday_data.readInt8(1)
    console.log("VALUE:", value, " pin numbe", pin_number)
    return [pin_number, value]
}


//there is multi cast option in udp server (check doc),
udp_server.on('message', (packet, rinfo) => {
    //    header,msg=messageParser(packet)
    try {
        // packet=
        console.log("received message", packet)
        let [pin_number, value] = parseSimData(packet)
        console.log(`server got: ${packet} from ${rinfo.address}:${rinfo.port}`);

        socket.emit('message',
            {
                pin_number: pin_number,
                value: Boolean(value)
            }
        )

    }
    catch (err) {

    }
});

