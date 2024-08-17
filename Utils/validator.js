const Joi = require('joi');

// Validator for fetching holidays
const holidaysSchema = Joi.object({
    country: Joi.string().regex(/^[A-Z]{2}$/).required().messages({
        'string.base': `"country" should be a type of 'text'`,
         // caledarific support ISP-3166 format
        'string.pattern.base': `"country" must be a 2-letter uppercase ISO-3166 country code`,
        'any.required': `"country" is a required field`
    }),
    year: Joi.number().integer().min(1900).max(2049).required().messages({
        'number.base': `"year" should be a type of 'number'`,
        'number.integer': `"year" must be an integer`,
        'number.min': `"year" must be at least 1900`,  // as specified in caledarific documentation (1990 - 2049)
        'number.max': `"year" must be no later than 2049`,
        'any.required': `"year" is a required field`
    })
});

module.exports = {
    holidaysSchema
};
