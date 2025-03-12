import { Request, Response, NextFunction } from "express";
import jwt,{ JwtPayload } from "jsonwebtoken";
interface AuthRequest extends Request {
    user?: string | JwtPayload;
  }
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    
    if (!token) {
         res.status(401).json({ message: "Unauthorized access" });
         return;
    }
    
    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;  
        next();
    } catch (error) {
         res.status(401).json({ message: "Invalid token" });
         return;
    }
};