const Endpoint = require("./Endpoint.model");

exports.index = async (req, res) => {
  const endpoints = await Endpoint.find({});
  res.json({ endpoints });
}

exports.find = async (req, res) => {
  const endpoint = await Endpoint.findOne({
    _id: req.params.id,
  });
  res.json({ endpoint });
};

exports.create = async (req, res) => {
  const {
    url,
    sampleRequest,
    httpMethod,
    header,
    payload,
    expectedResponse,
    interval,
    timeout,
  } = req.body;
  const endpoint = await Endpoint.create({
    url,
    sampleRequest,
    httpMethod,
    header,
    payload,
    expectedResponse,
    interval,
    timeout,
  });
  res.json(endpoint);
};

exports.delete = async (req, res) => {
  const endpoint = await Endpoint.deleteOne({
    _id: req.params.id,
  });
  res.json({ endpoint });
};