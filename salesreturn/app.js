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
const constants = require("./config/constants");
app.use(cors({ credentials: true, origin: `${constants.FRONTEND_URL}` }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to Altec Sales Return API");
});

const salesreurnRoutes = require("./routes/salesreturnRoutes");

app.use("/api/salesreturn", salesreurnRoutes);

app.use(errorMiddleware);

module.exports = app;
