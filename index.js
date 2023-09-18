const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4000;

// define the middleware
app.use(bodyParser.json());
app.use(cors());