import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupSession, isAuthenticated } from "./auth";
import { loginSchema, signupSchema } from "./models/index";
import quotesRouter from "./routes/quotes";
import systemsRouter from "./routes/systems";


export async function registerRoutes(app: Express): Promise<Server> {
  // Setup session middleware (MongoDB-backed)
  await setupSession(app);

  // 🔑 Login route
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const loginData = loginSchema.parse(req.body);

      const user = await storage.validateUser(loginData.email, loginData.password);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      (req.session as any).userId = user._id ? String(user._id) : String(user.id);

      // Convert to plain object and remove password
      const userObj = user.toObject ? user.toObject() : user;
      const { password, ...userWithoutPassword } = userObj;

      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({ message: "Invalid login data" });
    }
  });

  // 🔑 Signup route
  app.post("/api/auth/signup", async (req: Request, res: Response) => {
    try {
      const signupData = signupSchema.parse(req.body);

      // Check if user exists
      const existingUser = await storage.getUserByEmail(signupData.email);
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      // Create user
      const newUser = await storage.createUser({
        email: signupData.email,
        password: signupData.password,
        firstName: signupData.firstName,
      });

      // Auto-login
      (req.session as any).userId = newUser._id ? String(newUser._id) : String(newUser.id);

      const userObj = newUser.toObject ? newUser.toObject() : newUser;
      const { password, ...userWithoutPassword } = userObj;

      res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(400).json({ message: "Invalid signup data" });
    }
  });

  // 🔑 Logout route
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err: any) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  });

  // 🔑 Get current user
  app.get("/api/auth/user", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ message: "No user session" });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const userObj = user.toObject ? user.toObject() : user;
      const { password, ...userWithoutPassword } = userObj;

      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // ✅ Protected routes
  app.use("/api/quotes", isAuthenticated, quotesRouter);
  app.use("/api/systems", isAuthenticated, systemsRouter);

  // ✅ Create HTTP server
  const server = createServer(app);
  return server;
}
