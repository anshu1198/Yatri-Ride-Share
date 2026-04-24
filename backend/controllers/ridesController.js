const Ride = require('../models/Ride');

// Get all rides
const getRides = async (req, res) => {
  try {
    const rides = await Ride.find()
      .populate('driver', 'name email')
      .populate('passengers', 'name email')
      .sort({ createdAt: -1 });
    res.json(rides);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single ride
const getRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id)
      .populate('driver', 'name email')
      .populate('passengers', 'name email');
    
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    
    res.json(ride);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Ride not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Create ride
const createRide = async (req, res) => {
  try {
    const { pickupLocation, dropoffLocation, date, time, seats, price, description, vehicleModel, vehicleColor } = req.body;

    const ride = new Ride({
      driver: req.user.id,
      pickupLocation,
      dropoffLocation,
      date,
      time,
      seats,
      price,
      description,
      vehicleInfo: {
        model: vehicleModel,
        color: vehicleColor
      }
    });

    await ride.save();
    await ride.populate('driver', 'name email');
    
    res.json(ride);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update ride
const updateRide = async (req, res) => {
  try {
    let ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    // Check if user is the driver
    if (ride.driver.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { pickupLocation, dropoffLocation, date, time, seats, price, description, status, vehicleModel, vehicleColor } = req.body;

    const updateFields = {};
    if (pickupLocation) updateFields.pickupLocation = pickupLocation;
    if (dropoffLocation) updateFields.dropoffLocation = dropoffLocation;
    if (date) updateFields.date = date;
    if (time) updateFields.time = time;
    if (seats) updateFields.seats = seats;
    if (price) updateFields.price = price;
    if (description !== undefined) updateFields.description = description;
    if (status) updateFields.status = status;
    
    if (vehicleModel || vehicleColor) {
      updateFields.vehicleInfo = {
        model: vehicleModel || ride.vehicleInfo.model,
        color: vehicleColor || ride.vehicleInfo.color
      };
    }

    ride = await Ride.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    ).populate('driver', 'name email').populate('passengers', 'name email');

    res.json(ride);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete ride
const deleteRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    // Check if user is the driver
    if (ride.driver.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Ride.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ride removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Book ride
const bookRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    // Check if user is already a passenger
    if (ride.passengers.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already booked this ride' });
    }

    // Check if user is the driver
    if (ride.driver.toString() === req.user.id) {
      return res.status(400).json({ message: 'Cannot book your own ride' });
    }

    // Check if ride is available
    if (ride.status !== 'available') {
      return res.status(400).json({ message: 'Ride is not available' });
    }

    // Check if seats are available
    if (ride.passengers.length >= ride.seats) {
      return res.status(400).json({ message: 'No seats available' });
    }

    ride.passengers.push(req.user.id);
    await ride.save();
    await ride.populate('driver', 'name email');
    await ride.populate('passengers', 'name email');

    res.json(ride);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getRides,
  getRide,
  createRide,
  updateRide,
  deleteRide,
  bookRide
};
