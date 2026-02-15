const express = require('express');
const app = express();
const helmet = require('helmet');
const port = process.env.PORT || 5000;
const mongoDB = require("./db.js");

mongoDB();

app.listen(port, '0.0.0.0', () => {
    console.log('App is active and running');
});