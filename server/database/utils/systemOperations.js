const { SystemType, PropertyType, PricingRule } = require('../models');

class SystemOperations {
  // Get system recommendations based on electric bill and property type
  static async getSystemRecommendations(electricBill, propertyType) {
    try {
      const recommendations = await SystemType.findRecommendations(electricBill, propertyType);

      return {
        success: true,
        data: recommendations,
        message: 'System recommendations retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve system recommendations'
      };
    }
  }

  // Get all system types
  static async getAllSystemTypes(filters = {}) {
    try {
      const query = { isActive: true };
      
      if (filters.gridType) query.gridType = filters.gridType;
      if (filters.installationType) query.installationType = filters.installationType;

      const systemTypes = await SystemType.find(query).sort({ 'pricing.baseCost': 1 });

      return {
        success: true,
        data: systemTypes,
        message: 'System types retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve system types'
      };
    }
  }

  // Create new system type
  static async createSystemType(systemData) {
    try {
      const systemType = new SystemType(systemData);
      const savedSystemType = await systemType.save();

      return {
        success: true,
        data: savedSystemType,
        message: 'System type created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to create system type'
      };
    }
  }

  // Update system type
  static async updateSystemType(systemTypeId, updateData) {
    try {
      const systemType = await SystemType.findByIdAndUpdate(
        systemTypeId,
        updateData,
        { new: true, runValidators: true }
      );

      if (!systemType) {
        return {
          success: false,
          message: 'System type not found'
        };
      }

      return {
        success: true,
        data: systemType,
        message: 'System type updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to update system type'
      };
    }
  }

  // Get all property types
  static async getAllPropertyTypes() {
    try {
      const propertyTypes = await PropertyType.getAllActive();

      return {
        success: true,
        data: propertyTypes,
        message: 'Property types retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve property types'
      };
    }
  }

  // Get property type details
  static async getPropertyTypeDetails(propertyType) {
    try {
      const details = await PropertyType.findByType(propertyType);

      if (!details) {
        return {
          success: false,
          message: 'Property type not found'
        };
      }

      return {
        success: true,
        data: details,
        message: 'Property type details retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve property type details'
      };
    }
  }

  // Create property type
  static async createPropertyType(propertyData) {
    try {
      const propertyType = new PropertyType(propertyData);
      const savedPropertyType = await propertyType.save();

      return {
        success: true,
        data: savedPropertyType,
        message: 'Property type created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to create property type'
      };
    }
  }

  // Get applicable pricing rules
  static async getApplicablePricingRules(conditions) {
    try {
      const rules = await PricingRule.findApplicableRules(conditions);

      return {
        success: true,
        data: rules,
        message: 'Pricing rules retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to retrieve pricing rules'
      };
    }
  }

  // Calculate advanced pricing
  static async calculateAdvancedPricing(quoteData) {
    try {
      const { systemConfig, propertyInfo } = quoteData;
      
      // Get applicable pricing rules
      const rulesResult = await this.getApplicablePricingRules({
        electricBill: systemConfig.electricBill,
        propertyType: propertyInfo.propertyType,
        systemType: `${systemConfig.gridType}_${systemConfig.installationType}`
      });

      if (!rulesResult.success) {
        throw new Error('Failed to get pricing rules');
      }

      // Get property type details for modifiers
      const propertyResult = await this.getPropertyTypeDetails(propertyInfo.propertyType);
      const propertyDetails = propertyResult.success ? propertyResult.data : null;

      // Basic calculation
      let estimatedCost = systemConfig.electricBill * 120;
      let annualSavings = systemConfig.electricBill * 12 * 0.8;
      let installationTime = systemConfig.installationType === 'hybrid' ? 40 : 
                            systemConfig.installationType === 'offgrid' ? 35 : 30;

      // Apply property modifiers if available
      if (propertyDetails) {
        const factors = propertyDetails.solarFactors;
        estimatedCost *= factors.humidityImpact || 1;
        annualSavings *= factors.sunlightOptimization || 1;
        installationTime *= factors.installationTimeMultiplier || 1;
      }

      // Apply pricing rules
      rulesResult.data.forEach(rule => {
        // This is a simplified example - you would implement actual formula evaluation
        if (rule.ruleType === 'base_calculation' && rule.calculations.costFormula) {
          // In a real implementation, you'd safely evaluate the formula
          // For now, we'll apply a simple modifier
          estimatedCost *= 1.1; // 10% increase as example
        }
      });

      const paybackPeriod = estimatedCost / annualSavings;

      return {
        success: true,
        data: {
          estimatedCost: { amount: Math.round(estimatedCost), currency: 'DH' },
          annualSavings: { amount: Math.round(annualSavings), currency: 'DH' },
          paybackPeriod: { years: Math.ceil(paybackPeriod) },
          installationTime: { hours: Math.round(installationTime) }
        },
        message: 'Advanced pricing calculated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to calculate advanced pricing'
      };
    }
  }
}

module.exports = SystemOperations;