import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Simple API response for now
    const { method, url } = req;
    
    // Basic routing
    if (url?.startsWith('/api/health')) {
      return res.status(200).json({ status: 'OK', message: 'API is working' });
    }
    
    if (url?.startsWith('/api/auth/login')) {
      return res.status(200).json({ message: 'Login endpoint - to be implemented' });
    }
    
    if (url?.startsWith('/api/auth/signup')) {
      return res.status(200).json({ message: 'Signup endpoint - to be implemented' });
    }
    
    // Default response
    return res.status(404).json({ error: 'API endpoint not found' });
    
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
