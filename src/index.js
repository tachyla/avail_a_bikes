const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || "8000";
 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render('home');
});

app.get("/search", (req, res) => {
  res.render("search");
});

app.get("/allNetwords", (req, res) => {
  res.render("allNetworks");
});

app.listen(port, () => console.log(
  `Your app is listening on port ${port}`));
