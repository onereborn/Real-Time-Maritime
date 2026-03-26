const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

const AIS_API_KEY = process.env.AIS_API_KEY;
const PORT = process.env.PORT || 3000; 

app.use(express.static(path.join(__dirname, 'public')));

let messageBatch = [];
setInterval(() => {
    if (messageBatch.length > 0) {
        io.emit('ship-batch', messageBatch);
        messageBatch = [];
    }
}, 500);

function connectAIS() {
    const ws = new WebSocket("wss://stream.aisstream.io/v0/stream");

    ws.on('open', () => {
        // PROOF TEST: This prints the first 4 characters of your key to the Render logs safely
        if (AIS_API_KEY) {
            console.log(`✅ Connected! Using API Key starting with: ${AIS_API_KEY.substring(0, 4)}...`);
        } else {
            console.log(`❌ ERROR: API Key is UNDEFINED!`);
        }

        const subscriptionMessage = {
            APIKey: AIS_API_KEY,
            BoundingBoxes: [[[-90, -180], [90, 180]]] 
        };
        ws.send(JSON.stringify(subscriptionMessage));
    });

    ws.on('message', (data) => {
        try {
            const aisData = JSON.parse(data);
            if (aisData.MetaData && aisData.MetaData.MMSI) {
                messageBatch.push(aisData);
            }
        } catch (e) {}
    });

    ws.on('error', (err) => console.error("❌ AIS Error:", err.message));
    
    ws.on('close', () => {
        console.log("🔄 AIS Connection lost. Retrying in 5 seconds...");
        setTimeout(connectAIS, 5000);
    });
}

connectAIS();

server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});