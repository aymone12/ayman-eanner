const dbConnection = require('../config/connection');
const { SystemType, PropertyType, PricingRule } = require('../models');
const { sampleSystemTypes, samplePropertyTypes, samplePricingRules } = require('./sampleData');

async function seedDatabase() {
  try {
    console.log('Connecting to database...');
    await dbConnection.connect();

    console.log('Clearing existing data...');
    await Promise.all([
      SystemType.deleteMany({}),
      PropertyType.deleteMany({}),
      PricingRule.deleteMany({})
    ]);

    console.log('Seeding system types...');
    await SystemType.insertMany(sampleSystemTypes);

    console.log('Seeding property types...');
    await PropertyType.insertMany(samplePropertyTypes);

    console.log('Seeding pricing rules...');
    await PricingRule.insertMany(samplePricingRules);

    console.log('Database seeded successfully!');
    
    // Display summary
    const [systemCount, propertyCount, rulesCount] = await Promise.all([
      SystemType.countDocuments(),
      PropertyType.countDocuments(),
      PricingRule.countDocuments()
    ]);

    console.log('\nSeed Summary:');
    console.log(`- System Types: ${systemCount}`);
    console.log(`- Property Types: ${propertyCount}`);
    console.log(`- Pricing Rules: ${rulesCount}`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await dbConnection.disconnect();
    console.log('Database connection closed.');
  }
}

// Run the seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };