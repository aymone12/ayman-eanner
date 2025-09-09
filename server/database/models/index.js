// Export all models from a single file for easy importing
const Quote = require('./Quote');
const SystemType = require('./SystemType');
const PropertyType = require('./PropertyType');
const PricingRule = require('./PricingRule');
const InstallationSchedule = require('./InstallationSchedule');

module.exports = {
  Quote,
  SystemType,
  PropertyType,
  PricingRule,
  InstallationSchedule
};