const express = require("express");
const router = express.Router();
const Exif = require("../model/exif");
const UserCtrl = require("../controllers/user");

//DEBUG(postman用)
// router.get("/secret", UserCtrl.authMiddleware, function (req, res) {
//   return res.json({ secret: true });
// });

// router.get("", function (req, res) {
//   Exif.find({}, function (err, foundExifs) {
//     return res.json(foundExifs);
//   });
// });

// router.get("/:roadId", UserCtrl.authMiddleware, function (req, res) {
//   const exifId = req.params.exifId;

//   //DEBUG
//   //Road.findById(roadId, UserCtrl.authMiddleware, function (err, foundRoad) {
//   Exif.findById(roadId, function (err, foundExif) {
//     if (err) {
//       return res
//         .status(422)
//         .send({ errors: [{ title: "Exif error", detail: "Exif not found" }] });
//     }
//     return res.json(foundExif);
//   });
// });

module.exports = router;
