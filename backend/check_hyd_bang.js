const mongoose = require('mongoose');
const Ride = require('./models/Ride');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const r = await Ride.findOne({ pickupLocation: /Hyderabad/i, dropoffLocation: /Bangalore/i });
  console.log(r);
  process.exit();
}).catch(console.error);
