const express = require('express');
const { body, validationResult } = require('express-validator');
const {
  getRides,
  getRide,
  createRide,
  updateRide,
  deleteRide,
  bookRide
} = require('../controllers/ridesController');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/rides
// @desc    Get all rides
// @access  Public
router.get('/', getRides);

// @route   GET /api/rides/:id
// @desc    Get single ride
// @access  Public
router.get('/:id', getRide);

// @route   POST /api/rides
// @desc    Create a ride
// @access  Private
router.post('/', [
  auth,
  body('pickupLocation').notEmpty().withMessage('Pickup location is required'),
  body('dropoffLocation').notEmpty().withMessage('Dropoff location is required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('time').notEmpty().withMessage('Time is required'),
  body('seats').isInt({ min: 1 }).withMessage('Seats must be at least 1'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number')
], createRide);

// @route   PUT /api/rides/:id
// @desc    Update a ride
// @access  Private (Driver only)
router.put('/:id', auth, updateRide);

// @route   DELETE /api/rides/:id
// @desc    Delete a ride
// @access  Private (Driver only)
router.delete('/:id', auth, deleteRide);

// @route   POST /api/rides/:id/book
// @desc    Book a ride
// @access  Private
router.post('/:id/book', auth, bookRide);

module.exports = router;
