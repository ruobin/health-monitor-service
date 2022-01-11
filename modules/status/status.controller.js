const Endpoint = require("../endpoint/Endpoint.model");
const Incident = require("../incident/Incident.model");

exports.index = async (req, res) => {
  const endpoints = await Endpoint.find({});
  let statusList = [];
  await Promise.all(
    endpoints.map(async (endpoint) => {
      const latestIncident = await Incident.findOne({
        endpointId: endpoint.id,
      }).sort({ updatedAt: -1 });
      // latest incident is still ongoing, meaning status should show error/failure
      let status;
      if (latestIncident && !latestIncident.end) {
        status = "error";
      } else {
        status = "normal";
      }
      console.log(JSON.stringify(endpoint));
      statusList.push({ endpoint, status });
    })
  );
  res.json({ statusList });
};
