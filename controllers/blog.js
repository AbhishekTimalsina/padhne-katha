const Blog = require("../models/Blog.js");
const showdown = require("showdown");
const converter = new showdown.Converter();

exports.getBlog = (req, res) => {
  let { id } = req.params;
  Blog.findById(id)
    .populate("author", "username _id")
    .then((blogData) => {
      if (!blogData) {
        res.render("404.ejs", {
          pageTitle: "404 Error",
        });
      }
      let isAuthor = req.session.userId === blogData.author._id.toString();

      res.render("blog/blog", {
        pageTitle: blogData.title,
        blogData,
        isAuthor,
        blogDescription: converter.makeHtml(blogData.description),
      });
    })
    .catch((error) => {
      console.log(error);
      res.render("500.ejs", {
        pageTitle: "500 error",
      });
    });
};

exports.getAddBlog = (req, res) => {
  const error = req.flash("error");
  res.render("blog/add-blog", {
    pageTitle: "Add new Words",
    error,
  });
};

exports.postNewBlog = (req, res) => {
  let { title, description } = req.body;
  if (!title || !description) {
    req.flash("error", "Field can't be left empty");
    return res.redirect("/blog/new");
  }

  let newBlog = new Blog({
    title: title,
    description: description,
    Date: Date.now(),
    author: req.session.userId,
  });
  newBlog
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
      res.render("/500");
    });
};

exports.deleteBlog = (req, res) => {
  let { id } = req.params;
  let { userId } = req.session;

  Blog.deleteOne({ _id: id, author: userId })
    .then((blog) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
};

exports.getEditBlog = (req, res) => {
  let { id } = req.params;
  const error = req.flash("error");
  console.log(error);

  Blog.findById(id)
    .then((blogData) => {
      if (!blogData.author.equals(req.session?.userId)) {
        return res.redirect("/blog/" + id);
      }

      res.render("blog/edit-blog", {
        pageTitle: "Update new Words",
        blogData,
        error,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("/500");
    });
};

exports.updateEditBlog = (req, res) => {
  let updateData = req.body;
  let { id } = req.params;
  Blog.findOneAndUpdate(
    { _id: id, author: req.session.userId },
    {
      title: updateData.title,
      description: updateData.description,
      Date: Date.now(),
    }
  )
    .then(() => {
      res.redirect("/blog/" + id);
    })
    .catch((error) => {
      console.log(error);
      res.render("500.ejs", {
        pageTitle: "500 error",
      });
    });
};
