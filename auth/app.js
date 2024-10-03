const express = require("express");
const cors = require("cors");
const app = express();
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "config/config.env") });
global.__basedir = __dirname + "/";
var multipart = require("connect-multiparty");
const constants = require("./config/constants");
app.use(cors({ credentials: true, origin: `${constants.FRONTEND_URL}` }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(multipart());
const router = express.Router();

//route
app.get("/", (req, res) => {
  res.send("Welcome to Altec Auth API");
});

const auth = require("./routes/auth");
app.use("/api/auth/", auth);
app.use(errorMiddleware);
module.exports = app;
