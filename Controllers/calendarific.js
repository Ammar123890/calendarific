const axios = require('axios');
const config = require('../Configuration/envConfig');
const { getDataFromCache, setDataInCache } = require('../Utils/cache');
const { holidaysSchema } = require('../Utils/validator');
const { sendResponse } = require('../Utils/responseHandler'); // for standardizing responses

/**
 * @description Get holidays for a specific country and year
 * @route GET /api/calendarific/holidays
 * @access Public
 * @param {string} country.query.required - The country code to fetch holidays for
 * @param {number} year.query.required - The year to fetch holidays for
 * @Author Syed Muhammad Ammar
 */

module.exports.getHolidays = async (req, res) => {
    try {
        const { error, value } = holidaysSchema.validate(req.query);
        if (error) {
            return sendResponse(res, 400, false, error.details[0].message);
        }

        // Extract country and year from query
        const { country, year } = value;

        // Check cache for existing data
        const cacheKey = `holidays-${country}-${year}`;
        let data = await getDataFromCache(cacheKey);

        // Fetch data from Calendarific API if not found in cache
        if (!data) {
            const url = `${config.apiUrl}/holidays?api_key=${config.apiKey}&country=${country}&year=${year}`;
            const response = await axios.get(url);
            data = response.data;
            if (response.data.meta.code !== 200) {
                return sendResponse(res, response.data.meta.code, false, 'Failed to fetch data from Calendarific', data);
            }
            // Cache the data for future use
            await setDataInCache(cacheKey, data, config.cacheTTL);
        }

        sendResponse(res, 200, true, 'Holidays retrieved successfully', data.response);
    } catch (error) {
        console.error('Failed to fetch holidays:', error);
        sendResponse(res, 500, false, 'Internal server error');
    }
};

/**
 * @description Get list of countries
 * @route GET /api/calendarific/countries
 * @access Public
 * @Author Syed Muhammad Ammar
 */

module.exports.getCountries = async (req, res) => {
    try {
        // Check cache for existing data
        const cacheKey = 'countries';
        let countries = await getDataFromCache(cacheKey);

        // Fetch data from Calendarific API if not found in cache
        if (!countries) {
            const url = `${config.apiUrl}/countries?api_key=${config.apiKey}`;
            const response = await axios.get(url);
            countries = response.data;
            if (response.data.meta.code !== 200) {
                return sendResponse(res, response.data.meta.code, false, 'Failed to fetch data from Calendarific', countries);
            }
            // Cache the data for future use
            await setDataInCache(cacheKey, countries, config.cacheTTL);
        }

        sendResponse(res, 200, true, 'Countries retrieved successfully', countries.response);
    } catch (error) {
        console.error('Failed to fetch countries:', error);
        sendResponse(res, 500, false, 'Internal server error');
    }
};

