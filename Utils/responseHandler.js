/**
 * @description Send a structured JSON response.
 * @param {Object} res - The express response object.
 * @param {number} statusCode - The HTTP status code.
 * @param {boolean} success - Indicates if the request was successful.
 * @param {string} message - Descriptive message about the response.
 * @param {Object} data - The data to send back, if any.
 */
module.exports.sendResponse =(res, statusCode, success, message, data = null) => {
    res.status(statusCode).json({
        success,
        message,
        code: statusCode,
        data
    });
}


