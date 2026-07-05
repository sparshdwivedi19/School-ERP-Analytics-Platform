const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User.model');

dotenv.config();

async function test() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const user = await User.findOne({ email: 'teacher@suncity.com' }).select('+password');
  console.log('Teacher record:', user);
  
  const student = await User.findOne({ email: 'student@suncity.com' }).select('+password');
  console.log('Student record:', student);
  
  process.exit(0);
}

test();
