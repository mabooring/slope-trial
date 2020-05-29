const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/dev");
const FakeDb = require("./fake-db");

const roadRoutes = require("./routes/roads");

mongoose
  .connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const fakeDb = new FakeDb();
    fakeDb.initDb();
  });

const app = express();
app.use("/api/v1/roads", roadRoutes);

const PORT = process.env.PORT || "3001";

app.listen(PORT, function () {
  console.log("I am running!");
});
