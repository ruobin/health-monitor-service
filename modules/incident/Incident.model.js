const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
  {
    endpointId: String,
    type: String,
    error: String,
    start: Date,
    end: Date,
  },
  { timestamps: true }
);

const Incident = mongoose.model("Incident", incidentSchema);

module.exports = Incident;
