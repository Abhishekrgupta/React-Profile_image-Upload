const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
var fs = require("fs");

var app = express();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/ImageStore", {
  useNewUrlParser: true
});
var dbConnect = mongoose.connect;
if (!dbConnect) {
  console.log("Connection is not established");
  return;
}

app.use(bodyParser.text());
app.use(cors());
app.post("/image", (req, res) => {
  // console.log(req.body);
  let base64Image = req.body.split(";base64,").pop();
  let filetype = req.body
    .split(";base64,")[0]
    .split("/")
    .pop();
  fs.writeFileSync(`pictures/out.${filetype}`, base64Image, "base64", function(
    err
  ) {
    console.log(err);
  });
  // console.log(new Date().getTime());
});

app.listen(4000, () => {
  console.log(`Server up on port 4000`);
});

module.exports = {
  app
};
