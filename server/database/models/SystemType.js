const mongoose = require('mongoose');

const systemTypesSchema = new mongoose.Schema({
  gridType: {
    type: String,
    enum: ['three_phase', 'single_phase'],
    required: true
  },
  installationType: {
    type: String,
    enum: ['ongrid', 'offgrid', 'hybrid'],
    required: true
  },
  
  // Technical specifications
  specifications: {
    powerCapacity: {
      type: String,
      trim: true
    },
    efficiency: {
      type: Number,
      min: 0,
      max: 100
    },
    warranty: {
      type: String,
      trim: true
    },
    components: [{
      type: String,
      trim: true
    }]
  },
  
  // Pricing information
  pricing: {
    baseCost: {
      type: Number,
      min: 0,
      required: true
    },
    costPerKW: {
      type: Number,
      min: 0
    },
    maintenanceCostAnnual: {
      type: Number,
      min: 0
    }
  },
  
  // Suitability criteria
  suitability: {
    minElectricBill: {
      type: Number,
      min: 0
    },
    maxElectricBill: {
      type: Number,
      min: 0
    },
    recommendedPropertyTypes: [{
      type: String,
      trim: true
    }]
  },
  
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: 'systemTypes'
});

// Indexes
systemTypesSchema.index({ 'gridType': 1, 'installationType': 1 });
systemTypesSchema.index({ 'isActive': 1 });
systemTypesSchema.index({ 'pricing.baseCost': 1 });

// Static methods
systemTypesSchema.statics.findRecommendations = function(electricBill, propertyType) {
  return this.find({
    'suitability.minElectricBill': { $lte: electricBill },
    'suitability.maxElectricBill': { $gte: electricBill },
    'suitability.recommendedPropertyTypes': propertyType,
    isActive: true
  }).sort({ 'pricing.baseCost': 1 });
};

systemTypesSchema.statics.findByType = function(gridType, installationType) {
  return this.find({ 
    gridType, 
    installationType, 
    isActive: true 
  });
};

module.exports = mongoose.model('SystemType', systemTypesSchema);