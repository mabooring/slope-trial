const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const FakeDb = require("./fake-db");
const ExifDb = require("./exif-db");

const roadRoutes = require("./routes/roads");
const userRoutes = require("./routes/users");
const exifRoutes = require("./routes/exifs");
const path = require("path");

mongoose
  .connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    //本番環境では、DBの初期化はしては行けないので
    if (process.env.NODE_ENV !== "production") {
      const fakeDb = new FakeDb();
      const exifDb = new ExifDb();
      //開発環境で必要なときのみコメントを外して初期化を行う
      //fakeDb.initDb();
      // exifDb.initDb();
    }
  });

const app = express();
app.use(bodyParser.json());

//DEBUG
app.use("/api/v1/roads", roadRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/roads", exifRoutes);

if (process.env.NODE_ENV === "production") {
  const appPath = path.join(__dirname, "..", "dist", "slope-traial");
  app.use(express.static(appPath));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(appPath, "index.html"));
  });
}

const PORT = process.env.PORT || "3001";

app.listen(PORT, function () {
  console.log("I am running!");
});
