import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupSession, isAuthenticated } from "./auth";
import { loginSchema, signupSchema } from "./models";
import quotesRouter from "./routes/quotes";
import systemsRouter from "./routes/systems";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup session middleware (now async for MongoDB connection)
  await setupSession(app);

  // Authentication routes
  app.post("/api/auth/login", async (req: any, res) => {
    try {
      const loginData = loginSchema.parse(req.body);
      
      const user = await storage.validateUser(loginData.email, loginData.password);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      req.session.userId = user._id.toString();
      
      // Convert to plain object and remove password
      const userObj = user.toObject ? user.toObject() : user;
      const { password, ...userWithoutPassword } = userObj;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({ message: "Invalid login data" });
    }
  });

  app.post("/api/auth/signup", async (req: any, res) => {
    try {
      const signupData = signupSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(signupData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      const user = await storage.createUser(req.body);
      req.session.userId = user._id.toString();
      
      // Convert to plain object and remove password
      const userObj = user.toObject ? user.toObject() : user;
      const { password, ...userWithoutPassword } = userObj;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(400).json({ message: "Invalid signup data" });
    }
  });

  app.post("/api/auth/logout", (req: any, res) => {
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      
      // Convert to plain object and remove password
      const userObj = user.toObject ? user.toObject() : user;
      const { password, ...userWithoutPassword } = userObj;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Database routes
  app.use("/api/quotes", quotesRouter);
  app.use("/api/systems", systemsRouter);

  const httpServer = createServer(app);

  return httpServer;
}
