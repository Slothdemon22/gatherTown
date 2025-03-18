/** @format */

import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/UserModel';
import jwt from 'jsonwebtoken';
import { userSignInSchema } from '../schemas/userSchemas';

export const login: RequestHandler = async (req, res) => {
  const parsedBody = userSignInSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({ message: 'Error while parsing data', status: 400 });
    return;
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "Email don't exists" });
    return;
  }
  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({
        message: 'Invalid Email or password',
      });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

    res.status(200).json({
      message: 'Login successful',
      email: user.email,
      id: user._id,
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
  return;
};
