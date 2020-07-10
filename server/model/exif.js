const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const ExifsSchema = new Schema({
  //   author: ObjectId,
  FolderName: { type: String, required: true },
  FileName: { type: String, required: true },
  image: {
    Make: String,
    Model: String,
    Orientation: Number,
    XResolution: Number,
    YResolution: Number,
    ModifyDate: Date,
  },
  exif: {
    ExposureTime: Number,
    Fnumber: Number,
    ISO: Number,
    DateTimeOriginal: Date,
    DateTimeDigitized: Date,
    MaxApertureValue: Number,
    WhiteBalance: Number,
    DigitalZoomRatio: Number,
  },
  gps: {
    GPSLatitudeRef: String,
    GPSLatitude: [],
    GPSLongitudeRef: String,
    GPSLongitude: [],
    // GPSAltitudeRef: number,
    // GPSAltitude: number,
    // GPSTimeStamp: [],
    // GPSSpeedRef: string,
    // GPSSpeed: number,
    // GPSImgDirectionRef: string,
    // GPSImgDirection: number,
    // GPSMapDatum: string,
    // GPSDateStamp: date,
  },
});

module.exports = mongoose.model("Exifs", ExifsSchema);
