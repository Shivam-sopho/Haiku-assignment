const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/testing", (err) => {
  mongoose.set("useFindAndModify", false);
  console.log("connecting");
  if (err) {
    console.log(`failed db connection: ${err}`);
  }
});

module.exports = mongoose.connection;
