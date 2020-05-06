const express = require("express");
var payloadChecker = require("payload-validator");
const jwt = require("jsonwebtoken");
var expectedPayload = {
  username: "",
  password: "",
};
const router = express.Router();
const jwtPasscode = process.env.JWT_TOKEN;
router.post("", (req, res) => {
  var result = payloadChecker.validator(
    req.body,
    expectedPayload,
    ["username", "password"],
    false
  );
  if (result.success) {
    const token = jwt.sign(
      {
        ...req.body,
      },
      jwtPasscode,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "Login Successful",
      token
    });
  } else {
    res.status(400).json({
      message: "Username and Password is required",
    });
  }
});

module.exports = router;
