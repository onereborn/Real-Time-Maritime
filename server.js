require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

// Connect to AISStream
const maritimeWs = new WebSocket("wss://stream.aisstream.io/v0/stream");

maritimeWs.on('open', () => {
    const subscription = {
        APIKey: process.env.API_KEY,
        BoundingBoxes: [[[-90, -180], [90, 180]]] 
    };
    maritimeWs.send(JSON.stringify(subscription));
});

maritimeWs.on('message', (data) => {
    // Send raw data to the browser
    io.emit('ship-data', JSON.parse(data.toString()));
});

server.listen(3000, () => console.log('Ship Tracker running on port 3000'));