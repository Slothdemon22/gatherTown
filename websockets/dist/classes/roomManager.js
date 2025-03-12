"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManager = void 0;
class RoomManager {
    constructor() {
        this.Room = new Map();
    }
    static getInstance() {
        if (!RoomManager.Instance)
            RoomManager.Instance = new RoomManager();
        return RoomManager.Instance;
    }
    addUser(roomID, user) {
        var _a;
        if (!roomID)
            user.getWs().close();
        if (!this.Room.has(roomID)) {
            this.Room.set(roomID, new Map());
        }
        (_a = this.Room.get(roomID)) === null || _a === void 0 ? void 0 : _a.set(user.getID(), user);
    }
    updateMovement(roomID, userID, coordinates) {
        const room = this.Room.get(roomID);
        if (room) {
            const user = room.get(userID);
            if (user) {
                user.setCoordiantes(coordinates);
            }
        }
    }
    displayRooms() {
        for (const [roomID, usersMap] of this.Room) {
            console.log(`RoomID: ${roomID}`);
            for (const [userID, user] of usersMap) {
                console.log(`  UserID: ${userID}, Coordinates: ${JSON.stringify(user.getCoordinates())}`);
            }
        }
    }
    destroy(roomID, userID) {
        var _a;
        const room = this.Room.get(roomID);
        if (room) {
            (_a = room.get(userID)) === null || _a === void 0 ? void 0 : _a.getWs().close();
            room.delete(userID);
            if (room.size === 0)
                this.Room.delete(roomID);
        }
    }
    checkMovement(roomID, userID, newCoordinates) {
        var _a;
        const room = this.Room.get(roomID);
        if (!room)
            return false; // If no room exists movement is not allowed
        console.log("in Check Movement", "Old Coordinates:", (_a = room.get(userID)) === null || _a === void 0 ? void 0 : _a.getCoordinates(), "New Coordinates:", newCoordinates);
        for (const user of room.values()) {
            if (user.getCoordinates().x === newCoordinates.x &&
                user.getCoordinates().y === newCoordinates.y) {
                return false; // Spot  occupied
            }
        }
        return true; // Spot free
    }
    getRooms() {
        return this.Room;
    }
    broadcast(type, roomID, userID) {
        var _a, _b;
        const room = this.Room.get(roomID);
        if (!room)
            return;
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
        const coordinates = (_b = (_a = this.Room.get(roomID)) === null || _a === void 0 ? void 0 : _a.get(userID)) === null || _b === void 0 ? void 0 : _b.getCoordinates();
        this.sendBroadcast(room, userID, message, type, coordinates);
    }
    sendBroadcast(room, userID, message, type, coordinates) {
        for (const [userid, user] of room) {
            if (userid !== userID) {
                user.getWs().send(JSON.stringify({
                    type: "broadcast",
                    data: {
                        userID,
                        message,
                        x: coordinates === null || coordinates === void 0 ? void 0 : coordinates.x,
                        y: coordinates === null || coordinates === void 0 ? void 0 : coordinates.y,
                    },
                }));
            }
        }
    }
}
exports.RoomManager = RoomManager;
