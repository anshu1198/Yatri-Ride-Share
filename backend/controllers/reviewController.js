const Review = require('../models/Review');
const Ride = require('../models/Ride');

// Create a review
exports.createReview = async (req, res) => {
  try {
    const { rideId, revieweeId, rating, comment } = req.body;
    const reviewerId = req.user.id;

    // Check if ride exists and is completed (optional but good)
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    const review = new Review({
      ride: rideId,
      reviewer: reviewerId,
      reviewee: revieweeId,
      rating,
      comment
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reviews for a user
exports.getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewee: req.params.userId })
      .populate('reviewer', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
