// ./src/index.js
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const loginRouter = require('./routes/login')
const patchRouter = require('./routes/json-patch')
const authChecker = require('./middleware/checkauth')
const imageRouter = require('./routes/thumbnail')

// defining the Express app
const app = express()
const config = {
  name: 'hackerbay-backend',
  port: process.env.APP_PORT,
  host: process.env.APP_HOST
}

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json())

// enabling CORS for all requests
app.use(cors())

// adding morgan to log HTTP requests
app.use(morgan('combined'))

// defining an endpoint to return something
app.get('/', (req, res) => {
  res.send('hello 🎉')
})

app.use('/api/login', loginRouter)
app.use('/api/patch', authChecker, patchRouter)
app.use('/api/thumbnail', authChecker, imageRouter)

app.use('/', express.static('public'))
// starting the server
app.listen(config.port, config.host, () => {
  console.log(`listening on port ${config.port}`)
})

module.exports = app
