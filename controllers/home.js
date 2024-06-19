const Blog = require("../models/Blog");

exports.getAllBlogs = (req, res) => {
  Blog.find({})
    .sort({ Date: -1 })
    .then((blogData) => {
      res.render("home/home", {
        pageTitle: "PadhneKatha : The Art of Words",
        blogData,
      });
    })
    .catch((error) => {
      console.log("Error getting blogs");
      console.log(error);
    });
};
