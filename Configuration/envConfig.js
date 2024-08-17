// config.js
require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    apiUrl: process.env.CALENDARIFIC_API_URL,
    apiKey: process.env.CALENDARIFIC_API_KEY,
    cacheTTL: parseInt(process.env.CACHE_TTLL, 10) || 3600, // Default TTL 3600 seconds
};
