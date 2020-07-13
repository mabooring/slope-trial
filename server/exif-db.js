const Exif = require("./model/exif");
const fs = require("fs");

const exifFilePath = "./nodetools/jsonresults/Hakone-A1.json";

class ExifDb {
  constructor() {
    // this.exifs = fs.readFile(exifFilePath, (err, data) => {
    //   console.log("readJsonData");
    //   console.log(data);
    // });
    this.exifs = [
      {
        FolderName: "Hakone-A1",
        FileName: "P1000037.jpg",
        image: {
          Make: "Panasonic",
          Model: "DC-TZ95",
          Orientation: 1,
          XResolution: 180,
          YResolution: 180,
          ModifyDate: "2019-12-11T14:06:23.000Z",
        },
        exif: {
          ExposureTime: 0.016666666666666666,
          ISO: 200,
          DateTimeOriginal: "2019-12-11T14:06:23.000Z",
          DateTimeDigitized: "2019-12-11T14:06:23.000Z",
          MaxApertureValue: 4.8671875,
          WhiteBalance: 0,
          DigitalZoomRatio: 0,
        },
        gps: {
          GPSLatitudeRef: "N",
          GPSLatitude: [35, 10, 14.750831946755408],
          GPSLongitudeRef: "E",
          GPSLongitude: [139, 4, 3.843912007846434],
        },
      },
      {
        FolderName: "Hakone-A1",
        FileName: "P1000053.jpg",
        image: {
          Make: "Panasonic",
          Model: "DC-TZ95",
          Orientation: 1,
          XResolution: 180,
          YResolution: 180,
          ModifyDate: "2019-12-11T14:45:14.000Z",
        },
        exif: {
          ExposureTime: 0.0125,
          ISO: 200,
          DateTimeOriginal: "2019-12-11T14:45:14.000Z",
          DateTimeDigitized: "2019-12-11T14:45:14.000Z",
          MaxApertureValue: 4.69921875,
          WhiteBalance: 0,
          DigitalZoomRatio: 0,
        },
        gps: {
          GPSLatitudeRef: "N",
          GPSLatitude: [35, 10, 13.357632093933464],
          GPSLongitudeRef: "E",
          GPSLongitude: [139, 4, 4.835136020976729],
        },
      },
      {
        FolderName: "Hakone-A1",
        FileName: "P1000026.jpg",
        image: {
          Make: "Panasonic",
          Model: "DC-TZ95",
          Orientation: 1,
          XResolution: 180,
          YResolution: 180,
          ModifyDate: "2019-12-11T11:56:57.000Z",
        },
        exif: {
          ExposureTime: 0.016666666666666666,
          ISO: 100,
          DateTimeOriginal: "2019-12-11T11:56:57.000Z",
          DateTimeDigitized: "2019-12-11T11:56:57.000Z",
          MaxApertureValue: 4.8671875,
          WhiteBalance: 0,
          DigitalZoomRatio: 0,
        },
        gps: {
          GPSLatitudeRef: "N",
          GPSLatitude: [35, 9, 51.38953195772521],
          GPSLongitudeRef: "E",
          GPSLongitude: [139, 4, 7.956263996838361],
        },
      },
      {
        FolderName: "Hakone-A1",
        FileName: "P1000009.jpg",
        image: {
          Make: "Panasonic",
          Model: "DC-TZ95",
          Orientation: 1,
          XResolution: 180,
          YResolution: 180,
          ModifyDate: "2019-12-11T11:40:04.000Z",
        },
        exif: {
          ExposureTime: 0.01,
          ISO: 80,
          DateTimeOriginal: "2019-12-11T11:40:04.000Z",
          DateTimeDigitized: "2019-12-11T11:40:04.000Z",
          MaxApertureValue: 4.97265625,
          WhiteBalance: 0,
          DigitalZoomRatio: 0,
        },
        gps: {
          GPSLatitudeRef: "N",
          GPSLatitude: [35, 9, 48.853548062405636],
          GPSLongitudeRef: "E",
          GPSLongitude: [139, 4, 2.77968],
        },
      },
    ];
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