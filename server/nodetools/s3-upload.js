// 参考URL
//docs.aws.amazon.com/ja_jp/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html

const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

// ###### 走らせ方
// node s3_upload.js BUCKET_NAME FILE_NAME

// Upload something into it
AWS.config.loadFromPath("./rootkey.json");
AWS.config.update({ region: "ap-northeast-1" });

// Create S3 service object
s3 = new AWS.S3();

// フォルダーのファイルリストを取得
// アップロードしたい親フォルダーを指定
const folderName = "/Volumes/SSD256/DATA/S3_Upload_Data/thumbnails";

//全階層のファイルを２次元配列で取得
const _getAllFilesFromFolder = function (dir) {
  const results = [];

  fs.readdirSync(dir).forEach(function (file) {
    file = dir + "/" + file;
    const stat = fs.statSync(file); //ファイルの存在チェック

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
const uploadFiles = _getFilesFromFolder(folderName);

// call S3 to retrieve upload file to specified bucket
const uploadParams = { Bucket: process.argv[2], Key: "", Body: "" };

// Configure the file stream and obtain the upload parameters
for (const i in uploadFiles) {
  const file = uploadFiles[i];
  console.log(uploadFiles[i]);

  const fileStream = fs.createReadStream(file);
  fileStream.on("error", function (err) {
    console.log("File Error", err);
  });
  uploadParams.Body = fileStream;
  uploadParams.Key = path.basename(file);

  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, function (err, data) {
    if (err) {
      console.log("エラー", err.stack);
    } else {
      console.log("Success Upload!!", data);
    }
  });
}
