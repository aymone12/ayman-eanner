// Simple MongoDB connection test
import { MongoClient } from 'mongodb';

async function testConnection() {
  const url = 'mongodb://localhost:27017/';
  const client = new MongoClient(url);

  try {
    console.log('Attempting to connect to MongoDB...');
    await client.connect();
    console.log('✅ Successfully connected to MongoDB!');
    
    // List databases
    const dbs = await client.db().admin().listDatabases();
    console.log('📋 Available databases:');
    dbs.databases.forEach(db => console.log(`  - ${db.name}`));
    
    // Test creating a document in our app database
    const db = client.db('eaneer_db');
    const testCollection = db.collection('test');
    
    // Insert a test document
    const result = await testCollection.insertOne({
      test: true,
      message: 'MongoDB is working!',
      createdAt: new Date()
    });
    
    console.log('✅ Test document inserted with ID:', result.insertedId);
    
    // Clean up test document
    await testCollection.deleteOne({ _id: result.insertedId });
    console.log('🧹 Test document cleaned up');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('\n🔧 To fix this:');
    console.log('1. Install MongoDB: https://www.mongodb.com/try/download/community');
    console.log('2. Install mongosh: https://www.mongodb.com/try/download/shell');
    console.log('3. Start MongoDB service');
    console.log('4. Make sure it\'s running on localhost:27017');
  } finally {
    await client.close();
  }
}

testConnection();
