import { WebSocketServer } from "ws";
import express from "express";
import { createServer } from "http";

const app = express();
const server = createServer(app); 

const wss = new WebSocketServer({ server }); 

wss.on("connection", async(ws) => {
    console.log("Client connected");
    const res = await fetch("http://localhost:3000").then((res) => res.text());
    console.log(res);
    ws.on("message", (message) => {
        console.log("Received:", message.toString()); 
    });

    ws.send("Welcome to the WebSocket server!"); 
});


server.listen(8080, () => {
    console.log("Server started on port 3000");
});
