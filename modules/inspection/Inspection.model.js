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

inspectionSchema.pre("save", function save(next) {
  console.log(
    `Inspection saving: ${JSON.stringify(this.id)}.`
  );
  next();
});


const Inspection = mongoose.model("Inspection", inspectionSchema);

module.exports = Inspection;
