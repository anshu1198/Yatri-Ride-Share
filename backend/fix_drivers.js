const mongoose = require('mongoose');
const Ride = require('./models/Ride');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const names = ['Rahul', 'Riya', 'Amit', 'Priya', 'Rohan', 'Sneha'];
  const users = [];
  
  for (let i = 0; i < names.length; i++) {
    let u = await User.findOne({ email: `${names[i].toLowerCase()}@yatri.com` });
    if (!u) {
      u = await User.create({ 
        name: names[i], 
        email: `${names[i].toLowerCase()}@yatri.com`, 
        password: 'password123' 
      });
    }
    users.push(u);
  }
  
  const rides = await Ride.find();
  let i = 0;
  
  for (let ride of rides) {
    ride.driver = users[i % users.length]._id;
    await Ride.updateOne(
      { _id: ride._id }, 
      { $set: { driver: ride.driver } }
    );
    i++;
  }
  
  console.log('Fixed ' + i + ' rides by assigning unique diverse drivers (Rahul, Riya, etc.)');
  process.exit();
}).catch(console.error);
