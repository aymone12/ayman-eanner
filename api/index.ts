import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createServer } from 'http'
import express from 'express'
import { registerRoutes } from '../server/routes'
import { setupSession } from '../server/auth'

// This wraps your existing Express app as a serverless function
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  await setupSession(app)
  const server = await registerRoutes(app)

  // Let Express handle the request
  const nodeServer = createServer(app)
  nodeServer.emit('request', req, res)
}

