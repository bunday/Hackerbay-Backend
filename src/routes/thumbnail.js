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
      const tag = `${Date.now()}.jpg`;
      const path = `public/image/${tag}`;
      request.head(req.body.link, () => {
        request(req.body.link)
          .pipe(fs.createWriteStream(path))
          .on("close", async () => {
            const image = await jimp.read(path);
            await image.resize(50, 50);
            await image.writeAsync(path);
          });
      });
      const baseUrl = req.protocol + "://" + req.headers.host;
      const link = `${baseUrl}/image/${tag}`;
      res
        .status(200)
        .json({ message: "Thumbnail, Generated Successfully", link });
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
