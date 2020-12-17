"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var HaikuSchema = new Schema(
  {
    id: { type: Number, required: true },
    haiku: { type: String, required: true },
  },
  { timestamps: true }
);

var Haiku = mongoose.model("Haiku", HaikuSchema, "haiku");
