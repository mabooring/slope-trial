// 参考URL
//docs.aws.amazon.com/ja_jp/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
const fs = require("fs");
// const path = require("path");
// const sharp = require("sharp");
// const exif = require("exif-reader");

class exif_model {
  constructor() {
    this.ExifTable = [
      // "FileName",
      "image.Make",
      "image.Model",
      "image.Orientation",
      "image.XResolution",
      "image.YResolution",
      "image.ModifyDate",

      "exif.ExposureTime",
      "exif.Fnumber",
      "exif.ISO",
      "exif.DateTimeOriginal",
      "exif.DateTimeDigitized",
      "exif.MaxApertureValue",
      "exif.WhiteBalance",
      "exif.DigitalZoomRatio",

      "gps.GPSLatitudeRef",
      "gps.GPSLatitude",
      "gps.GPSLongitudeRef",
      "gps.GPSLongitude",
    ];

    this.ExifData = {
      FolderName: "",
      FileName: "",
      image: {
        Make: "",
        Model: "",
        Orientation: "",
        XResolution: "",
        YResolution: "",
        ModifyDate: "",
      },
      exif: {
        ExposureTime: "",
        Fnumber: "",
        ISO: "",
        DateTimeOriginal: "",
        DateTimeDigitized: "",
        MaxApertureValue: "",
        WhiteBalance: "",
        DigitalZoomRatio: "",
      },
      gps: {
        GPSLatitudeRef: "",
        GPSLatitude: [],
        GPSLongitudeRef: "",
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
    };
  }

  //全階層のファイルを２次元配列で取得
  getAllFilesFromFolder(dir) {
    const results = [];

    fs.readdirSync(dir).forEach(function (file) {
      file = dir + "/" + file;
      const stat = fs.statSync(file);

      if (stat && stat.isDirectory()) {
        results = results.concat(_getAllFilesFromFolder(file));
      } else results.push(file);
    });
    return results;
  }

  getFilesFromFolder(dir) {
    const results = [];

    fs.readdirSync(dir).forEach(function (file) {
      file = dir + "/" + file;

      results.push(file);
    });
    return results;
  }

  setExifProperty(ExifTable, readExifData, exifData) {
    ExifTable.forEach((data, index) => {
      const key = ExifTable[index];
      const sourceData = this.getValue(readExifData, key);
      this.setValue(exifData, key, sourceData);
    });
  }

  // 階層のプロパティ処理の参考Url
  //qiita.com/exabugs/items/e3cc79b69ddeb6856d3e
  getObject(obj, key, callback, readonly) {
    var keys = key.split(".");
    var k = keys.pop();

    if (obj === undefined || obj === null) {
      obj = [];
    } else if (!(obj instanceof Array)) {
      obj = [obj];
    }

    obj = keys.reduce(function (obj, key) {
      return obj.reduce(function (ary, obj) {
        if (obj[key] !== undefined) {
          ary = ary.concat(obj[key]);
        } else if (!readonly) {
          obj[key] = {};
          ary.push(obj[key]);
        }
        return ary;
      }, []);
    }, obj);

    return callback(obj, k);
  }

  getValue(obj, key, val) {
    return this.getObject(
      obj,
      key,
      function (obj, key) {
        obj = obj[0];
        if (obj === undefined) {
          return val;
        } else if (obj === null) {
          return val;
        } else if (obj[key] === undefined) {
          return val;
        } else {
          return obj[key];
        }
      },
      true
    );
  }

  setValue(obj, key, val) {
    return this.getObject(
      obj,
      key,
      function (obj, key) {
        return obj.reduce(function (memo, obj) {
          return obj && (obj[key] = val);
        }, false);
      },
      false
    );
  }
}

module.exports = exif_model;
