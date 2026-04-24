const mongoose = require('mongoose');
const Ride = require('./models/Ride');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const rides = await Ride.find();
  
  // Set all dates to a proper YYYY-MM-DD format for testing
  const today = new Date();
  const dateString = today.toISOString().split('T')[0];
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split('T')[0];
  
  let i = 0;
  for (let ride of rides) {
    ride.date = (i % 2 === 0) ? dateString : tomorrowString;
    await ride.save();
    i++;
  }
  
  console.log('Fixed dates for ' + i + ' rides. Today: ' + dateString + ', Tomorrow: ' + tomorrowString);
  process.exit();
}).catch(console.error);
