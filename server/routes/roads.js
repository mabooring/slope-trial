const express = require("express");
const router = express.Router();
const Road = require("../model/road");

router.get("", function (req, res) {
  Road.find({}, function (err, foundRoads) {
    return res.json(foundRoads);
  });
});

router.get("/:roadId", function (req, res) {
  const roadId = req.params.roadId;
  Road.findById(roadId, function (err, foundRoad) {
    if (err) {
      return res
        .status(422)
        .send({ errors: [{ title: "Road error", detail: "Road not found" }] });
    }
    return res.json(foundRoad);
  });
});

module.exports = router;
