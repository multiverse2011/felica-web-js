'use strict'
const NfcpyId = require('node-nfcpy-id').default;
const nfc = new NfcpyId();
const express =  require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket => {
    console.log("connected!");
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
}));

http.listen(PORT, () => {
    console.log('listeng on *:${PORT}');
});


nfc.on('touchstart', (card) => {
  console.log('touchstart:', card.id, 'type:', card.type);
});

nfc.on('touchend', () =>{
    console.log("touchend");
});

nfc.on('error', (err) => {
  // standard error output (color is red)
  console.error('\u001b[31m', err, '\u001b[0m');
});