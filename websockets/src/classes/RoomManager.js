"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.RoomManager = void 0;
var RoomManager = /** @class */ (function () {
    function RoomManager() {
        this.Room = new Map();
    }
    RoomManager.getInstance = function () {
        if (!RoomManager.Instance)
            RoomManager.Instance = new RoomManager();
        return RoomManager.Instance;
    };
    RoomManager.prototype.addUser = function (RoomID, user) {
        this.Room.set(RoomID, __spreadArray(__spreadArray([], (this.Room.get(RoomID) || []), true), [user], false));
    };
    RoomManager.prototype.displayRooms = function () {
        console.log("keys ", this.Room.keys);
        console.log("entries", this.Room.entries);
        var _loop_1 = function (key) {
            var users = this_1.Room.get(key);
            if (users) {
                users.forEach(function (value, index) {
                    console.log("RoomID ", key, " User ", value.getID(), "Coordiantes", value.getCoodinates());
                });
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = Array.from(this.Room.keys()); _i < _a.length; _i++) {
            var key = _a[_i];
            _loop_1(key);
        }
    };
    return RoomManager;
}());
exports.RoomManager = RoomManager;
var User = /** @class */ (function () {
    function User(id, coordinates) {
        this.UserID = id;
        this.coordinates = coordinates;
    }
    User.prototype.getID = function () {
        return this.UserID;
    };
    User.prototype.getCoodinates = function () {
        return this.coordinates;
    };
    return User;
}());
exports.User = User;
var obj = RoomManager.getInstance();
var user1 = new User("123", { x: 10, y: 2 });
var user2 = new User("456", { x: 11, y: 22 });
var user3 = new User("789", { x: 15, y: 24 });
var user4 = new User("101112", { x: 12, y: 21 });
var user5 = new User("131415", { x: 17, y: 28 });
var user6 = new User("161718", { x: 14, y: 26 });
obj.addUser(1, user1);
obj.addUser(1, user2);
obj.addUser(2, user3);
obj.displayRooms();
obj.addUser(1, user4);
obj.addUser(2, user5);
obj.addUser(2, user6);
obj.displayRooms();
