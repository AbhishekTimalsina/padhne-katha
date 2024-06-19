const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const homeRoutes = require("./routes/home");
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const PORT = process.env.PORT || 3000;

const mongoURI = process.env.MONGODB_URI;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "I love you 3000",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: mongoURI,
    }),
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isLogged = req.session.isLogged;
  res.locals.userId = req.session.userId;
  next();
});

app.use(homeRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use("/blog", blogRoutes);

app.get("*", (req, res) => {
  res.render("404", {
    pageTitle: "404 page not found",
  });
});

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Db connected");
    app.listen(PORT, () => {
      console.log("Server started: Listening at http://localhost:" + PORT);
    });
  })
  .catch((err) => {
    console.log("Error caught");
    console.log(err);
  });
