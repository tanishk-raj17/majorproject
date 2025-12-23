// controllers/review.js

const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  const review = new Review({
    rating: req.body.review.rating,
    comment: req.body.review.comment,
    author: req.user._id
  });

  listing.reviews.push(review._id);

  await review.save();
  await listing.save();

  req.flash("success", "Review Added!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;

  await Review.findByIdAndDelete(reviewId);

  await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId }
  });

  req.flash("success", "Review Deleted!");
  res.redirect(`/listing/${id}`);
};
