const router = require("express").Router();
const moment = require("moment");

const Land = require("../models/landModel");
// const userMiddleware = require("../midleware/userMiddlware");

//ADD NEW PRODUCT

// router.post("/land-form", userMiddleware, async (req, resp) => {
router.post("/post-form", async (req, resp) => {
    console.log("token is from post form", req.sellerId);
    console.log(req.body);
    const date = moment().format("DD/MM/YYYY");
    try {
        const newLand = await Land.create({
            ...req.body,
            postedOn: date,
            sellerId: req.sellerId,
        });
        // image: req.files.map(file => file.filename)
        console.log(newLand);
        resp.json({
            success: true,
            message: "Data created successfully",
            land: newLand,
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
        let allLandsList = await Land.find();
        if (allLandsList) {
            const verifiedPropertyList = allLandsList
                .filter((property) => {
                    if (property.isVerified) {
                        return property;
                    }
                })
                .map((property) => property);
            resp.json({ success: true, list: verifiedPropertyList });
        } else {
            resp.json({ success: false, message: "no data found" });
        }
    } catch (err) {
        console.log("err in listing-all-product server", err);
    }
});

module.exports = router;