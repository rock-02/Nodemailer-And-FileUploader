const express = require("express");
const connectDatabse = require("./config/database");
const { cloudinaryConnect } = require("./config/coludinary");
const router = require("./routes/fileRouter");

const fileUpload = require("express-fileupload");

const app = express();

require("dotenv").config({ path: "./dot.env" });

console.log(4000);
app.use(express.json());
connectDatabse();
cloudinaryConnect();
// app.use(fileUplaod());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/file", router);

app.listen(process.env.PORT || 4000, () => {
  console.log("connected");
});
