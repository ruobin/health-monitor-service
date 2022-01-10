const Incident = require("./Incident.model");

exports.index = async (req, res) => {
  const incidents = await Incident.find({});
  res.json({ incidents });
};

exports.find = async (req, res) => {
  const incident = await Incident.findOne({
    _id: req.params.id,
  });
  res.json({ incident });
};
