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
  res.send("Welcome to Altec Product API");
});

const productLevelRoute = require("./routes/productHierarchyLevelRoutes");
const productLevelValueRoute = require("./routes/productHierarchyLevelValueRoutes");
const uomRoute = require("./routes/uomRoutes");
const productRoute = require("./routes/productRoutes");
const pricingRoute = require("./routes/productPricingRoutes");

app.use("/api/product/hierarchy/level", productLevelRoute);
app.use("/api/product/hierarchy/level/value", productLevelValueRoute);
app.use("/api/uom", uomRoute);
app.use("/api/product", productRoute);
app.use("/api/product/pricing", pricingRoute);

app.use(errorMiddleware);

module.exports = app;
