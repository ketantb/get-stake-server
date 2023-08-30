const mongoose = require("mongoose");

const ParkingSchema = new mongoose.Schema({
  sellerName: { type: String },
  propertyAdType: { type: String },
  landType: { type: String },
  dimensions: { type: String },
  dimensionsUnit: { type: String },
  lotSize: { type: String },
  lotSizeUnit: { type: String },
  zoning: { type: String },
  utilities: [{ type: String }],
  roadAccess: { type: String },
  street: { type: String },
  landmark: { type: String },
  city: { type: String },
  pin: { type: String },
  state: { type: String },
  nearbyPlaces: { type: String },
  rentPrice: { type: Number },
  totalShares: { type: Number },
  availableShares: { type: Number },
  perSharePrice: { type: Number },
  additionalDetails: { type: String },
  imgArr: [{ type: String }],
  productType: { type: String, default: "land" },
  postedOn: String,
  sellerId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("parking_products", ParkingSchema);