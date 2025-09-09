const mongoose = require('mongoose');

const propertyTypesSchema = new mongoose.Schema({
  propertyType: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  
  characteristics: {
    typicalRoofSize: {
      type: Number, // in square meters
      min: 0
    },
    averagePowerConsumption: {
      type: Number, // in kWh
      min: 0
    },
    installationComplexity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    }
  },
  
  // Factors affecting solar efficiency
  solarFactors: {
    humidityImpact: {
      type: Number, // coefficient
      min: 0,
      max: 2,
      default: 1
    },
    sunlightOptimization: {
      type: Number, // coefficient
      min: 0,
      max: 2,
      default: 1
    },
    installationTimeMultiplier: {
      type: Number,
      min: 0.5,
      max: 3,
      default: 1
    }
  }
}, {
  timestamps: true,
  collection: 'propertyTypes'
});

// Indexes
propertyTypesSchema.index({ 'propertyType': 1 });
propertyTypesSchema.index({ 'characteristics.installationComplexity': 1 });

// Static methods
propertyTypesSchema.statics.findByType = function(propertyType) {
  return this.findOne({ propertyType });
};

propertyTypesSchema.statics.getAllActive = function() {
  return this.find({}).sort({ propertyType: 1 });
};

module.exports = mongoose.model('PropertyType', propertyTypesSchema);