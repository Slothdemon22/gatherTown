class RoomManager {
  private static Instance: RoomManager;
  private Room: Map<number, User[]>;
  private constructor() {
    this.Room = new Map<number, User[]>();
  }
  static getInstance() {
    if (!RoomManager.Instance) RoomManager.Instance = new RoomManager();

    return RoomManager.Instance;
  }
  addUser(RoomID: number, user: User) {
    this.Room.set(RoomID, [...(this.Room.get(RoomID) || []), user]);
  }
  displayRooms() {
    console.log("keys ", this.Room.keys);
    console.log("entries", this.Room.entries);
      for (const key of Array.from(this.Room.keys())) {
       
      const users = this.Room.get(key);
      if (users) {
          users.forEach((value, index) => {
            console.log("RoomID ", key," User ", value);
            
        });
      }
    }
  }
}

class User {
  private UserID: string;
  constructor(id: string) {
    this.UserID = id;
  }
  getID() {
    return this.UserID;
  }
}
const obj = RoomManager.getInstance();
const user1 = new User("123");
const user2 = new User("456");
const user3 = new User("789");
obj.addUser(1, user1);
obj.addUser(1, user2);
obj.addUser(2, user3);
obj.displayRooms();
