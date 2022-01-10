const Inspection = require("./Inspection.model");

exports.index = async (req, res) => {
  const inspections = await Inspection.find({});
  res.json({ inspections });
};

exports.find = async (req, res) => {
  const inspection = await Inspection.findOne({
    _id: req.params.id,
  });
  res.json({ inspection });
};
