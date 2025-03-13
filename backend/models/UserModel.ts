import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}


const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
     
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } 
);


const User = mongoose.model<IUser>("User", UserSchema);

export default User;
