"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const wss = new ws_1.WebSocketServer({ server });
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
        }
        catch (error) {
            console.error("Invalid JSON received:", error);
        }
    });
    ws.send(JSON.stringify({ type: "info", message: "Welcome to the WebSocket server!" }));
});
server.listen(8080, () => {
    console.log("Server started on port 8080");
});
