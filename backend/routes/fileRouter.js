const express = require("express");
const {
  localFileUpload,
  imageUpload,
  videoUpload,
  imageReduceAndUpload,
} = require("../controllers/fileController");

const router = express.Router();

// router.route.("/local").p, localFileUpload);
router.route("/local").post(localFileUpload);
router.route("/cloud/image").post(imageUpload);
router.route("/cloud/video").post(videoUpload);
router.route("/cloud/reduced-image").post(imageReduceAndUpload);

module.exports = router;
