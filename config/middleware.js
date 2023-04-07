const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
var config = require("./database");

const checkToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  }
  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.redirect("/login");
  }
};
module.exports = checkToken;
