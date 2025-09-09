import mongoose from 'mongoose';

// MongoDB connection string - use environment variable or fallback to local for development
const MONGODB_URI = process.env.MONGODB_URI || 
  (process.env.NODE_ENV === 'production' 
    ? 'mongodb+srv://cluster0.mongodb.net/eaneer_db' // Placeholder - set MONGODB_URI in Vercel
    : 'mongodb://localhost:27017/eaneer_db');

// Connection options
const mongooseOptions = {
  // Remove deprecated options that are now defaults
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

// Connect to MongoDB
export const connectToMongoDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      console.log('Connecting to MongoDB...');
      console.log('Using MongoDB URI:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@')); // Log URI without password
      await mongoose.connect(MONGODB_URI, mongooseOptions);
      console.log('Successfully connected to MongoDB');
    } else {
      console.log('Already connected to MongoDB');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    console.error('MongoDB URI format:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@'));
    throw error; // Don't exit in serverless environment
  }
};

// Disconnect from MongoDB
export const disconnectFromMongoDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};

// MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await disconnectFromMongoDB();
  process.exit(0);
});

export default mongoose;
