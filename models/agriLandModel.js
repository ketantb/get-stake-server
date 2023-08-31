const mongoose = require("mongoose");

const agrilandSchema = new mongoose.Schema({
  //seller types
  sellerName: { type: String },
  sellerType: {},
  reraId: { type: String },
  // property details
  propertyId: { type: String },
  propertyType: { type: String, default: "agri-land" },
  propertyAdType: { type: String, default: "sell" },
  landType: { type: String },
  landName: { type: String },
  typeOfOwnership: { type: String },
  dimensionsUnit: { type: String },
  lotSize: { type: String },
  lotSizeUnit: { type: String },
  zoning: { type: String },
  utilities: [{ type: String }],
  roadAccess: { type: String },
  dimensionLength: String,
  dimensionBreadth: String,
  plotSize: String,
  plotSizeUnit: String,
  boundary: String,
  soilTexture: String,
  soilPHValue: String,
  organicMatterContent: String,
  approvals: [{ type: String }],
  cornerPlot: { type: Boolean },
  mainRoadFacing: { type: Boolean },
  widthOfEntranceInFeets: { type: String },
  //location details
  street: { type: String },
  landmark: { type: String },
  city: { type: String },
  state: { type: String },
  pin: { type: String },
  nearbyPlaces: { type: String },
  //shares and rent prices
  rentPrice: { type: Number },
  totalShares: { type: Number },
  availableShares: { type: Number },
  perSharePrice: { type: Number },
  // images
  imgArr: [{ type: String }],
  view360ImgArr: [{ type: String }],
  // additional details
  whyInvestHere: [{ type: String }],
  additionalDetails: { type: String },
  // actions and status
  isVerified: { type: Boolean, default: true },
  postedOn: String,
  uniqueId: { type: String },
  sellerId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("agriculture-land_products", agrilandSchema);