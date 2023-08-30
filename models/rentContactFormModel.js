const mongoose = require("mongoose");

const RentContactFormSchema = {
  name: { type: String },
  email: { type: String },
  contact: { type: String },
  message: { type: String },
  propertyType: { type: String },
  sellerId: mongoose.Schema.Types.ObjectId,
};

module.exports = mongoose.model("rent-enquiries", RentContactFormSchema);