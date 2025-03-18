import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import User from "../models/UserModel";
import jwt from "jsonwebtoken";

export const register: RequestHandler = async (req, res) => {
  console.log("in register");
  console.log(req.body);

  const { name, email, password } = req.body;
   if (!name || !email || !password) {
     res.status(400).json({ message: "All fields (name, email, password) are required" });
     return;
  }

  try {
    
   
    const existingUser = await User.findOne({ email:email });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
     // console.log("after")
       return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string);
    res.setHeader("Authorization", `Bearer ${token}`);
     res.status(201).json({
      message: "User created successfully"
      
    });
  } catch (err) {
    console.error(err);
     res.status(500).json({ message: "Server Error" });
  }
};
