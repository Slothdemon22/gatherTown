import mongoose, { Schema, model,Document, mongo } from "mongoose";

interface IRoomSchema extends Document
{
    Dimensions: string,
    DisplayImage: string,
    elements:mongoose.Types.ObjectId[],
  
}

const RoomSchema: Schema<IRoomSchema> = new Schema(
    {
        Dimensions: { type: String, required: true },
        DisplayImage: { type: String, required: true },
        elements:[{type:mongoose.Schema.Types.ObjectId,ref:"Elements"}]
        
        
    }
)
const RoomModel = model<IRoomSchema>("RoomElements", RoomSchema);
export default RoomModel;
