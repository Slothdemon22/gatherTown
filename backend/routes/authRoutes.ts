import { Router } from "express";  
const router = Router();  


import { register } from "../controllers/signUpController";
import {login} from '../controllers/signInController'
import {authMiddleware} from '../middlewares/authMiddleware'

router.post("/register", register);
router.post("/login",login);
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ "message": "Profile" });
  });

export default router;