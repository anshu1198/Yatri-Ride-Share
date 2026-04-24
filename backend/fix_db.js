const mongoose = require('mongoose');
const Ride = require('./models/Ride');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  let user = await User.findOne();
  if (!user) {
    user = await User.create({ name: 'System Driver', email: 'driver@yatri.com', password: 'password123' });
  }
  
  const rides = await Ride.find();
  const times = ['08:00 AM', '10:30 AM', '01:15 PM', '04:45 PM', '07:20 PM', '09:00 PM'];
  let i = 0;
  
  for (let ride of rides) {
    if (!ride.driver) {
      ride.driver = user._id;
    }
    ride.time = times[i % times.length];
    
    await Ride.updateOne(
      { _id: ride._id }, 
      { $set: { driver: ride.driver, time: ride.time } }
    );
    i++;
  }
  
  console.log('Fixed ' + i + ' rides by adding drivers and randomizing times');
  process.exit();
}).catch(console.error);
