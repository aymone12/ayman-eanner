const mongoose = require('mongoose');

class DatabaseConnection {
  constructor() {
    this.connection = null;
    this.isConnected = false;
  }

  async connect(mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/solar-calculator') {
    try {
      if (this.isConnected) {
        console.log('Database already connected');
        return this.connection;
      }

      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      };

      console.log('Connecting to MongoDB...');
      this.connection = await mongoose.connect(mongoUri, options);
      this.isConnected = true;

      console.log('MongoDB connected successfully');

      // Handle connection events
      mongoose.connection.on('error', (error) => {
        console.error('MongoDB connection error:', error);
        this.isConnected = false;
      });

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
        this.isConnected = false;
      });

      return this.connection;
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      this.isConnected = false;
      throw error;
    }
  }

  async disconnect() {
    try {
      if (this.connection) {
        await mongoose.disconnect();
        this.isConnected = false;
        console.log('MongoDB disconnected successfully');
      }
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
      throw error;
    }
  }

  getConnection() {
    return this.connection;
  }

  isConnectionActive() {
    return this.isConnected && mongoose.connection.readyState === 1;
  }
}

// Create and export a singleton instance
const dbConnection = new DatabaseConnection();

module.exports = dbConnection;