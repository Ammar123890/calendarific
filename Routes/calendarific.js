const express = require('express');
const router = express.Router();
const { 
    getHolidays,
    getCountries 
} = require('../Controllers/calendarific');

router.get('/holidays', getHolidays);
router.get('/countries', getCountries);

module.exports = router;
