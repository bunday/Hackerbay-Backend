// dependencies
const express = require('express')
var payloadChecker = require('payload-validator')
const jsonPatch = require('json-patch')
// payload expected
var expectedPayload = {
  content: {},
  opetation: []
}
const router = express.Router()
router.post('', (req, res) => {
  // validating request
  var result = payloadChecker.validator(
    req.body,
    expectedPayload,
    ['content', 'operation'],
    false
  )
  if (result.success) {
    // try to apply json patch
    try {
      const response = jsonPatch.apply(req.body.content, req.body.operation)
      // success return
      res.status(200).json({
        message: 'Success',
        data: response
      })
    } catch (error) {
      // failure return with error
      res.status(400).json({
        message: 'Invalid Request, Something went wrong',
        response: error
      })
    }
  } else {
    // validator failed
    res.status(400).json({
      message: 'Content and Operation is required'
    })
  }
})

module.exports = router
