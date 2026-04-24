const mongoose = require('mongoose');
const Ride = require('./models/Ride');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const rides = await Ride.find();
  console.log('Total Rides:', rides.length);
  for (let r of rides) {
    console.log(`ID: ${r._id}, Status: ${r.status}, Pickup: ${r.pickupLocation}, Dropoff: ${r.dropoffLocation}, Seats: ${r.seats}`);
  }
  process.exit();
}).catch(console.error);
