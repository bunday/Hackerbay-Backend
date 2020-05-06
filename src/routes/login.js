const express = require("express");
var payloadChecker = require("payload-validator");
var expectedPayload = {
  username: "",
  password: "",
};
const router = express.Router();

router.post("", (req, res) => {
  var result = payloadChecker.validator(
    req.body,
    expectedPayload,
    ["username", "password"],
    false
  );
  if (result.success) {
    res.status(200).json({
      message: "Login Successful",
    });
  } else {
    res.status(400).json({
      message: "Username and Password is required",
    });
  }
});

module.exports = router;
