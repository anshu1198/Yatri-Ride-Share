const mongoose = require('mongoose');
const Ride = require('./models/Ride');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const rides = await Ride.find();
  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'];
  let i = 0;
  for (let ride of rides) {
    ride.pickupLocation = ride.pickupLocation || cities[i % cities.length];
    ride.dropoffLocation = ride.dropoffLocation || cities[(i + 1) % cities.length];
    ride.date = ride.date || ('2026-05-' + (10 + (i % 20)));
    ride.time = ride.time || '10:00 AM';
    ride.price = ride.price || (500 + i * 100);
    ride.seats = ride.seats || (i % 3) + 1;
    if (ride.status === 'active') ride.status = 'available';
    
    await Ride.updateOne(
      { _id: ride._id },
      { $set: { 
          pickupLocation: ride.pickupLocation,
          dropoffLocation: ride.dropoffLocation,
          date: ride.date,
          time: ride.time,
          price: ride.price,
          seats: ride.seats,
          status: ride.status
        } 
      }
    );
    i++;
  }
  console.log('Fixed ' + i + ' rides');
  process.exit();
}).catch(console.error);
