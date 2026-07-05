const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./src/models/User.model');

dotenv.config();

async function test() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const users = await User.find({}).select('+password');
  console.log(`Found ${users.length} users`);
  
  for (const user of users) {
    console.log(`\nEmail: ${user.email} | Role: ${user.role}`);
    console.log(`Password Hash: ${user.password}`);
    
    const test1 = await bcrypt.compare('AdminPassword123!', user.password);
    const test2 = await bcrypt.compare('Password123!', user.password);
    
    console.log(`Matches 'AdminPassword123!': ${test1}`);
    console.log(`Matches 'Password123!': ${test2}`);
  }
  
  process.exit(0);
}

test();
