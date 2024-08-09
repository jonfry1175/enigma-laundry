const axios = require("axios");
require("dotenv").config();

exports.handler = async function (event, context) {
  try {
    // Menggabungkan API_URL dengan /api/v1 dan sisa path dari request
    const apiUrl = process.env.LAUNDRY_API_URL + "/api/v1" + event.path.replace("/.netlify/functions/api-proxy", "");
    
    const response = await axios({
      url: apiUrl,
      method: event.httpMethod,
      headers: {
        ...event.headers,
        host: process.env.LAUNDRY_API_URL.replace("https://", ""),
      },
      data: event.body,
    });

    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
