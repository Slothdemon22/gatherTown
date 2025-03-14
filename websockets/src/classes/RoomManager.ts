import { Coordinates } from "./types";
import { User } from "./User";

export class RoomManager {
   private static Instance: RoomManager;
   private Room: Map<number, Map<number, User>>;

   private constructor() {
      this.Room = new Map<number, Map<number, User>>();
   }

   static getInstance() {
      if (!RoomManager.Instance) RoomManager.Instance = new RoomManager();
      return RoomManager.Instance;
   }

   public addUser(roomID: number, user: User) {
      if (!roomID) user.getWs().close();
      if (!this.Room.has(roomID)) {
         this.Room.set(roomID, new Map());
      }
      this.Room.get(roomID)?.set(user.getID(), user);
   }

   public updateMovement(
      roomID: number,
      userID: number,
      coordinates: Coordinates,
   ) {
      const room = this.Room.get(roomID);
      if (room) {
         const user = room.get(userID);
         if (user) {
            user.setCoordiantes(coordinates);
         }
      }
   }

   public displayRooms() {
      for (const [roomID, usersMap] of this.Room) {
         console.log(`RoomID: ${roomID}`);
         for (const [userID, user] of usersMap) {
            console.log(
               `  UserID: ${userID}, Coordinates: ${JSON.stringify(
                  user.getCoordinates(),
               )}`,
            );
         }
      }
   }

   public destroy(roomID: number, userID: number) {
      const room = this.Room.get(roomID);
      if (room) {
         room.get(userID)?.getWs().close();
         room.delete(userID);

         if (room.size === 0) this.Room.delete(roomID);
      }
   }

   public checkMovement(
      roomID: number,
      userID: number,
      newCoordinates: Coordinates,
   ): boolean {
      const room = this.Room.get(roomID);
      if (!room) return false; // If no room exists movement is not allowed

      console.log(
         "in Check Movement",
         "Old Coordinates:",
         room.get(userID)?.getCoordinates(),
         "New Coordinates:",
         newCoordinates,
      );

      for (const user of room.values()) {
         if (
            user.getCoordinates().x === newCoordinates.x &&
            user.getCoordinates().y === newCoordinates.y
         ) {
            return false; // Spot  occupied
         }
      }
      return true; // Spot free
   }

   public getRooms() {
      return this.Room;
   }

   public broadcast(type: string, roomID: number, userID: number) {
      const room = this.Room.get(roomID);
      if (!room) return;

      let message = "";
      switch (type) {
         case "leaveRoom":
            message = `User with ID ${userID} left space with ${roomID}`;
            break;
         case "joinRoom":
            message = `User with ID ${userID} joined space with ${roomID}`;
            break;
         case "movement":
            message = `User with ID ${userID} moved in space with ${roomID}`;
            break;
      }

      const coordinates = this.Room.get(roomID)?.get(userID)?.getCoordinates();
      this.sendBroadcast(room, userID, message, type, coordinates);
   }

   private sendBroadcast(
      room: Map<number, User>,
      userID: number,
      message: string,
      type: string,
      coordinates?: Coordinates,
   ) {
      for (const [userid, user] of room) {
         if (userid !== userID) {
            user.getWs().send(
               JSON.stringify({
                  type: "broadcast",
                  data: {
                     userID,
                     message,
                     x: coordinates?.x,
                     y: coordinates?.y,
                  },
               }),
            );
         }
      }
   }
}
