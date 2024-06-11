const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: String,
    images: [{ imageUrl: String, cloudinaryId: String }],
    phoneNumber: String,
    website: String,
    address: String,
    email: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hospital", hospitalSchema);
