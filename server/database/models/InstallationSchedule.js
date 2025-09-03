const mongoose = require('mongoose');

const installationScheduleSchema = new mongoose.Schema({
  quoteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quote',
    required: true
  },
  
  scheduledDate: {
    type: Date,
    required: true
  },
  estimatedDuration: {
    type: Number, // in hours
    min: 1,
    required: true
  },
  
  team: {
    leadTechnician: {
      type: String,
      trim: true,
      required: true
    },
    teamMembers: [{
      type: String,
      trim: true
    }],
    contactNumber: {
      type: String,
      trim: true
    }
  },
  
  status: {
    type: String,
    enum: ['scheduled', 'in_progress', 'completed', 'rescheduled', 'cancelled'],
    default: 'scheduled'
  },
  
  notes: {
    type: String,
    trim: true
  },
  
  completionDetails: {
    actualDuration: {
      type: Number, // in hours
      min: 0
    },
    installedComponents: [{
      type: String,
      trim: true
    }],
    testResults: {
      type: String,
      trim: true
    },
    customerSignoff: {
      type: Boolean,
      default: false
    },
    photos: [{
      type: String, // URLs to installation photos
      trim: true
    }]
  }
}, {
  timestamps: true,
  collection: 'installationSchedule'
});

// Indexes
installationScheduleSchema.index({ 'quoteId': 1 });
installationScheduleSchema.index({ 'scheduledDate': 1 });
installationScheduleSchema.index({ 'status': 1 });
installationScheduleSchema.index({ 'team.leadTechnician': 1 });

// Static methods
installationScheduleSchema.statics.findByQuote = function(quoteId) {
  return this.findOne({ quoteId }).populate('quoteId');
};

installationScheduleSchema.statics.findByDateRange = function(startDate, endDate) {
  return this.find({
    scheduledDate: {
      $gte: startDate,
      $lte: endDate
    }
  }).populate('quoteId');
};

installationScheduleSchema.statics.findByTechnician = function(technicianName) {
  return this.find({
    'team.leadTechnician': technicianName
  }).populate('quoteId');
};

installationScheduleSchema.statics.findByStatus = function(status) {
  return this.find({ status }).populate('quoteId').sort({ scheduledDate: 1 });
};

// Instance methods
installationScheduleSchema.methods.markCompleted = function(completionData) {
  this.status = 'completed';
  this.completionDetails = {
    ...this.completionDetails,
    ...completionData
  };
  return this.save();
};

installationScheduleSchema.methods.reschedule = function(newDate, reason) {
  this.status = 'rescheduled';
  this.scheduledDate = newDate;
  this.notes = this.notes ? `${this.notes}\nRescheduled: ${reason}` : `Rescheduled: ${reason}`;
  return this.save();
};

module.exports = mongoose.model('InstallationSchedule', installationScheduleSchema);