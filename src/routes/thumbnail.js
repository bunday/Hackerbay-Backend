//dependencies
const express = require("express");
var payloadChecker = require("payload-validator");
const jimp = require("jimp");
const fs = require("fs");
const request = require("request");
// payload expected
var expectedPayload = {
  link: "",
};
const router = express.Router();
router.post("", async (req, res) => {
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
      const path = `public/image/${Date.now()}.jpg`;
      await request(req.body.link).pipe(fs.createWriteStream(path));
      const image = await jimp.read(path);
      await image.resize(50, 50);
      await image.writeAsync(path);

      res.status(200).json({ path });
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
