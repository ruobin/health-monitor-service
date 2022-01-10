const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
  {
    endpointId: String,
    type: String,
    error: String,
    start: Date,
    end: Date,
    duration: Number,
  },
  { timestamps: true }
);

incidentSchema.pre("save", function save(next) {
  console.log(`Incident saving: ${JSON.stringify(this.id)}.`);
  next();
});

const Incident = mongoose.model("Incident", incidentSchema);

module.exports = Incident;
