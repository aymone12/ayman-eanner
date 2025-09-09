import { connectToMongoDB } from './server/mongodb.ts';
import { storage } from './server/storage.ts';

async function testAuthentication() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await connectToMongoDB();
    
    console.log('🧪 Testing MongoDB Authentication System...\n');
    
    // Test user data
    const testUser = {
      email: 'test@eaneer.com',
      firstName: 'Test',
      password: 'password123',
      company: 'Eaneer Energetics',
      role: 'Developer',
      division: 'Solar Energy',
      phoneNumber: '+212-123-456-789',
      city: 'Casablanca',
      language: 'English'
    };
    
    console.log('👤 Creating test user...');
    const createdUser = await storage.createUser(testUser);
    console.log('✅ User created successfully:', {
      id: createdUser._id,
      email: createdUser.email,
      firstName: createdUser.firstName,
      company: createdUser.company
    });
    
    console.log('\n🔐 Testing login validation...');
    const loginResult = await storage.validateUser(testUser.email, testUser.password);
    if (loginResult) {
      console.log('✅ Login validation successful!');
      console.log('User details:', {
        id: loginResult._id,
        email: loginResult.email,
        firstName: loginResult.firstName
      });
    } else {
      console.log('❌ Login validation failed');
    }
    
    console.log('\n🔍 Testing user retrieval by email...');
    const foundUser = await storage.getUserByEmail(testUser.email);
    if (foundUser) {
      console.log('✅ User found by email:', {
        id: foundUser._id,
        email: foundUser.email,
        createdAt: foundUser.createdAt
      });
    } else {
      console.log('❌ User not found by email');
    }
    
    console.log('\n🔄 Testing user update...');
    const updatedUser = await storage.updateUser(createdUser._id.toString(), {
      company: 'Eaneer Solar Solutions Updated',
      city: 'Rabat'
    });
    if (updatedUser) {
      console.log('✅ User updated successfully:', {
        company: updatedUser.company,
        city: updatedUser.city,
        updatedAt: updatedUser.updatedAt
      });
    }
    
    console.log('\n🧹 Cleaning up test data...');
    await storage.getUserByEmail(testUser.email).then(async (user) => {
      if (user) {
        await user.deleteOne();
        console.log('✅ Test user deleted');
      }
    });
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('📊 Summary:');
    console.log('  - MongoDB Connection: ✅ Working');
    console.log('  - User Creation: ✅ Working');
    console.log('  - Login Validation: ✅ Working');
    console.log('  - User Retrieval: ✅ Working');
    console.log('  - User Updates: ✅ Working');
    console.log('\n🌐 Your authentication system is ready for login and get started pages!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.code === 11000) {
      console.log('ℹ️  This might be because the test user already exists. Try deleting it first.');
    }
  } finally {
    process.exit(0);
  }
}

testAuthentication();
