const mongoose = require("mongoose");

const ChannelPartnerSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: Number },
  email: { type: String },
  city: { type: String },
  state: { type: String },
  agentType: { type: String },
  cpImage: { type: String },
  panCardChallenge: { type: String },
  aadharCardFrontImage: { type: String },
  aadharCardBackImage: { type: String },
});
module.exports = mongoose.model("channel-partner", ChannelPartnerSchema);