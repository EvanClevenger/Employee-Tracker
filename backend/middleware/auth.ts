import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.header("Authorization") ?? req.header("authorization");
    const token = header?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "No authentication token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default authMiddleware;
