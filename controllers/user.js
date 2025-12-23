const User = require("../models/user");

// SIGNUP FORM
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup");
};

// SIGNUP LOGIC
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);

      req.flash("success", "Welcome to ExploreX!");

      // ✅ IMPORTANT FIX
      const redirectUrl = req.session.redirectUrl || "/listings";
      delete req.session.redirectUrl;

      return res.redirect(redirectUrl);
    });

  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/users/signup");
  }
};

// LOGIN FORM
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

// LOGIN LOGIC
module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");

  const redirectUrl = req.session.redirectUrl || "/listings";
  delete req.session.redirectUrl;

  res.redirect(redirectUrl);
};

// LOGOUT
module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.flash("success", "You have logged out!");
    res.redirect("/listings");
  });
};
