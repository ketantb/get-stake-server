const router = require("express").Router();
const moment = require("moment");

const Agri = require("../models/agriLandModel");
// const userMiddleware = require("../midleware/userMiddlware");

//ADD NEW PRODUCT

// router.post("/post-form", userMiddleware, async (req, resp) => {
router.post("/agri-land-form", async (req, resp) => {
    console.log("token is from post form", req.sellerId);
    console.log(req.body);
    const date = moment().format("DD/MM/YYYY");
    try {
        const newAgri = await Agri.create({
            ...req.body,
            postedOn: date,
            sellerId: req.sellerId,
        });
        // image: req.files.map(file => file.filename)
        console.log(newAgri);
        resp.json({
            success: true,
            message: "Data created successfully",
            Agri: newAgri,
        });
    } catch (err) {
        resp.json({
            message: err.message,
        });
    }
});

//To fetch all listings no login required(for customer purpose)
router.get("/listing-all-agri-land", async (req, resp) => {
    try {
        let allAgrisList = await Agri.find();
        if (allAgrisList) {
            const verifiedPropertyList = allAgrisList
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