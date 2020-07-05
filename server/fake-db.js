const Road = require("./model/road");

class FakeDb {
  constructor() {
    this.roads = [
      {
        coverimg: "./assets/img/norimen_cover.jpg",
        prefecture: "神奈川県",
        area: "箱根",
        roadname: "県道１号（仮）",
        members: "A班",
        picturedate: new Date("11 Dec 2019 09:20:00"),
        description: "実験撮影１回目",
        roadImgUrl: "#",
      },
      {
        coverimg: "./assets/img/norimen_cover.jpg",
        prefecture: "神奈川県",
        area: "箱根",
        roadname: "県道２号（仮）",
        members: "B班",
        picturedate: new Date("12 Dec 2019 09:20:00"),
        description: "実験撮影１回目",
        roadImgUrl: "#",
      },
    ];
  }

  async initDb() {
    await this.cleanDb();
    this.pushRoadsToDb();
  }

  async cleanDb() {
    await Road.deleteMany({});
  }

  pushRoadsToDb() {
    this.roads.forEach((road) => {
      const newRoad = new Road(road);
      newRoad.save();
    });
  }

  seeDb() {
    this.pushRoadsToDb();
  }
}

module.exports = FakeDb;
