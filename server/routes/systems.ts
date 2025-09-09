import { Router } from "express";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { SystemOperations } = require("../database/utils");

const router = Router();

// Get system recommendations
router.get("/recommendations", async (req, res) => {
  try {
    const { electricBill, propertyType } = req.query;
    
    if (!electricBill || !propertyType) {
      return res.status(400).json({
        success: false,
        message: "electricBill and propertyType are required"
      });
    }

    const result = await SystemOperations.getSystemRecommendations(
      parseFloat(electricBill as string),
      propertyType as string
    );
    
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

// Get all system types
router.get("/types", async (req, res) => {
  try {
    const filters = {
      gridType: req.query.gridType as string,
      installationType: req.query.installationType as string
    };

    const result = await SystemOperations.getAllSystemTypes(filters);
    
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

// Create new system type
router.post("/types", async (req, res) => {
  try {
    const result = await SystemOperations.createSystemType(req.body);
    
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

// Update system type
router.put("/types/:id", async (req, res) => {
  try {
    const result = await SystemOperations.updateSystemType(req.params.id, req.body);
    
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

// Get all property types
router.get("/property-types", async (req, res) => {
  try {
    const result = await SystemOperations.getAllPropertyTypes();
    
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

// Get property type details
router.get("/property-types/:type", async (req, res) => {
  try {
    const result = await SystemOperations.getPropertyTypeDetails(req.params.type);
    
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

// Create property type
router.post("/property-types", async (req, res) => {
  try {
    const result = await SystemOperations.createPropertyType(req.body);
    
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

// Get applicable pricing rules
router.get("/pricing-rules", async (req, res) => {
  try {
    const conditions = {
      electricBill: req.query.electricBill ? parseFloat(req.query.electricBill as string) : undefined,
      propertyType: req.query.propertyType as string,
      systemType: req.query.systemType as string
    };

    const result = await SystemOperations.getApplicablePricingRules(conditions);
    
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