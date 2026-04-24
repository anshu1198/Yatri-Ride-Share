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

    const totalPrice = ride.price * seatsBooked;

    const booking = new Booking({
      ride: rideId,
      passenger: passengerId,
      seatsBooked,
      totalPrice,
      status: 'confirmed'
    });

    await booking.save();

    // Update available seats in ride
    ride.seats -= seatsBooked;
    if (ride.seats === 0) {
      ride.status = 'booked';
    }
    ride.passengers.push(passengerId);
    await ride.save();

    res.status(201).json(booking);
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
      });
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
