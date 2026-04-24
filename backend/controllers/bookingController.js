const Booking = require('../models/Booking');
const Ride = require('../models/Ride');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { rideId, seatsBooked } = req.body;
    const passengerId = req.user.id;

    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    if (ride.seats < seatsBooked) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    // Prevent duplicate bookings
    const existingBooking = await Booking.findOne({
      ride: rideId,
      passenger: passengerId,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'You have already booked or requested a seat for this ride.' });
    }

    const totalPrice = (ride.price || 0) * seatsBooked;

    const booking = new Booking({
      ride: rideId,
      passenger: passengerId,
      seatsBooked,
      totalPrice,
      status: 'pending' // changed from confirmed
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve booking
exports.approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
    const ride = await Ride.findById(booking.ride);
    if (ride.driver.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    booking.status = 'confirmed';
    await booking.save();

    ride.seats -= booking.seatsBooked;
    if (ride.seats === 0) ride.status = 'booked';
    ride.passengers.push(booking.passenger);
    await ride.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject booking
exports.rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
    const ride = await Ride.findById(booking.ride);
    if (ride.driver.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bookings for a user (as passenger)
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ passenger: req.user.id })
      .populate('ride')
      .populate({
        path: 'ride',
        populate: { path: 'driver', select: 'name email' }
      })
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all booking requests for a driver's offered rides
exports.getDriverBookings = async (req, res) => {
  try {
    const rides = await Ride.find({ driver: req.user.id }).select('_id');
    const rideIds = rides.map(r => r._id);
    const bookings = await Booking.find({ ride: { $in: rideIds } })
      .populate('ride')
      .populate('passenger', 'name email')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bookings for a ride (as driver)
exports.getRideBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ ride: req.params.rideId })
      .populate('passenger', 'name email');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is the one who booked or the driver
    const ride = await Ride.findById(booking.ride);
    if (booking.passenger.toString() !== req.user.id && ride.driver.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Restore seats in ride
    ride.seats += booking.seatsBooked;
    ride.status = 'available';
    // Remove passenger from ride
    ride.passengers = ride.passengers.filter(p => p.toString() !== booking.passenger.toString());
    await ride.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
