var express = require("express");
var app = express();
var mongoose = require("mongoose");
var config = require("./config/database");
var loginRouter = require("./routes/routerLogin");
var signUpRouter = require("./routes/routerSignUp");
var bookRouter = require("./routes/routerBook");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine(
  ".hbs",
  expressHbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: "views/layouts/",
  })
);
app.set("view engine", "hbs");
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/login", loginRouter);
app.use("/signup", signUpRouter);
app.use("/book", bookRouter);

app.use(function (req, res, next) {
  console.log("404 - Khong tim thay trang");
  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
