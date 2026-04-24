const mongoose = require('mongoose');
const Ride = require('./models/Ride');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const rides = await Ride.find();
  let count = 0;
  for (let r of rides) {
    let changed = false;
    if (r.pickupLocation === 'Banglore') { r.pickupLocation = 'Bangalore'; changed = true; }
    if (r.dropoffLocation === 'Banglore') { r.dropoffLocation = 'Bangalore'; changed = true; }
    if (changed) {
      await r.save();
      count++;
    }
  }
  console.log(`Fixed ${count} rides with Banglore typo`);
  process.exit();
}).catch(console.error);
