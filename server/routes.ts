import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import quotesRouter from "./routes/quotes";
import systemsRouter from "./routes/systems";

export async function registerRoutes(app: Express): Promise<Server> {
  // Database routes
  app.use("/api/quotes", quotesRouter);
  app.use("/api/systems", systemsRouter);

  // Original storage routes (if needed)
  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
