const Road = require("./model/road");

class FakeDb {
  constructor() {
    this.roads = [
      {
        folderId: "Sagamihara-A1",
        coverimg: "./assets/img/norimen_cover.jpg",
        prefecture: "神奈川県",
        area: "相模原",
        roadname: "国道２３４号（仮）",
        members: "B班",
        picturedate: new Date("20 Nov 2019 09:20:00"),
        description: "実験撮影１回目",
        roadImgUrl: "#",
      },
      {
        folderId: "Sagamihara-A2",
        coverimg: "./assets/img/norimen_cover.jpg",
        prefecture: "神奈川県",
        area: "相模原",
        roadname: "県道８９号（仮）",
        members: "A班",
        picturedate: new Date("4 Dec 2019 09:20:00"),
        description: "実験撮影２回目",
        roadImgUrl: "#",
      },
      {
        folderId: "Sagamihara-B2",
        coverimg: "./assets/img/norimen_cover.jpg",
        prefecture: "神奈川県",
        area: "相模原",
        roadname: "山岳道（仮）",
        members: "B班",
        picturedate: new Date("4 Dec 2019 09:20:00"),
        description: "実験撮影２回目",
        roadImgUrl: "#",
      },
      {
        folderId: "Hakone-A1",
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
        folderId: "Hakone-B1",
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
