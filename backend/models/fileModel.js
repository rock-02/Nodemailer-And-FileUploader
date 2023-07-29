const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  video: {
    public_id: {
      type: String,
    },
    secure_url: {
      type: String,
    },
  },
  image: {
    public_id: {
      type: String,
    },
    secure_url: {
      type: String,
    },
  },
});

// console.log();
const fileModel = mongoose.model("fileModel", fileSchema);
module.exports = fileModel;
