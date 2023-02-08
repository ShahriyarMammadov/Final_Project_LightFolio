const express = require("express");
const app = express();

app.set("view-engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "Shahriyar" });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/login", (req, res) => {});
 
app.post("/register", (req, res) => {
  req.body.email;
});

app.listen(3000);
