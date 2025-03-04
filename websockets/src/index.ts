import { WebSocketServer } from "ws";
import express from "express";
import { createServer } from "http";

const app = express();
const server = createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
        console.log("Received:", message.toString());

        // Ensure the message is in JSON format
        try {
            const data = JSON.parse(message.toString());

            // Broadcast message to all clients
            wss.clients.forEach((client) => {
                if (client.readyState === ws.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });
        } catch (error) {
            console.error("Invalid JSON received:", error);
        }
    });

    ws.send(JSON.stringify({ type: "info", message: "Welcome to the WebSocket server!" }));
});

server.listen(8080, () => {
    console.log("Server started on port 8080");
});
