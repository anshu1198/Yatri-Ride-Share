const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

router.post('/', auth, bookingController.createBooking);
router.get('/user', auth, bookingController.getUserBookings);
router.get('/driver-requests', auth, bookingController.getDriverBookings);
router.get('/ride/:rideId', auth, bookingController.getRideBookings);
router.put('/:id/cancel', auth, bookingController.cancelBooking);
router.put('/:id/approve', auth, bookingController.approveBooking);
router.put('/:id/reject', auth, bookingController.rejectBooking);

module.exports = router;
