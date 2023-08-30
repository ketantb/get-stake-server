const router = require("express").Router();
const moment = require("moment");

const Shop = require("../models/shopModel");
// const userMiddleware = require("../midleware/userMiddlware");

//ADD NEW PRODUCT
// router.post("/shop-form", userMiddleware, async (req, resp) => {
router.post("/post-form", async (req, resp) => {
    console.log("token is from post form", req.sellerId);
    console.log(req.body);
    const date = moment().format("DD/MM/YYYY");
    try {
        //images
        const shopData = await Shop.create({
            ...req.body,
            postedOn: date,
            sellerId: req.sellerId,
        });
        // image: req.files.map(file => file.filename)
        console.log(shopData);
        resp.json({
            success: true,
            message: "Data created successfully",
            shop: shopData,
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
        let allshopsList = await Shop.find();
        if (allshopsList) {
            resp.json({ success: true, list: allshopsList });
        } else {
            resp.json({ success: false, message: "no data found" });
        }
    } catch (err) {
        console.log("err in listing-all-product server", err);
    }
});

module.exports = router;