"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const http_1 = require("http");
const server = (0, http_1.createServer)();
const wss = new ws_1.WebSocketServer({ server: server });
wss.on("connection", function connection(ws) {
    ws.on("message", function message(message) {
        console.log(JSON.parse(message));
    });
    ws.on('close', function close() {
        console.log("disconnected", ws);
    });
    ws.send(JSON.stringify({ Status: `Connected User is ${ws.OPEN}` }));
});
const PORT = 8080;
server.listen(PORT, function listen() {
    console.log(`Listening on Port ${PORT}`);
});
