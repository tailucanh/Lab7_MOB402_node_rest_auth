var config = require("../config/database");
var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Book = require("../models/book");
const bodyParser = require("body-parser");

const parser = bodyParser.urlencoded({ extended: true });
router.use(parser);

router.get("/", async (req, res) => {
  res.render("signup", { title: "Đăng kí" });
});

router.post("/", async function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: "Please pass username and password." });
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    // save the user
    await newUser.save();
    console.log(newUser);
    res.redirect("/login");
  }
});

module.exports = router;
