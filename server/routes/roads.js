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

// /Hakene-A1で、roadデータを返す
router.get("/:roadId", UserCtrl.authMiddleware, function (req, res) {
  const roadId = req.params.roadId;

  Road.find({ folderId: roadId }, function (err, foundRoad) {
    if (err) {
      return res
        .status(422)
        .send({ errors: [{ title: "Road error", detail: "Road not found" }] });
    }
    return res.json(foundRoad);
  });
});

// /Hakene-A1/jpgファイルで、Exifデータを返す
router.get("/:folderId/:id", UserCtrl.authMiddleware, function (req, res) {
  // router.get("/:folderId", UserCtrl.authMiddleware, function (req, res) {
  const folderId = req.params.folderId;
  const id = req.params.id;

  // Exif.findById(folderId, function (err, foundExif) {
  //   if (err) {
  //     return res
  //       .status(422)
  //       .send({ errors: [{ title: "Exif error", detail: "Exif not found" }] });
  //   }
  //   return res.json(foundExif);
  // });

  Exif.find({ FolderName: folderId, FileName: id }, function (err, foundExifs) {
    if (err) {
      return res
        .status(422)
        .send({ errors: [{ title: "Exif error", detail: "Exif not found" }] });
    }
    return res.json(foundExifs);
  });
});

module.exports = router;
