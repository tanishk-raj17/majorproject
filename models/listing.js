const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: String,

  image: {
    url: { type: String,},
    filename: { type: String,}
  },

  price: { type: Number, required: true },   // ⭐ FIXED (Number type)
  location: String,
  country: String,

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ]
});

// ⭐ DELETE ALL REVIEWS WHEN LISTING DELETED
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

module.exports = mongoose.model("Listing", listingSchema);
