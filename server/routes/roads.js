const express = require("express");
const router = express.Router();
const Road = require("../model/road");
const UserCtrl = require("../controller/user");

router.get("/secret", UserCtrl.authMiddleware, function (req, res) {
  return res.json({ secret: true });
});

router.get("", function (req, res) {
  Road.find({}, function (err, foundRoads) {
    return res.json(foundRoads);
  });
});

router.get("/:roadId", function (req, res) {
  const roadId = req.params.roadId;
  Road.findById(roadId, UserCtrl.authMiddleware, function (err, foundRoad) {
    if (err) {
      return res
        .status(422)
        .send({ errors: [{ title: "Road error", detail: "Road not found" }] });
    }
    return res.json(foundRoad);
  });
});

module.exports = router;
