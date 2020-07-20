const express = require("express");
const router = express.Router();
const Road = require("../model/road");
const Exif = require("../model/exif");
const UserCtrl = require("../controllers/user");

//DEBUG(postman用)
// router.get("/secret", UserCtrl.authMiddleware, function (req, res) {
//   return res.json({ secret: true });
// });

router.get("", function (req, res) {
  Road.find({}, function (err, foundRoads) {
    return res.json(foundRoads);
  });
});

//DEBUG
// /Hakene-A1で、Exifのリストデータを返す
router.get("/:folderId", UserCtrl.authMiddleware, function (req, res) {
  // router.get("/:folderId", UserCtrl.authMiddleware, function (req, res) {
  const folderId = req.params.folderId;

  // Exif.find({ FolderName: folderId }, function (err, foundExifs) {
  Exif.find({ FolderName: folderId }, function (err, foundExifs) {
    if (err) {
      return res
        .status(422)
        .send({ errors: [{ title: "Exif error", detail: "Exif not found" }] });
    }
    return res.json(foundExifs);
  });
});

// // /Hakene-A1で、roadデータを返す
// router.get("/:roadId", UserCtrl.authMiddleware, function (req, res) {
//   const roadId = req.params.roadId;

//   Road.find({ folderId: roadId }, function (err, foundRoad) {
//     if (err) {
//       return res
//         .status(422)
//         .send({ errors: [{ title: "Road error", detail: "Road not found" }] });
//     }
//     return res.json(foundRoad);
//   });
// });

//DEBUG /Hakene-A1で、roadデータを返す
// router.get("/:roadId", UserCtrl.authMiddleware, function (req, res) {
//   const roadId = req.params.roadId;

//   var roadData;
//   var exifData;

//   //Roadデータ
//   Road.find({ folderId: roadId }, function (err, foundRoad) {
//     if (err) {
//       return res
//         .status(422)
//         .send({ errors: [{ title: "Road error", detail: "Road not found" }] });
//     }
//     roadData = res.json(foundRoad);
//   });
//   //ExifData
//   Exif.find({ FolderName: roadId }, function (err, foundExifs) {
//     if (err) {
//       return res
//         .status(422)
//         .send({ errors: [{ title: "Exif error", detail: "Exif not found" }] });
//     }
//     exifData = res.json(foundExifs);
//   });
//   return exifData;
// });

// /Hakene-A1/jpgファイルで、Exifデータを返す
router.get("/:folderId/:id", UserCtrl.authMiddleware, function (req, res) {
  const folderId = req.params.folderId;
  const id = req.params.id;

  Exif.find({ FolderName: folderId, FileName: id }, function (err, foundExifs) {
    if (err) {
      return res
        .status(422)
        .send({ errors: [{ title: "Exif error", detail: "Exif not found" }] });
    }
    return res.json(foundExifs);
  });
});

// /Hakene-A1ファイルで、Exifデータを返す
router.get("/:folderId/roadExifs/gps", UserCtrl.authMiddleware, function (
  req,
  res
) {
  const folderId = req.params.folderId;

  // Exif.find({ FolderName: folderId }, function (err, foundExifs) {
  Exif.find({ FolderName: folderId }, function (err, foundExifs) {
    if (err) {
      return res
        .status(422)
        .send({ errors: [{ title: "Exif error", detail: "Exif not found" }] });
    }
    return res.json(foundExifs);
  });
});

module.exports = router;
