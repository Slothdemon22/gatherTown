import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectdb } from "../config/db";
import authRoutes from "../routes/authRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); 

dotenv.config();
app.use(cors({
  origin: "*", // Change this to your frontend URL
  credentials: true,
  
  exposedHeaders: ["Authorization"]
}));
app.use(express.json());

connectdb();
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is  on port ${port}`);
});
