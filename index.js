//NPM Packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./Configuration/envConfig");
require("dotenv").config();
const app = express();

//Project files and routes
const apiRouter = require("./Routes/calendarific");

//Middlwares
app.use(bodyParser.json());
app.use(cors());

//connecting routes
app.use(apiRouter);

//Connect Server
const PORT = config.port || 5001;
app.listen(PORT, () => {
  console.log(`Your app is running on PORT ${PORT}`);
});

exports.app = app;