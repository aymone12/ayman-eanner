// Simple server health check
import fetch from 'node-fetch';

async function checkServer() {
  try {
    console.log('🔍 Checking if server is running...');
    
    // Wait a moment for server to start
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if server is responding
    const response = await fetch('http://localhost:5000/api/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`📡 Server response status: ${response.status}`);
    
    if (response.status === 401) {
      console.log('✅ Server is running! (Got expected 401 Unauthorized for unauthenticated request)');
    } else if (response.status === 200) {
      console.log('✅ Server is running and user is authenticated!');
    } else {
      console.log('⚠️ Server responded but with unexpected status:', response.status);
    }
    
    // Test signup endpoint
    const testSignup = {
      email: 'healthcheck@eaneer.com',
      firstName: 'Health',
      password: 'check123456',
      confirmPassword: 'check123456'
    };
    
    console.log('🧪 Testing signup endpoint...');
    const signupResponse = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testSignup)
    });
    
    const signupResult = await signupResponse.text();
    console.log(`📝 Signup test status: ${signupResponse.status}`);
    
    if (signupResponse.status === 200) {
      console.log('✅ Signup endpoint working!');
    } else if (signupResponse.status === 400) {
      console.log('ℹ️ Signup endpoint working (user might already exist)');
    } else {
      console.log('⚠️ Signup endpoint issue:', signupResult);
    }
    
    console.log('🌟 Server health check completed!');
    
  } catch (error) {
    console.error('❌ Server health check failed:', error.message);
    console.log('Make sure the server is running with: npm run dev');
  }
}

checkServer();
