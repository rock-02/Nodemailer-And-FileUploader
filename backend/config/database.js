const mongoose = require("mongoose");
// console.log(process.env.DB_URI);
const connectDatabse = () => {
  mongoose
    .connect(process.env.DB_URI || "mongodb://127.0.0.1:27017/fileupload")
    .then((db) => console.log(`Connected to the databae ${process.env.DB_URI}`))
    .catch((e) => {
      console.log(e);
    });
  
};

module.exports = connectDatabse;
