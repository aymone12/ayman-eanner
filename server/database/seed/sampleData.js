// Sample data for seeding the database
const sampleSystemTypes = [
  {
    gridType: 'three_phase',
    installationType: 'ongrid',
    specifications: {
      powerCapacity: '5-10 kW',
      efficiency: 85,
      warranty: '25 years',
      components: ['Solar Panels', 'Inverter', 'Monitoring System', 'Grid Connection']
    },
    pricing: {
      baseCost: 50000,
      costPerKW: 8000,
      maintenanceCostAnnual: 2000
    },
    suitability: {
      minElectricBill: 500,
      maxElectricBill: 2000,
      recommendedPropertyTypes: ['House', 'Villa', 'Small Business']
    },
    isActive: true
  },
  {
    gridType: 'single_phase',
    installationType: 'offgrid',
    specifications: {
      powerCapacity: '3-7 kW',
      efficiency: 80,
      warranty: '20 years',
      components: ['Solar Panels', 'Battery Storage', 'Charge Controller', 'Inverter']
    },
    pricing: {
      baseCost: 70000,
      costPerKW: 12000,
      maintenanceCostAnnual: 3000
    },
    suitability: {
      minElectricBill: 200,
      maxElectricBill: 1500,
      recommendedPropertyTypes: ['House', 'Cabin', 'Remote Property']
    },
    isActive: true
  },
  {
    gridType: 'three_phase',
    installationType: 'hybrid',
    specifications: {
      powerCapacity: '8-15 kW',
      efficiency: 90,
      warranty: '25 years',
      components: ['Solar Panels', 'Battery Storage', 'Hybrid Inverter', 'Grid Connection', 'Smart Monitoring']
    },
    pricing: {
      baseCost: 80000,
      costPerKW: 15000,
      maintenanceCostAnnual: 2500
    },
    suitability: {
      minElectricBill: 800,
      maxElectricBill: 5000,
      recommendedPropertyTypes: ['Villa', 'Large House', 'Business', 'Industrial']
    },
    isActive: true
  }
];

const samplePropertyTypes = [
  {
    propertyType: 'House',
    characteristics: {
      typicalRoofSize: 80,
      averagePowerConsumption: 150,
      installationComplexity: 'medium'
    },
    solarFactors: {
      humidityImpact: 1.0,
      sunlightOptimization: 1.2,
      installationTimeMultiplier: 1.0
    }
  },
  {
    propertyType: 'Villa',
    characteristics: {
      typicalRoofSize: 150,
      averagePowerConsumption: 300,
      installationComplexity: 'high'
    },
    solarFactors: {
      humidityImpact: 0.9,
      sunlightOptimization: 1.4,
      installationTimeMultiplier: 1.3
    }
  },
  {
    propertyType: 'Apartment',
    characteristics: {
      typicalRoofSize: 30,
      averagePowerConsumption: 80,
      installationComplexity: 'low'
    },
    solarFactors: {
      humidityImpact: 1.1,
      sunlightOptimization: 0.8,
      installationTimeMultiplier: 0.7
    }
  },
  {
    propertyType: 'Business',
    characteristics: {
      typicalRoofSize: 200,
      averagePowerConsumption: 500,
      installationComplexity: 'high'
    },
    solarFactors: {
      humidityImpact: 0.8,
      sunlightOptimization: 1.5,
      installationTimeMultiplier: 1.5
    }
  }
];

const samplePricingRules = [
  {
    ruleType: 'base_calculation',
    conditions: {
      electricBillRange: {
        min: 0,
        max: 1000
      }
    },
    calculations: {
      costFormula: 'electricBill * 120',
      savingsFormula: 'electricBill * 12 * 0.8',
      paybackFormula: 'estimatedCost / annualSavings',
      installationTimeFormula: '30'
    },
    isActive: true,
    validFrom: new Date('2024-01-01'),
    validUntil: new Date('2025-12-31')
  },
  {
    ruleType: 'property_modifier',
    conditions: {
      propertyType: 'Villa'
    },
    calculations: {
      costFormula: 'baseCost * 1.2',
      savingsFormula: 'baseSavings * 1.3',
      installationTimeFormula: 'baseTime * 1.3'
    },
    isActive: true,
    validFrom: new Date('2024-01-01')
  },
  {
    ruleType: 'system_modifier',
    conditions: {
      systemType: 'hybrid'
    },
    calculations: {
      costFormula: 'baseCost * 1.4',
      savingsFormula: 'baseSavings * 1.2',
      installationTimeFormula: 'baseTime * 1.2'
    },
    isActive: true,
    validFrom: new Date('2024-01-01')
  }
];

module.exports = {
  sampleSystemTypes,
  samplePropertyTypes,
  samplePricingRules
};