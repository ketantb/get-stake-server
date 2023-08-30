const router = require("express").Router();
const moment = require("moment");

const Farmhouse = require("../models/farmhouseModel");
// const userMiddleware = require("../midleware/userMiddlware");

//ADD NEW PRODUCT
// router.post("/farmhouse-form", userMiddleware, async (req, resp) => {
router.post("/post-form", async (req, resp) => {
    console.log("token is from post form", req.sellerId);
    console.log(req.body);
    const date = moment().format("DD/MM/YYYY");
    try {
        //images
        const newFarmhouse = await Farmhouse.create({
            ...req.body,
            postedOn: date,
            sellerId: req.sellerId,
        });
        // image: req.files.map(file => file.filename)
        console.log(newFarmhouse);
        resp.json({
            success: true,
            message: "Data created successfully",
            Farmhouse: newFarmhouse,
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
        let allFarmhouseList = await Farmhouse.find();
        if (allFarmhouseList) {
            const verifiedPropertyList = allFarmhouseList
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