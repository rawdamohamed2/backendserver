import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = "mysecretkey";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.token as string;
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, SECRET);
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};