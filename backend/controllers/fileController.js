// const path = require("path");
const cloudinary = require("cloudinary");
const fileModel = require("../models/fileModel");
exports.localFileUpload = (req, res) => {
  try {
    if (req.files.file) {
      const file = req.files.file;
      const filepath = `${__dirname}/files/${Date.now()}.${
        file.name.split(".")[1]
      }`;
      file.mv(filepath, (e) => console.log(e));
      return res.status(200).json({
        msg: "Uploaded to server",
      });
    }

    res.status(400).json({
      msg: "Try Again",
    });
  } catch (error) {
    console.log(error);
  }
};

function uploadFiletoCloud(file, fold, quality) {
  console.log("hi I AM here");

  const options = { folder: fold }; // Fix typo 'fold' -> 'folder'
  options.resource_type = "auto";
  if (quality) {
    options.quality = quality;
  }

  try {
    return cloudinary.v2.uploader.upload(file.tempFilePath, options);
  } catch (error) {
    // Handle the error here (e.g., log it or throw it)
    console.log(error);
    throw error; // Optionally rethrow the error to handle it in the caller function.
  }
}

function isSuppoted(ext, types) {
  return types.includes(ext);
}
exports.imageUpload = async (req, res) => {
  const email = req.body.email;
  console.log(email," : EMAIL ID");
  const file = req.files.file;
  console.log(file);
  const ext = file.name.split(".")[1].toLowerCase();
  const suppeorted = ["jpg", "jpeg", "png", "svg"];
  if (!isSuppoted(ext, suppeorted)) {
    return res.status(400).json({
      success: false,
      msg: "Not in suppoted format",
    });
  }
  try {
    const resp = await uploadFiletoCloud(file, "temp");
    // console.log(resp);
    const imageFile = await fileModel.create({
      image: {
        public_id: resp.public_id,
        secure_url: resp.secure_url,
      },
      email,
    });
    await imageFile.save();
    return res.status(200).json({
      msg: "uploaded successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      msg: "Upload failed",
    });
  }
};

exports.videoUpload = async (req, res) => {
  const file = req.files.file;
  // console.log(file);
  const ext = file.name.split(".")[1].toLowerCase();
  console.log("extension is : ", ext);
  const suppeorted = ["mp4", "mkv"];
  if (!isSuppoted(ext, suppeorted)) {
    return res.status(400).json({
      success: false,
      msg: "Not in suppoted format",
    });
  }
  try {
    const resp = await uploadFiletoCloud(file, "temp");
    console.log(resp);
    const videoFile = await fileModel.create({
      video: {
        public_id: resp.public_id,
        secure_url: resp.secure_url,
      },
    });
    await videoFile.save();
    return res.status(200).json({
      msg: "uploaded successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      msg: "Upload failed",
    });
  }
};

exports.imageReduceAndUpload = async (req, res) => {
  const file = req.files.file;
  const ext = file.name.split(".")[1].toLowerCase();
  const suppoted = ["jpg", "jpeg", "svg", "png"];

  if (!isSuppoted(ext, suppoted)) {
    return res.status(400).json({
      msg: "Invalid Format",
    });
  }

  try {
    const response = await uploadFiletoCloud(file, "temp", 50);
    const reducedFile = await fileModel.create({
      image: {
        public_id: response.public_id,
        secure_url: response.secure_url,
      },
    });
    await reducedFile.save();
    res.status(200).json({
      reducedFile,
      msg: "Uploaddes Successfully",
    });
  } catch (e) {
    return res.status(400).json({
      msg: e.message,
    });
  }
};
