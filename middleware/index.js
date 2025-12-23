const Listing = require("../models/listing");
const Review = require("../models/review");

// CHECK LOGIN
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in first!");
        return res.redirect("/users/login");
    }
    next();
};

// CHECK LISTING OWNER
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    // ⭐ SAFE CHECK (best practice)
    if (!listing.owner || !listing.owner.equals(req.user._id)) {
        req.flash("error", "You are not authorized to edit/delete this listing!");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

// CHECK REVIEW OWNER
module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
        req.flash("error", "Review not found!");
        return res.redirect("back");
    }

    // ⭐ SAFE CHECK
    if (!review.author || !review.author.equals(req.user._id)) {
        req.flash("error", "You are not authorized to delete this review!");
        return res.redirect("back");
    }

    next();
};
