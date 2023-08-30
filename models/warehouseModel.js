const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WarehouseSchema = new mongoose.Schema({
  //locality details
  propertyType: { type: String, default: "resort" },
  propertyAdType: { type: String },
  resortName: { type: String },
  street: { type: String },
  landmark: { type: String },
  city: { type: String },
  pin: { type: String },
  state: { type: String },
  nearbyPlaces: { type: String },
  propertyAge: { type: String },
  area: { type: String },
  noOfBedrooms: { type: Number },
  noOfBathrooms: { type: Number },
  furnishing: { type: String },
  totalShares: { type: Number, default: 0 },
  availableShares: { type: Number, default: 0 },
  perSharePrice: { type: Number, default: 0 },
  additionalInfo: { type: String },
  imgArr: [{ type: String }],
  aminities: [{ type: String }],
  additionalDetails: { type: String },
  postedOn: String,
  sellerId: Schema.Types.ObjectId,
});

module.exports = mongoose.model("warehouse_products", WarehouseSchema);