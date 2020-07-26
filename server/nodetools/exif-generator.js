// 参考URL
//docs.aws.amazon.com/ja_jp/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const exif = require("exif-reader");
const ExifModel = require("./exif-model");

/*################################
  exifファイル生成
  使い方：
  >node exif-generator.js
  その後　ファイルの最初と最後に[]を書き込む
################################*/

var exifModel = new ExifModel();
// 親フォルダーからのファイルリストを取得
var folderPath =
  // "/Volumes/SSD256/DATA/download/s-trial-test-images/images/Hakone-A1";
  "/Volumes/SSD256/DATA/download/s-trial-test-images/images";

// フォルダー名を取得
const pathPart = folderPath.split("/");
const folderName = pathPart[pathPart.length - 1];

const jpegFiles = exifModel.getAllFilesFromFolder(folderPath);
console.log("jpegFiles", jpegFiles);

//出力ファイル名
const outFileName = "jsonresults" + "/" + folderName + ".json";
fs.unlink(outFileName, (err) => {});
console.log("%sをファイル出力しました", outFileName);

//ファイル出力
// genExifHeader();
genExifContent();
// genExifFooter();

function genExifHeader() {
  // fs.writeFileSync(outFileName, "[");
  fs.writeFileSync(outFileName, "[", (err) => {
    if (err) console.log(`error!::${err}`);
  });
}
function genExifFooter() {
  // fs.appendFileSync(outFileName, "]");
  fs.appendFileSync(outFileName, "]", (err) => {
    if (err) console.log(`error!::${err}`);
  });
}
function genExifConnma() {
  // fs.appendFileSync(outFileName, ",");
  fs.appendFileSync(outFileName, ",", (err) => {
    if (err) console.log(`error!::${err}`);
  });
}

function genExifContent() {
  jpegFiles.forEach((file, index) => {
    sharp(file)
      .metadata()
      .then(async function (metadata) {
        const readExifData = exif(metadata.exif);
        const exifData = exifModel.ExifData;
        const exifTable = exifModel.ExifTable;

        //FolderNameプロパティをjpegファイル名からセット
        exifModel.setValue(exifData, "FolderName", folderName);

        //FileNameプロパティをjpegファイル名からセット
        exifModel.setValue(exifData, "FileName", path.basename(file));
        //各プロパティをセット
        exifModel.setExifProperty(exifTable, readExifData, exifData);

        //jsonファイル出力
        // const wfile = await writeExifFile(outFileName, exifData);
        fs.appendFileSync(outFileName, JSON.stringify(exifData), (err) => {
          if (err) console.log(`error!::${err}`);
        });

        // fs.appendFileSync(outFileName, ",");
        genExifConnma();
      });
  });
}
