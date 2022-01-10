const mongoose = require("mongoose");

const endpointSchema = new mongoose.Schema(
  {
    url: String,
    sampleRequest: String,
    httpMethod: String,
    header: String,
    payload: String,
    expectedResponse: String,
    interval: Number,
    timeout: Number,
  },
  { timestamps: true }
);

endpointSchema.pre("save", function save(next) {
  next();
});


const Endpoint = mongoose.model("Endpoint", endpointSchema);

module.exports = Endpoint;
