# Solar Energy Calculator Database

This folder contains the MongoDB database implementation for the solar energy calculator application.

## Structure

```
database/
├── config/
│   └── connection.js          # Database connection configuration
├── models/
│   ├── index.js              # Export all models
│   ├── Quote.js              # Quote/calculation data model
│   ├── SystemType.js         # Solar system types model
│   ├── PropertyType.js       # Property characteristics model
│   ├── PricingRule.js        # Dynamic pricing rules model
│   └── InstallationSchedule.js # Installation scheduling model
├── utils/
│   ├── index.js              # Export all utilities
│   ├── quoteOperations.js    # Quote CRUD operations
│   └── systemOperations.js   # System and property operations
├── seed/
│   ├── sampleData.js         # Sample data for seeding
│   └── seedDatabase.js       # Database seeding script
└── README.md                 # This file
```

## Models

### 1. Quote Model
Stores customer quote requests and calculations including:
- Personal information (name, phone, address)
- System configuration (grid type, installation type, electric bill)
- Property information (type, humidity, sunlight exposure)
- Energy storage options
- Simulation results (cost, savings, payback period)

### 2. SystemType Model
Reference data for different solar system configurations:
- Grid types (three_phase, single_phase)
- Installation types (ongrid, offgrid, hybrid)
- Technical specifications and pricing
- Suitability criteria

### 3. PropertyType Model
Property characteristics affecting solar installations:
- Typical roof size and power consumption
- Installation complexity
- Solar efficiency factors

### 4. PricingRule Model
Dynamic pricing calculation rules:
- Base calculations
- Property and system modifiers
- Regional adjustments
- Time-based validity

### 5. InstallationSchedule Model
Installation appointment scheduling:
- Quote references
- Team assignments
- Status tracking
- Completion details

## API Endpoints

### Quotes
- `POST /api/quotes` - Create new quote
- `GET /api/quotes` - Get quotes with filters
- `GET /api/quotes/:id` - Get specific quote
- `PUT /api/quotes/:id` - Update quote
- `PATCH /api/quotes/:id/status` - Update quote status
- `DELETE /api/quotes/:id` - Delete quote
- `GET /api/quotes/stats/overview` - Get statistics
- `POST /api/quotes/calculate` - Calculate with advanced pricing

### Systems
- `GET /api/systems/recommendations` - Get system recommendations
- `GET /api/systems/types` - Get all system types
- `POST /api/systems/types` - Create system type
- `PUT /api/systems/types/:id` - Update system type
- `GET /api/systems/property-types` - Get all property types
- `GET /api/systems/property-types/:type` - Get property type details
- `POST /api/systems/property-types` - Create property type
- `GET /api/systems/pricing-rules` - Get applicable pricing rules

## Environment Variables

Set the following environment variable for database connection:
```
MONGODB_URI=mongodb://localhost:27017/solar-calculator
```

If not set, defaults to local MongoDB instance.

## Usage

### Seeding the Database
To populate the database with sample data:
```bash
node server/database/seed/seedDatabase.js
```

### Using in Code
```javascript
// Import models
const { Quote, SystemType, PropertyType } = require('./database/models');

// Import utilities
const { QuoteOperations, SystemOperations } = require('./database/utils');

// Example: Create a new quote
const result = await QuoteOperations.createQuote({
  personalInfo: {
    fullName: "John Doe",
    phoneNumber: "123456789",
    homeAddress: "123 Main St"
  },
  systemConfig: {
    gridType: "three_phase",
    installationType: "ongrid",
    electricBill: 1200
  }
});
```

## Features

- Automatic calculation of simulation results
- Advanced pricing with modifiers
- Comprehensive filtering and search
- Statistics and analytics
- Type-safe operations with validation
- Optimized database indexes
- Sample data for testing