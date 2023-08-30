const router = require("express").Router();
const moment = require("moment");
const { nanoid } = import("nanoid");
const Apartment = require("../models/apartmentModel");
// const userMiddleware = require("../midleware/userMiddlware");

//ADD NEW PRODUCT
// router.post("/apartment-form", userMiddleware, async (req, resp) => {
router.post("/post-form", async (req, resp) => {
  console.log(req.sellerId);
  const date = moment().format("DD/MM/YYYY");
  try {
    //images
    const ApartmentData = await Apartment.create({
      ...req.body,
      postedOn: date,
      sellerId: req.sellerId,
    });
    // image: req.files.map(file => file.filename)
    console.log("posted data", ApartmentData);
    resp.json({
      success: true,
      message: "Data created successfully",
      Apartment: ApartmentData,
    });
  } catch (err) {
    resp.json({
      message: err.message,
    });
  }
});

//To fetch all listings no login required(for customer purpose)
router.get("/get-all", async (req, resp) => {
  try {
    let allApartmentsList = await Apartment.find();
    if (allApartmentsList) {
      const verifiedPropertyList = allApartmentsList
        .filter((property) => {
          if (property.isVerified) {
            return property;
          }
        })
        .map((property) => property);
      // console.log(verifiedPropertyList);
      resp.json({ success: true, list: verifiedPropertyList });
    } else {
      resp.json({ success: false, message: "no data found" });
    }
  } catch (err) {
    console.log("err in listing-all-product server", err);
  }
});

module.exports = router;