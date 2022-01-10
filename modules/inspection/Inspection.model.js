const mongoose = require("mongoose");

const inspectionSchema = new mongoose.Schema(
  {
    endpointId: String,
    start: Date,
    end: Date,
    duration: Number,
  },
  { timestamps: true }
);

const Inspection = mongoose.model("Inspection", inspectionSchema);

module.exports = Inspection;
