const mongoose = require('mongoose');

const pricingRulesSchema = new mongoose.Schema({
  ruleType: {
    type: String,
    enum: ['base_calculation', 'property_modifier', 'system_modifier', 'regional_modifier'],
    required: true
  },
  
  conditions: {
    electricBillRange: {
      min: {
        type: Number,
        min: 0
      },
      max: {
        type: Number,
        min: 0
      }
    },
    propertyType: {
      type: String,
      trim: true
    },
    systemType: {
      type: String,
      trim: true
    },
    region: {
      type: String,
      trim: true
    }
  },
  
  calculations: {
    costFormula: {
      type: String,
      trim: true
    }, // e.g., "electricBill * 120 + baseCost"
    savingsFormula: {
      type: String,
      trim: true
    },
    paybackFormula: {
      type: String,
      trim: true
    },
    installationTimeFormula: {
      type: String,
      trim: true
    }
  },
  
  isActive: {
    type: Boolean,
    default: true
  },
  validFrom: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date
  }
}, {
  timestamps: true,
  collection: 'pricingRules'
});

// Indexes
pricingRulesSchema.index({ 'ruleType': 1, 'isActive': 1 });
pricingRulesSchema.index({ 'validFrom': 1, 'validUntil': 1 });
pricingRulesSchema.index({ 'conditions.electricBillRange.min': 1, 'conditions.electricBillRange.max': 1 });

// Static methods
pricingRulesSchema.statics.findActiveRules = function(ruleType) {
  const now = new Date();
  return this.find({
    ruleType,
    isActive: true,
    validFrom: { $lte: now },
    $or: [
      { validUntil: { $exists: false } },
      { validUntil: { $gte: now } }
    ]
  });
};

pricingRulesSchema.statics.findApplicableRules = function(conditions) {
  const query = {
    isActive: true,
    validFrom: { $lte: new Date() },
    $or: [
      { validUntil: { $exists: false } },
      { validUntil: { $gte: new Date() } }
    ]
  };

  if (conditions.electricBill) {
    query['conditions.electricBillRange.min'] = { $lte: conditions.electricBill };
    query['conditions.electricBillRange.max'] = { $gte: conditions.electricBill };
  }

  if (conditions.propertyType) {
    query['conditions.propertyType'] = conditions.propertyType;
  }

  if (conditions.systemType) {
    query['conditions.systemType'] = conditions.systemType;
  }

  return this.find(query);
};

module.exports = mongoose.model('PricingRule', pricingRulesSchema);