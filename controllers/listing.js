// controllers/listing.js

const Listing = require("../models/listing");
const { cloudinary } = require("../cloudinary/index.js");

// ⭐ SHOW ALL LISTINGS
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
};

// ⭐ RENDER NEW LISTING FORM
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

// ⭐ CREATE NEW LISTING (CLEAN & FIXED)
module.exports.createListing = async (req, res) => {
  try {
    const data = req.body.listing || {};

    // ⭐ PRICE VALIDATION
    const priceValue = Number(data.price);
    if (!Number.isFinite(priceValue)) {
      req.flash("error", "Invalid price! Please enter a valid number.");
      return res.redirect("/listings/new");
    }

    // ⭐ NEW LISTING OBJECT
    const listing = new Listing({
      ...data,
      price: priceValue,
      owner: req.user._id,
    });

    // ⭐ CLOUDINARY IMAGE SAVE
    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    } else {
      listing.image = {
        url: "/images/default.jpg",
        filename: "default",
      };
    }

    await listing.save();

    req.flash("success", "Listing Created Successfully!");
    res.redirect(`/listings/${listing._id}`);

  } catch (error) {
    console.log("❌ ERROR WHILE CREATING LISTING:", error);
    req.flash("error", "Something went wrong while creating listing.");
    res.redirect("/listings/new");
  }
};

// ⭐ SHOW ONE LISTING
module.exports.showListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  res.render("listings/show", { listing });
};

// ⭐ RENDER EDIT FORM
module.exports.renderEditForm = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  res.render("listings/edit", { listing });
};

// ⭐ UPDATE LISTING
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const data = req.body.listing;

  const priceValue = Number(data.price);
  if (!Number.isFinite(priceValue)) {
    req.flash("error", "Invalid price! Please enter a valid number.");
    return res.redirect(`/listings/${id}/edit`);
  }

  const listing = await Listing.findByIdAndUpdate(id, {
    ...data,
    price: priceValue,
  });

  // ⭐ UPDATE IMAGE IF NEW FILE UPLOADED
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    await listing.save();
  }

  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listings/${id}`);
};

// ⭐ DELETE LISTING (NO CLOUDINARY DELETE SO NO ERRORS)
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;

  await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
