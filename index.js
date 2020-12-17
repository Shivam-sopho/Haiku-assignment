const express = require("express");
const { Haiku } = require("./models/Haiku");
const mongoose = require("mongoose");
const app = express();
const db = require("./stores/db");
const port = 3001;
var logger = require("morgan");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(express.json());
var haiku = mongoose.model("Haiku");

var insertHaiku = function (req, callback) {
  var newHaiku = haiku({
    id: req.body.id,
    haiku: req.body.haiku,
  });
  newHaiku.save().then(
    (result) => {
      console.log("New haiku Created");
      callback({ res: true });
    },
    (err) => {
      console.log(err + "data not inserted");
      callback({ res: false });
    }
  );
};

var updatehaiku = function (req, callback) {
  haiku.find({ id: req.params.id }).then(
    (query) => {
      callback({ data: query });
    },
    (err) => {
      console.log(err);
    }
  );
};

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  db.once("open", () => {
    // call stats directly
    db.db.stats((err, data) => {
      res.send(data);
    });
  });
  insertHaiku(req, (found) => {
    console.log(found);
  });
});

app.post("/updatehaiku/:id", (req, res) => {
  updatehaiku(req, (found) => {
    console.log(found);
    if (found.data.length == 0) {
      res.send("No Haiku Present Please add new haiku");
    } else {
      var newstring = found.data[0].haiku.concat(req.body.haiku);
      haiku.findOneAndUpdate(
        { id: req.params.id },
        { haiku: newstring },
        (err, found1) => {
          if (err) throw err;
          else {
            console.log(found1);
          }
        }
      );
      res.send("Updated Executed");
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
