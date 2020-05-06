// Dependencies
const express = require('express')
var payloadChecker = require('payload-validator')
const jwt = require('jsonwebtoken')

// expected parameters for validator
var expectedPayload = {
  username: '',
  password: ''
}
const router = express.Router()
// getting gwt passcode from env
const jwtPasscode = process.env.JWT_TOKEN
router.post('', (req, res) => {
  // validating sent data
  var result = payloadChecker.validator(
    req.body,
    expectedPayload,
    ['username', 'password'],
    false
  )
  if (result.success) {
    // signing token with credentials and returning to user
    const token = jwt.sign(
      {
        ...req.body
      },
      jwtPasscode,
      { expiresIn: '1h' }
    )
    res.status(200).json({
      message: 'Login Successful',
      token
    })
  } else {
    // validator failed
    res.status(400).json({
      error: 'Username and Password is required'
    })
  }
})

module.exports = router
