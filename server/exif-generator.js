// 参考URL
//docs.aws.amazon.com/ja_jp/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const exif = require("exif-reader");
const exifObj = require("./model/exif-data");

// ###### 走らせ方
// node s3_upload.js BUCKET_NAME FILE_NAME

// フォルダーのファイルリストを取得
// アップロードしたい親フォルダーを指定
const folderName = "/Volumes/SSD256/DATA/S3_Upload_Data/images/Hakone-A1";

//全階層のファイルを２次元配列で取得
const _getAllFilesFromFolder = function (dir) {
  const results = [];

  fs.readdirSync(dir).forEach(function (file) {
    file = dir + "/" + file;
    const stat = fs.statSync(file);

    if (stat && stat.isDirectory()) {
      results = results.concat(_getAllFilesFromFolder(file));
    } else results.push(file);
  });
  return results;
};

const _getFilesFromFolder = function (dir) {
  const results = [];

  fs.readdirSync(dir).forEach(function (file) {
    file = dir + "/" + file;

    results.push(file);
  });
  return results;
};

// const uploadFiles = _getAllFilesFromFolder(folderName);
const jpegFiles = _getFilesFromFolder(folderName);
// const outJsonFile

const ExifTable = [
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

const exifData = {
  FileName: "",
  image: {
    Make: "",
    Model: "",
    Orientation: "",
    XResolution: "",
    YResolution: "",
    ModifyDate: (date = ""),
  },
  exif: {
    ExposureTime: "",
    Fnumber: "",
    ISO: "",
    DateTimeOriginal: (date = ""),
    DateTimeDigitized: (date = ""),
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

const outFileName = "outFile.json";
fs.unlink(outFileName, (err) => {});
var loopTimes = 0;
// fs.writeFileSync(outFileName, "[");

for (const i in jpegFiles) {
  const file = jpegFiles[i];
  loopTimes++;

  sharp(file)
    .metadata()
    .then(function (metadata) {
      const readExifData = exif(metadata.exif);

      //FileNameプロパティをjpegファイル名からセット
      setValue(exifData, "FileName", path.basename(file));

      for (var i in ExifTable) {
        key = ExifTable[i];
        var sourceData = getValue(readExifData, key);
        setValue(exifData, key, sourceData);
      }

      //jsonファイル出力用のstream
      console.log(loopTimes);

      fs.appendFileSync(outFileName, JSON.stringify(exifData));
      fs.appendFileSync(outFileName, ",");
      // if (loopTimes === 4) {
      //   fs.appendFileSync(outFileName, "]");
      // }
    });
}

//qiita.com/exabugs/items/e3cc79b69ddeb6856d3e
function getObject(obj, key, callback, readonly) {
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

function getValue(obj, key, val) {
  return getObject(
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

function setValue(obj, key, val) {
  return getObject(
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
