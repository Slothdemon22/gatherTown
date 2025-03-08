import { RawData, WebSocket, WebSocketServer } from "ws";
import express from "express";
import http, { createServer } from "http";

const server = createServer();
const wss = new WebSocketServer({ server: server });

wss.on("connection", function connection(ws: WebSocket) {
    
    ws.on("message", function message(message:BinaryType)
    {
        console.log(JSON.parse(message))
    });
    ws.on('close', function close()
    { 
     console.log("disconnected",ws)
    })
    ws.send(JSON.stringify({Status:`Connected User is ${ws.OPEN}`}))
});
const PORT = 8080;
server.listen(PORT, function listen()
{
    console.log(`Listening on Port ${PORT}`);
})
