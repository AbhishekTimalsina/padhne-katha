const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res) => {
  const error = req.flash("error");

  res.render("auth/login", {
    pageTitle: "Login ",
    error,
  });
};

exports.getSignup = (req, res) => {
  const error = req.flash("error");

  res.render("auth/signup", {
    pageTitle: "signup ",
    error,
  });
};

exports.postLogin = (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    req.flash("error", "Fields can't be left empty");
    return res.redirect("/login");
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        req.flash("error", "User doesn't exist");
        return res.redirect("/login");
      }
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          req.flash("error", "Incorrect password");
          return res.redirect("/login");
        }
        req.session.isLogged = true;
        req.session.username = user.username;
        req.session.userId = user._id;
        req.session.save(() => {
          res.redirect("/");
        });
      });
    })
    .catch((error) => {
      console.log(error);
      res.render("500.ejs", {
        pageTitle: "500 error",
      });
    });
};

exports.postSignup = (req, res) => {
  let { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    req.flash("error", "User doesn't exist");
    return res.redirect("/signup");
  }

  if (!(password === confirmPassword)) {
    req.flash("error", "Password and confirm password should be same");
    return res.redirect("/signup");
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPass) => {
      let newUser = new User({
        email,
        username,
        password: hashedPass,
        Date: Date.now(),
      });
      return newUser.save();
    })
    .then(() => {
      res.redirect("/login");
    })
    .catch((error) => {
      console.log(error);
      res.render("500.ejs", {
        pageTitle: "500 error",
      });
    });
};

exports.getLogout = (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};
