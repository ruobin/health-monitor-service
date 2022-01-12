const axios = require("axios");
const _ = require("lodash");

const Endpoint = require("../modules/endpoint/Endpoint.model");
const Inspection = require("../modules/inspection/Inspection.model");
const Incident = require("../modules/incident/Incident.model");

exports.healthCheck = async (endpoints) => {
  await Promise.all(
    endpoints.map(async (endpoint) => {
      setInterval(async () => {
        const incidents = await Incident.find({
          endpointId: endpoint.id,
        }).sort({ updatedAt: -1 }).limit(1);
        const latestIncident = incidents[0];
        console.log(
          `latest incident is ${JSON.stringify(
            latestIncident
          )}`
        );

        const startDate = new Date();
        const startTime = Date.now();
        try {
          const requestConfig = {
            method: _.lowerCase(endpoint.httpMethod),
            url: endpoint.url,
            timeout: endpoint.timeout * 1000,
          };
          if (!_.isEmpty(endpoint.header)) {
            console.log(`endpoint.header is NOT empty`);
            requestConfig.headers = JSON.parse(endpoint.header);
          }
          if (!_.isEmpty(endpoint.payload)) {
            console.log(`endpoint.payload is NOT empty`);
            requestConfig.data = JSON.parse(endpoint.payload);
          }
          let response = await axios(requestConfig);

          const endDate = new Date();
          const endTime = Date.now();
          console.log(
            `Receive response: ${response.data} for endpoint: ${endpoint.url}`
          );

          // http status code shows error
          if (response.status >= 400) {
            if (
              !latestIncident ||
              (latestIncident &&
                latestIncident.end &&
                latestIncident.end < startDate)
            ) {
              await Incident.create({
                endpointId: endpoint.id,
                type: "RESPONSE_MISMATCH",
                error: response.status,
                start: startDate,
              });
            } else if (latestIncident) {
              // the last incident is still ongoing
              latestIncident.duration =
                Date.now() - latestIncident.start.getTime();
              latestIncident.save();
            }
          } else {
            await Inspection.create({
              endpointId: endpoint.id,
              start: startDate,
              end: endDate,
              duration: endTime - startTime,
              response: JSON.stringify(response.data),
            });
            if (latestIncident && !latestIncident.end) {
              latestIncident.end = endDate;
              latestIncident.duration =
                endTime - latestIncident.start.getTime();
              latestIncident.save();
            }
          }
        } catch (e) {
          if (
            !latestIncident ||
            (latestIncident &&
              latestIncident.end &&
              latestIncident.end < startDate)
          ) {
            console.error(JSON.stringify(e));
            await Incident.create({
              endpointId: endpoint.id,
              type: "HTTP_EXCEPTION",
              error: e.message,
              start: startDate,
            });
          } else if (latestIncident) {
            // the last incident is still ongoing
            latestIncident.duration =
              Date.now() - latestIncident.start.getTime();
            latestIncident.save();
          }
        }
      }, endpoint.interval * 1000);
    })
  );
};

exports.initHealthCheck = async () => {
  const endpoints = await Endpoint.find({});
  this.healthCheck(endpoints);
};
