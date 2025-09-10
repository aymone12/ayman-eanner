import type { Express, RequestHandler } from "express";
import session from "express-session";
import { storage } from "./storage";

export async function setupSession(app: Express) {
  // Using memory storage for development - no database connection needed
  
  app.set("trust proxy", 1);
  
  // Use memory store for development (in production, should use database store)
  app.use(session({
    secret: process.env.SESSION_SECRET || "your-dev-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    },
  }));
}

export const isAuthenticated: RequestHandler = async (req: any, res, next) => {
  const userId = (req.session as any).userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await storage.getUser(userId);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Convert MongoDB document to plain object for compatibility
  req.user = user.toObject ? user.toObject() : user;
  next();
};

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
    interface Session {
      userId?: string;
    }
  }
}