"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, coordinates, ws) {
        this.UserID = id;
        this.coordinates = coordinates;
        this.ws = ws;
    }
    getID() {
        return this.UserID;
    }
    getCoordinates() {
        return this.coordinates;
    }
    setCoordiantes(coordinates) {
        this.coordinates.x = coordinates.x;
        this.coordinates.y = coordinates.y;
    }
    getWs() {
        return this.ws;
    }
}
exports.User = User;
