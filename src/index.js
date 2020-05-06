// ./src/index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const loginRouter = require('./routes/login');
const patchRouter = require('./routes/json-patch');

// defining the Express app
const app = express();

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return something
app.get('/', (req, res) => {
  res.send('ads');
});

app.use('/api/login', loginRouter);
app.use('/api/patch', patchRouter);

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});