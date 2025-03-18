import mongoose, { Schema, model, Document } from "mongoose";

interface Elements extends Document
{
    item: {
        id: string,
        image: string,
        static:boolean
    },
    x: number,
    y:number
}
 const ElementSchema: Schema<Elements> = new Schema(
    {
        item:
        {
            id: { type: String, required: true },
            image: { type: String, required: true },
            static:{type:Boolean,required:true}
            
        },
        x: {
            type: Number,
            required:true,
        },
        y: {
            type: Number,
            required:true,
        },
    }
)
const ElementModel = model<Elements>("Elements", ElementSchema);
export default ElementModel;
    

