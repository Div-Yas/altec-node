const express = require("express");
const app = express();
const cors = require("cors");
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
  res.send("Welcome to Altec Configuration API");
});

const masterRoutes = require("./routes/masterRoutes");
const geographyValueRoutes = require("./routes/geographyHierarchyLevelValueRoutes");
const geographyRoutes = require("./routes/geographyHierarchyLevelRoutes");
const salesRoutes = require("./routes/salesHierarchyLevelRoutes");
const salesValueRoutes = require("./routes/salesHierarchyLevelValueRoutes");
const groupChannelRoutes = require("./routes/groupChannelRoutes");
const jcCalendarRoutes = require("./routes/jcCalendarRoutes");
const targetUploadRoutes = require("./routes/targetUploadsRoutes");

app.use("/api/mastersroute", masterRoutes);
app.use("/api/geography/hierarchy/level", geographyRoutes);
app.use("/api/geography/hierarchy/level/value", geographyValueRoutes);
app.use("/api/sales/hierarchy/level", salesRoutes);
app.use("/api/sales/hierarchy/level/value", salesValueRoutes);
app.use("/api/group/channel", groupChannelRoutes);
app.use("/api/jc/calendar", jcCalendarRoutes);
app.use("/api/target", targetUploadRoutes);

app.use(errorMiddleware);

module.exports = app;
