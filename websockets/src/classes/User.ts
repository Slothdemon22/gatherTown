import { WebSocket } from "ws";
import { Coordinates } from "./types";
export class User {
    private UserID: number;
    private ws: WebSocket;
    private coordinates: Coordinates;
  
    constructor(id: number, coordinates: Coordinates, ws: WebSocket) {
      this.UserID = id;
      this.coordinates = coordinates;
      this.ws = ws;
    }
  
    public getID() {
      return this.UserID;
    }
  
    public getCoordinates():Coordinates {
      return this.coordinates;
    }
    public setCoordiantes(coordinates:Coordinates):void
    {
      this.coordinates.x = coordinates.x;
      this.coordinates.y = coordinates.y;
  
    }
    public getWs() {
      return this.ws;
    }
  }
  