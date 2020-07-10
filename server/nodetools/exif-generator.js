// 参考URL
//docs.aws.amazon.com/ja_jp/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const exif = require("exif-reader");
const ExifModel = require("./exif-model");

var exifModel = new ExifModel();
// フォルダーのファイルリストを取得
const folderPath = "/Volumes/SSD256/DATA/S3_Upload_Data/images/Hakone-A1";
// フォルダー名を取得
const pathPart = folderPath.split("/");
const folderName = pathPart[pathPart.length - 1];

const jpegFiles = exifModel.getFilesFromFolder(folderPath);

const outFileName = "jsonresults" + "/" + folderName + ".json";
fs.unlink(outFileName, (err) => {});
console.log(outFileName);

//ファイル出力
// genExifHeader();
genExifContent();
// genExifFooter();

// genExifHeader();
// genExifContent((error) => {
//   if (error) console.log("error!");
//   else genExifFooter();
// });

// genExifHeader(() => {
//   console.log("header written!");
//   genExifContent(() => {
//     console.log("data & commma written!");
//     genExifFooter(() => {
//       console.log("footer written!");
//     });
//   });
// });

function genExifHeader() {
  // fs.appendFileSync(outFileName, "[");
  fs.writeFileSync(outFileName, "[");
}
function genExifFooter() {
  // fs.appendFileSync(outFileName, "]");
  fs.appendFileSync(outFileName, "]");
}
function genExifConnma() {
  // fs.appendFileSync(outFileName, "]");
  fs.appendFileSync(outFileName, ",");
  // console.log("conmma written!");
}
async function writeExifFile(outFileName, exifData) {
  fs.appendFileSync(outFileName, JSON.stringify(exifData));
}

async function genExifContent() {
  jpegFiles.forEach((file, index) => {
    sharp(file)
      .metadata()
      .then(function (metadata) {
        const readExifData = exif(metadata.exif);
        const exifData = exifModel.ExifData;
        const exifTable = exifModel.ExifTable;

        //FolderNameプロパティをjpegファイル名からセット
        exifModel.setValue(exifData, "FolderName", folderName);

        //FileNameプロパティをjpegファイル名からセット
        exifModel.setValue(exifData, "FileName", path.basename(file));
        //各プロパティをセット
        exifModel.setExifProperty(exifTable, readExifData, exifData);

        // console.log(exifData);

        //jsonファイル出力
        // const wfile = await writeExifFile(outFileName, exifData);
        fs.appendFileSync(outFileName, JSON.stringify(exifData));

        // fs.appendFileSync(outFileName, ",");
        genExifConnma();
      });
  });
}

// genExifHeader().then(function () {
//   genExifContent().then(function () {
//     genExifFooter();
//   });
// });
