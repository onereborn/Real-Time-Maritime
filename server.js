require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

// Connect to the Live Maritime Data Stream
// Get your free API key at https://aisstream.io/
const AIS_API_URL = "wss://stream.aisstream.io/v0/stream";
let maritimeWs = new WebSocket(AIS_API_URL);

function connectToAIS() {
    maritimeWs.on('open', () => {
        console.log("Connected to AISStream API");
        const subscription = {
            APIKey: process.env.API_KEY,
            BoundingBoxes: [[[-90, -180], [90, 180]]] // Track the whole world
        };
        maritimeWs.send(JSON.stringify(subscription));
    });

    maritimeWs.on('message', (data) => {
        // Send data to the frontend map
        io.emit('ship-data', JSON.parse(data.toString()));
    });

    maritimeWs.on('close', () => {
        console.log("Connection lost. Reconnecting...");
        setTimeout(connectToAIS, 5000);
    });
}

connectToAIS();

const PORT = 3000;
server.listen(PORT, () => console.log(`Ship Tracker active at http://localhost:${PORT}`));