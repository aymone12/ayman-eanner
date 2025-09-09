import express from "express";
import { VercelRequest, VercelResponse } from "@vercel/node";

// Import your existing server setup
import { setupSession } from "../server/auth.js";
import { registerRoutes } from "../server/routes.js";

let app: express.Application;

async function getApp() {
  if (!app) {
    app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    // Setup session and routes
    await setupSession(app);
    
    // Register your existing routes
    await registerRoutes(app);
    
    // Error handler
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      console.error("API Error:", err);
      res.status(status).json({ message });
    });
  }
  
  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const app = await getApp();
    return app(req, res);
  } catch (error) {
    console.error("Vercel function error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
