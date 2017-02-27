'use strict';

const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(server);

//middleware
app.use('/static', express.static(path.join(__dirname, 'static')));

//socket.io
io.on('connection', (client) => {
    client.on('login', (data) => {
        console.log('New user logged in:', data);
    });

    client.on('postMsg', (data) => {
        io.emit('newMsg', data);
    });
});

//routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

//start
server.listen(3000, () => {
    console.log('app running on port 3k');
});

