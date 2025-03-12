import mongoose from "mongoose"
import {config} from "dotenv"
config();
export const connectdb=async()=>{
    try{
      await mongoose.connect(process.env.MONGODB_URI! as string);
      console.log("Databse Connected");

    }catch(err){
        console.error("Db connection Error :",err);
        process.exit(1);
    }
}