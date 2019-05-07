const mongoose = require("mongoose");

var Image = mongoose.model("image", {
  imageData: String
});

module.exports = {
  Image
};
