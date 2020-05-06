//dependencies 
const express = require("express");
// payload expected
var expectedPayload = {
  content: {},
  opetation: [],
};
const router = express.Router();
router.post("", (req, res) => {
    // validating request
  var result = payloadChecker.validator(
    req.body,
    expectedPayload,
    ["content", "operation"],
    false
  );
  if (result.success) {
    // try to apply json patch

    // success return 

    //failure return with error 
  } else {
      // validator failed
    res.status(400).json({
      message: "Content and Operation is required",
    });
  }
});

module.exports = router;
