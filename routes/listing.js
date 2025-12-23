const express = require("express");
const router = express.Router();
console.log("LISTING ROUTE LOADED");


const { isLoggedIn, isOwner } = require("../middleware");
const listingController = require("../controllers/listing");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

// NEW LISTING FORM
router.get("/new", isLoggedIn, listingController.renderNewForm);

// ALL LISTINGS + CREATE LISTING
router.route("/")
  .get(listingController.index)
  .post(isLoggedIn, upload.single("image"), listingController.createListing);

// SHOW / UPDATE / DELETE
router.route("/:id")
  .get(listingController.showListing)
  .put(isLoggedIn, isOwner, upload.single("image"), listingController.updateListing)
  .delete(isLoggedIn, isOwner, listingController.deleteListing);

// EDIT FORM
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);

module.exports = router;
