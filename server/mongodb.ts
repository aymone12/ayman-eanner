import mongoose from 'mongoose';

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eaneer_db';

// Connection options
const mongooseOptions = {
  // Remove deprecated options that are now defaults
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

// Connect to MongoDB
export const connectToMongoDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 0) {
      console.log('Connecting to MongoDB...');
      await mongoose.connect(MONGODB_URI, mongooseOptions);
      console.log('Successfully connected to MongoDB');
    } else {
      console.log('Already connected to MongoDB');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
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
