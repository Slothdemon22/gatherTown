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
        const room = this.Room.get(roomID);
        if (room) {
            room.delete(userID);
            if (room.size === 0)
                this.Room.delete(roomID);
        }
    }
    checkMovement(roomID, userID, newCoordinates) {
        var _a;
        const room = this.Room.get(roomID);
        if (!room)
            return true; // If no room exists, movement is allowed
        console.log("in Check Movement", "Old Coordinates:", (_a = room.get(userID)) === null || _a === void 0 ? void 0 : _a.getCoordinates(), "New Coordinates:", newCoordinates);
        for (const user of room.values()) {
            if (user.getCoordinates().x === newCoordinates.x && user.getCoordinates().y === newCoordinates.y) {
                return false; // Spot is occupied
            }
        }
        return true; // Spot is free
    }
    broadcast(type, roomID, userID) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const room = this.Room.get(roomID);
        if (!room)
            return;
        if (type == "leaveRoom") {
            for (const [userid, user] of room) {
                if (userid !== userID) {
                    user.getWs().send(JSON.stringify({
                        type: "broadcast",
                        data: {
                            userID: userID,
                            message: `User with ID ${userID} left space with ${roomID}`,
                        },
                    }));
                }
            }
        }
        else if (type == "joinRoom") {
            for (const [userid, user] of room) {
                if (userid !== userID) {
                    user.getWs().send(JSON.stringify({
                        type: "broadcast",
                        data: {
                            userID: userID,
                            message: `User with ID ${userID} joined space with ${roomID}`,
                            x: (_b = (_a = this.Room.get(roomID)) === null || _a === void 0 ? void 0 : _a.get(userID)) === null || _b === void 0 ? void 0 : _b.getCoordinates().x,
                            y: (_d = (_c = this.Room.get(roomID)) === null || _c === void 0 ? void 0 : _c.get(userID)) === null || _d === void 0 ? void 0 : _d.getCoordinates().y,
                        },
                    }));
                }
            }
        }
        else if (type == "movement") {
            console.log("In Movement");
            for (const [userid, user] of room) {
                if (userid !== userID) {
                    user.getWs().send(JSON.stringify({
                        type: "broadcast",
                        data: {
                            userID: userID,
                            message: `User with ID ${userID} moved in space with ${roomID}`,
                            x: (_f = (_e = this.Room.get(roomID)) === null || _e === void 0 ? void 0 : _e.get(userID)) === null || _f === void 0 ? void 0 : _f.getCoordinates().x,
                            y: (_h = (_g = this.Room.get(roomID)) === null || _g === void 0 ? void 0 : _g.get(userID)) === null || _h === void 0 ? void 0 : _h.getCoordinates().y,
                        },
                    }));
                }
            }
        }
        else if (type == 'rejected') {
            for (const [userid, user] of room) {
                if (userid !== userID) {
                    user.getWs().send(JSON.stringify({
                        type: "broadcast",
                        data: {
                            userID: userID,
                            message: `User with ID ${userID} movement rejected in space with ${roomID}`,
                            x: (_k = (_j = this.Room.get(roomID)) === null || _j === void 0 ? void 0 : _j.get(userID)) === null || _k === void 0 ? void 0 : _k.getCoordinates().x,
                            y: (_m = (_l = this.Room.get(roomID)) === null || _l === void 0 ? void 0 : _l.get(userID)) === null || _m === void 0 ? void 0 : _m.getCoordinates().y,
                        },
                    }));
                }
            }
        }
    }
}
exports.RoomManager = RoomManager;
