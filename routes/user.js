const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/user");

// 📌 SIGNUP (form + submit)
router.route("/signup")
  .get(userController.renderSignupForm)   // Show signup page
  .post(userController.signup);           // Handle signup

// 📌 LOGIN (form + submit)
router.route("/login")
  .get(userController.renderLoginForm)    // Show login form
  .post(
    passport.authenticate("local", {
      failureRedirect: "/users/login",
      failureFlash: true,
    }),
    userController.login
  );                                      // Handle login

// 📌 LOGOUT
router.get("/logout", userController.logout);

module.exports = router;
