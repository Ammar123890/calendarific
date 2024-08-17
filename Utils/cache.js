// Import the node-cache package
const NodeCache = require('node-cache');
const config = require('../Configuration/envConfig');

// Create a cache instance
const cache = new NodeCache({ stdTTL: config.cacheTTL });

/**
 * @description Set data in cache with optional TTL
 * @param {string} key - The cache key under which to store the data
 * @param {any} value - The data to be stored in cache
 * @param {number} [ttl] - Optional TTL, defaults to config cache TTL
 * @returns {boolean} True if success, throws an error if failed
 */

async function setDataInCache(key, value, ttl = config.cacheTTL) {
    const success = cache.set(key, value, ttl);
    if (!success) {
        throw new Error('Failed to set data in cache.');
    }
    return success;
}

/**
 * @description Get data from cache
 * @param {string} key - The cache key to retrieve data from
 * @returns {any} Cached data or null if not found
 */

async function getDataFromCache(key) {
    try {
        const value = cache.get(key);
        if (value === undefined) {
            return null;
        }
        return value;
    } catch (error) {
        console.error(`Error retrieving data from cache for key ${key}:`, error);
        return null; // Return null to allow fallback to API call
    }
}

module.exports = {
    setDataInCache,
    getDataFromCache
};
