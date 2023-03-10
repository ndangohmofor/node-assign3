const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const users = [];

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.render("add-user", {
    pageTitle: "Add User",
    path: "/",
  });
});

app.post("/", (req, res, next) => {
  users.push({ username: req.body.username });
  res.redirect("/");
});

app.get("/users", (req, res, next) => {
  res.render("users", {
    users: users,
    pageTitle: "Users List",
    path: "/users",
  });
});

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

app.listen(3010);
