
const dgram = require('dgram');
const udp_server = dgram.createSocket('udp4');

udp_server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    udp_server.close();
});



udp_server.on('listening', () => {
    const address = udp_server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

udp_server.bind(31234);

module.exports = udp_server
