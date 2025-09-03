const mongoose = require('mongoose');

const quotesSchema = new mongoose.Schema({
  // Personal Information
  personalInfo: {
    fullName: {
      type: String,
      trim: true
    },
    phoneNumber: {
      type: String,
      trim: true
    },
    homeAddress: {
      type: String,
      trim: true
    }
  },
  
  // System Configuration
  systemConfig: {
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
    electricBill: {
      type: Number,
      required: true,
      min: 0
    }
  },
  
  // Property Information
  propertyInfo: {
    propertyType: {
      type: String,
      trim: true
    },
    humidityIndex: {
      type: String,
      trim: true
    },
    roofSunlightExposure: {
      type: String,
      trim: true
    }
  },
  
  // Energy Storage Options
  energyStorage: {
    storageMode: {
      type: String,
      trim: true
    },
    maintenanceService: {
      type: String,
      trim: true
    },
    backupHours: {
      type: Number,
      min: 0
    }
  },
  
  // Simulation Results
  simulationResults: {
    estimatedCost: {
      amount: {
        type: Number,
        min: 0
      },
      currency: {
        type: String,
        default: 'DH'
      }
    },
    annualSavings: {
      amount: {
        type: Number,
        min: 0
      },
      currency: {
        type: String,
        default: 'DH'
      }
    },
    paybackPeriod: {
      years: {
        type: Number,
        min: 0
      }
    },
    installationTime: {
      hours: {
        type: Number,
        min: 0
      }
    }
  },
  
  // Status and Tracking
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Optional: Customer communication preferences
  preferences: {
    contactMethod: {
      type: String,
      enum: ['phone', 'email', 'sms'],
      default: 'phone'
    },
    bestTimeToContact: {
      type: String,
      trim: true
    }
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  collection: 'quotes'
});

// Indexes for optimal performance
quotesSchema.index({ 'personalInfo.phoneNumber': 1 });
quotesSchema.index({ 'status': 1 });
quotesSchema.index({ 'createdAt': -1 });
quotesSchema.index({ 'systemConfig.gridType': 1, 'systemConfig.installationType': 1 });

// Instance methods
quotesSchema.methods.calculateSimulation = function() {
  const { electricBill, gridType, installationType } = this.systemConfig;
  
  // Sample calculation logic
  const estimatedCost = electricBill * 120; // DH per monthly bill
  const annualSavings = electricBill * 12 * 0.8; // 80% savings
  const paybackPeriod = estimatedCost / annualSavings;
  const installationTime = installationType === 'hybrid' ? 40 : 
                          installationType === 'offgrid' ? 35 : 30;
  
  this.simulationResults = {
    estimatedCost: { amount: estimatedCost, currency: 'DH' },
    annualSavings: { amount: annualSavings, currency: 'DH' },
    paybackPeriod: { years: Math.ceil(paybackPeriod) },
    installationTime: { hours: installationTime }
  };
  
  return this.simulationResults;
};

// Static methods
quotesSchema.statics.findByStatus = function(status) {
  return this.find({ status }).sort({ createdAt: -1 });
};

quotesSchema.statics.findByPhoneNumber = function(phoneNumber) {
  return this.find({ 'personalInfo.phoneNumber': phoneNumber });
};

module.exports = mongoose.model('Quote', quotesSchema);