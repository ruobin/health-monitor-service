const axios = require("axios");

const Endpoint = require("../modules/endpoint/Endpoint.model");
const Inspection = require("../modules/inspection/Inspection.model");
const Incident = require("../modules/incident/Incident.model");

exports.healthCheck = async () => {
  const endpoints = await Endpoint.find({});
  await Promise.all(
    endpoints.map(async (endpoint) => {
      const startDate = new Date();
      const startTime = Date.now();
      try {
        const axiosOptions = {
          headers: JSON.parse(endpoint.header),
        };
        let response;
        switch (endpoint.httpMethod) {
          case "GET":
            response = await axios.get(endpoint.url, {
              axiosOptions,
            });
            break;
          case "POST":
            response = await axios.post(
              endpoint.url,
              JSON.parse(endpoint.payload),
              {
                axiosOptions,
              }
            );
            break;
          case "PUT":
            response = await axios.put(
              endpoint.url,
              JSON.parse(endpoint.payload),
              {
                axiosOptions,
              }
            );
            break;
          case "PATCH":
            response = await axios.patch(
              endpoint.url,
              JSON.parse(endpoint.payload),
              {
                axiosOptions,
              }
            );
            break;
          case "DELETE":
            response = await axios.delete(endpoint.url, {
              axiosOptions,
            });
            break;
        }
        const endDate = new Date();
        const endTime = Date.now();
        console.log(
          `Receive response: ${response.data} for endpoint: ${endpoint.url}`
        );
        if (response.data === endpoint.expectedResponse) {
          await Inspection.create({
            endpointId: endpoint.id,
            start: startDate,
            end: endDate,
            duration: endTime - startTime,
          });
        } else {
          await Incident.create({
            endpointId: endpoint.id,
            type: "RESPONSE_MISMATCH",
            error: response.status,
            start: startDate,
            end: endDate,
          });
        }
      } catch (e) {
        const endDate = new Date();
        console.error(JSON.stringify(e));
        await Incident.create({
          endpointId: endpoint.id,
          type: "HTTP_EXCEPTION",
          error: e.message,
          start: startDate,
          end: endDate,
        });
      }
    })
  );
};
