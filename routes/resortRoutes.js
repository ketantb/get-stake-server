const router = require("express").Router();
const moment = require("moment");

const Resort = require("../models/resortModel");
// const userMiddleware = require("../midleware/userMiddlware");

//ADD NEW PRODUCT
// router.post("/resort-form", userMiddleware, async (req, resp) => {
router.post("/post-form", async (req, resp) => {
    console.log("token is from post form", req.body.sellerId);
    console.log(req.body);
    const date = moment().format("DD/MM/YYYY");
    try {
        //images
        const resortdata = await Resort({
            ...req.body,
            postedOn: date,
            sellerId: req.sellerId,
        });
        // image: req.files.map(file => file.filename)
        const newresort = await resortdata.save();
        resp.json({
            success: true,
            message: "Data created successfully",
            resort: newresort,
        });
    } catch (err) {
        resp.json({
            message: err.message,
        });
    }
});

//To fetch all ings no login required(for customer purpose)
router.get("/get-all", async (req, resp) => {
    try {
        let allresorts = await Resort.find({});
        if (allresorts) {
            const verifiedPropertyList = allresorts
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
        console.log("err in ing-all-product server", err);
    }
});

//get resort by id
router.get("/resort/:id", async (req, resp) => {
    try {
        const resort = await Resort.find({ _id: req.params.id });

        if (resort) {
            console.log("specific resort details", resort);
            resp.json({ success: true, resort: resort });
        } else {
            resp.json({ success: false, message: "NO DATA FOUND" });
        }
    } catch (err) {
        console.log(err);
        resp.json({ success: false, message: err });
    }
});

module.exports = router;