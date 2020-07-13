const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const RoadsSchema = new Schema({
  //   author: ObjectId,
  folderId: String,
  coverimg: String,
  prefecture: { type: String, required: true, max: [60, "最大60文字までです"] },
  area: String,
  roadname: String,
  members: String,
  picturedate: { type: Date, required: true },
  description: String,
  roadImgUrl: String,
});

module.exports = mongoose.model("Roads", RoadsSchema);
