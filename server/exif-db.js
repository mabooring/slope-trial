const Exif = require("./model/exif");
const fs = require("fs");

const exifFilePath = "./nodetools/jsonresults/exif.json";

class ExifDb {
  constructor() {
    var readFile = fs.readFile(exifFilePath, (err, data) => {
      if (err) {
        console.log("Exif DB エラー");
      } else {
        this.exifs = JSON.parse(data);
      }
    });
  }

  async initDb() {
    await this.cleanDb();
    this.pushExifsToDb();
  }

  async cleanDb() {
    await Exif.deleteMany({});
  }

  pushExifsToDb() {
    this.exifs.forEach((exif) => {
      const newExif = new Exif(exif);
      newExif.save();
    });
  }

  seeDb() {
    this.pushExifsToDb();
  }
}

module.exports = ExifDb;
