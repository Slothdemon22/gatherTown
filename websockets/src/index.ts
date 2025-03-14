import { WebSocket, WebSocketServer } from "ws";
import http, { createServer } from "http";
import { RoomManager } from "./classes/RoomManager";
import { User } from "./classes/User";

const server = createServer();
const wss = new WebSocketServer({ server: server });

wss.on("connection", function connection(ws: WebSocket) {
   ws.on("message", function message(message: BinaryType) {
      const res = JSON.parse(message);
      console.log(res);
      if (res.type == "joinRoom") {
         const user = new User(
            res.data.userID,
            {
               x: Math.floor(Math.random() * 20),
               y: Math.floor(Math.random() * 20),
            },
            ws,
         );
         RoomManager.getInstance().addUser(res.data.roomID, user);

         ws.send(JSON.stringify({ Status: `Joined Room ${res.data.roomID}` }));
         RoomManager.getInstance().broadcast(
            res.type,
            res.data.roomID,
            res.data.userID,
         );
         console.log("Users in Rooms");
         RoomManager.getInstance().displayRooms();
      } else if (res.type == "leaveRoom") {
         console.log(res);
         RoomManager.getInstance().destroy(res.data.roomID, res.data.userID);
         console.log(`User in Room ${res.data.roomID} removed`);
         console.log("Users in Rooms");
         RoomManager.getInstance().broadcast(
            res.type,
            res.data.roomID,
            res.data.userID,
         );
         RoomManager.getInstance().displayRooms();
      } else if (res.type == "movement") {
         // console.log("moevment event ", res.type);
         if (
            RoomManager.getInstance().checkMovement(
               res.data.roomID,
               res.data.userID,
               { x: res.data.x, y: res.data.y },
            )
         ) {
            //console.log("inside");
            RoomManager.getInstance().updateMovement(
               res.data.roomID,
               res.data.userID,
               { x: res.data.x, y: res.data.y },
            );
            RoomManager.getInstance().broadcast(
               res.type,
               res.data.roomID,
               res.data.userID,
            );
         } else {
            ws.send(
               JSON.stringify({
                  type: "Movement Rejected",
                  data: {
                     roomID: res.data.roomID,
                     userID: res.data.userID,
                     x: res.data.x,
                     y: res.data.y,
                  },
               }),
            );
            RoomManager.getInstance().displayRooms();
         }
      }
   });
   ws.on("close", function close() {
      console.log("User disconnected");

      const roomManager = RoomManager.getInstance();

      for (const [roomID, usersMap] of roomManager.getRooms()) {
         for (const [userID, user] of usersMap) {
            if (user.getWs() === ws) {
               // Remove user from room
               roomManager.destroy(roomID, userID);
               RoomManager.getInstance().broadcast("leaveRoom", roomID, userID);

               console.log(`User ${userID} removed from room ${roomID}`);
               roomManager.displayRooms();
               ws.close();
               return;
            }
         }
      }
   });

   ws.send(JSON.stringify({ Status: `User Connected  ` }));
});
const PORT = 8080;
server.listen(PORT, function listen() {
   console.log(`Listening on Port ${PORT}`);
});

// {
//     "type":"movement",
//     "data":{
//       "roomID":1,
//       "userID":2,
//       "x":20,
//       "y":40
//     }
//   }
