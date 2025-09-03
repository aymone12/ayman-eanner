import { Router } from "express";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { QuoteOperations, SystemOperations } = require("../database/utils");

const router = Router();

// Create a new quote
router.post("/", async (req, res) => {
  try {
    const result = await QuoteOperations.createQuote(req.body);
    
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
});

// Get all quotes with filters
router.get("/", async (req, res) => {
  try {
    const filters = {
      status: req.query.status as string,
      gridType: req.query.gridType as string,
      installationType: req.query.installationType as string,
      dateFrom: req.query.dateFrom as string,
      dateTo: req.query.dateTo as string,
      phoneNumber: req.query.phoneNumber as string,
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 50
    };

    const result = await QuoteOperations.findQuotes(filters);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
});

// Get quote by ID
router.get("/:id", async (req, res) => {
  try {
    const result = await QuoteOperations.getQuoteById(req.params.id);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
});

// Update quote
router.put("/:id", async (req, res) => {
  try {
    const result = await QuoteOperations.updateQuote(req.params.id, req.body);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
});

// Update quote status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const result = await QuoteOperations.updateQuoteStatus(req.params.id, status);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
});

// Delete quote
router.delete("/:id", async (req, res) => {
  try {
    const result = await QuoteOperations.deleteQuote(req.params.id);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
});

// Get quotes statistics
router.get("/stats/overview", async (req, res) => {
  try {
    const result = await QuoteOperations.getQuotesStatistics();
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
});

// Calculate quote with advanced pricing
router.post("/calculate", async (req, res) => {
  try {
    const result = await SystemOperations.calculateAdvancedPricing(req.body);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
});

export default router;