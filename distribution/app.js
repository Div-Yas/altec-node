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
  res.send("Welcome to Altec Distribution API");
});

const routeRoutes = require("./routes/routeRoutes");
const salesmanRoutes = require("./routes/salesmanRoutes");
const distributorRoutes = require("./routes/distributorRoutes");
const supplierRoutes = require("./routes/supplierRoutes");

app.use("/api/route", routeRoutes);
app.use("/api/salesman", salesmanRoutes);
app.use("/api/distributor", distributorRoutes);
app.use("/api/supplier", supplierRoutes);

app.use(errorMiddleware);

module.exports = app;
