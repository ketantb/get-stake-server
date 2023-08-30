const mongoose = require("mongoose");

const siteVisitSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  contact: { type: Number },
  date: { type: String },
  time: { type: String },
  siteVisitStatus: { type: String, default: "pending" },
  propertyType: { type: String },
  address: { type: String },
  sellerName: { type: String },
  sellerContact: { type: Number },
});

const SiteVisitModel = mongoose.model("site-visit", siteVisitSchema);
module.exports = SiteVisitModel;