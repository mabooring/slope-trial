const express = require("express");
const router = express.Router();
const Road = require("../model/road");
const Exif = require("../model/exif");
const UserCtrl = require("../controllers/user");

//DEBUG(postman用)
// router.get("/secret", UserCtrl.authMiddleware, function (req, res) {
//   return res.json({ secret: true });
// });

//DEBUG
router.get("", function (req, res) {
  Road.find({}, function (err, foundRoads) {
    return res.json(foundRoads);
  });
});

// // DEBUG Exifのgetと共存できない？エラーが出る。
// router.get("/:roadId", UserCtrl.authMiddleware, function (req, res) {
//   const roadId = req.params.roadId;

//   //DEBUG
//   //Road.findById(roadId, UserCtrl.authMiddleware, function (err, foundRoad) {
//   Road.findById(roadId, function (err, foundRoad) {
//     if (err) {
//       return res
//         .status(422)
//         .send({ errors: [{ title: "Road error", detail: "Road not found" }] });
//     }
//     return res.json(foundRoad);
//   });
// });

//DEBUG Hakene-A1でHakone−A1フォルダー名のjsonデータを返す
router.get("/:folderId", UserCtrl.authMiddleware, function (req, res) {
  const folderId = req.params.folderId;

  //DEBUG
  // Exif.findById(folderId, function (err, foundExif) {
  //   if (err) {
  //     return res
  //       .status(422)
  //       .send({ errors: [{ title: "Exif error", detail: "Exif not found" }] });
  //   }
  //   return res.json(foundExif);
  // });

  Exif.find({}, function (err, foundExifs) {
    return res.json(foundExifs);
  });
});

module.exports = router;
