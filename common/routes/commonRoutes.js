const express = require("express");
const router = express.Router();
const commonController = require("../controllers/CommonController");

//fetch country List
router.get("/fetch/country", commonController.fetchCountry);

//fetch state List
router.get(
  "/fetch/state/:country_name",
  commonController.fetchStateByCountryCode
);

//ferch district List
router.get(
  "/fetch/district/:state_name",
  commonController.fetchDistrictByStateCode
);

//ferch town List
router.get(
  "/fetch/town/:district_name",
  commonController.fetchTownByDistrictCode
);

//fetch post code List
router.get("/fetch/postcode/:district_name", commonController.fetchPostalCode);

// fetch all city
router.get("/cities/list", commonController.getCityList);

//fetch town by satate
router.get("/fetch/cities/:state_name", commonController.fetchTownByState);

//fetch postal code by town
router.get(
  "/fetch/postalcode/:town_name",
  commonController.fetchPostalCodebyTown
);

// Fetch gst state name by gst state code
router.get(
  "/gststatemaster/fetch/:gst_state_code",
  commonController.getGSTStateName
);

// Fetch Town details by town code
router.get("/town/fetch/:town_code", commonController.getTownByTownCode);

//fetch state list
router.get("/gststate/list", commonController.gstGstStateList);
module.exports = router;
