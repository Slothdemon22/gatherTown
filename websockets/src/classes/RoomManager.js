var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
                    console.log("RoomID ", key, " User ", value);
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
var User = /** @class */ (function () {
    function User(id) {
        this.UserID = id;
    }
    User.prototype.getID = function () {
        return this.UserID;
    };
    return User;
}());
var obj = RoomManager.getInstance();
var user1 = new User("123");
var user2 = new User("456");
var user3 = new User("789");
obj.addUser(1, user1);
obj.addUser(1, user2);
obj.addUser(2, user3);
obj.displayRooms();
