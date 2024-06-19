const User = require("../models/User");
const Blog = require("../models/Blog");

exports.getUserProfile = (req, res) => {
  let { id } = req.params;

  User.findById(id, "username Date")
    .then((userData) => {
      if (!userData) {
        res.render("404.ejs", {
          pageTitle: "404 Error",
        });
      }
      Blog.find({ author: id })
        .sort({ Date: -1 })
        .then((blogData) => {
          res.render("user/userProfile", {
            pageTitle: userData.username,
            userData,
            blogData,
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
