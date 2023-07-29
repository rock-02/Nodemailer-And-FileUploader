const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
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

fileSchema.post("save", async (doc) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: "maidurtarun@gmail.com",
        pass: "czsliyxnoehqomqf",
      },
    });
    let info = await transporter.sendMail({
      from: "ghjkk",
      to: doc.email,
      subject: "Your Detais Uploaded Succesfully",
      html: `<h2>Welcome To the world</h2>`,
    });
  } catch (e) {
    console.log(e);
  }
});
// console.log();
const fileModel = mongoose.model("fileModel", fileSchema);
module.exports = fileModel;
