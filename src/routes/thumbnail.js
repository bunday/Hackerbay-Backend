//dependencies
const express = require("express");
var payloadChecker = require("payload-validator");
// payload expected
var expectedPayload = {
  link: ""
};
const router = express.Router();
router.post("", (req, res) => {
  // validating request
  var result = payloadChecker.validator(
    req.body,
    expectedPayload,
    ["link"],
    false
  );
  if (result.success) {
    // try to send to the module with the functionality
    try {
      
      // success return
    
    } catch (error) {
      //failure return with error
      res.status(400).json({
        message: "Invalid Request, Something went wrong",
        response: error,
      });
    }
  } else {
    // validator failed
    res.status(400).json({
      message: "Link is required",
    });
  }
});

module.exports = router;
