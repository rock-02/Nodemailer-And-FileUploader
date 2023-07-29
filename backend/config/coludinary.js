const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: "drg3pojou",
      api_key: "162476992476886",
      api_secret: "iIg6xcQ2tB5HL2tSxbR3_hfPB70",
    });
  } catch (error) {
    console.log(error);
  }
};

// console.log(process.env.CLOUD_API_KEY);
