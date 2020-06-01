const Road = require("./model/road");

class FakeDb {
  constructor() {
    this.roads = [
      {
        coverimg: "./assets/img/norimen_cover.jpg",
        location: "相模原",
        name: "国道１号",
        description: "rankC 道幅狭い",
        heading1: "ヘッディング１",
        heading2: "ヘッディング２",
        heading3: "ヘッディング３",
        headingtext1:
          "サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１",
        headingtext2:
          "ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２",
        headingtext3:
          "Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestaseget quam.Vestibulum id ligula porta felis euismod semper.Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
        roadImgUrl: "#",
      },
      {
        coverimg: "./assets/img/norimen_cover.jpg",
        location: "宮ヶ瀬",
        name: "県道２３４号",
        description: "rankB モルタル損傷多し",
        heading1: "ヘッディング１",
        heading2: "ヘッディング２",
        heading3: "ヘッディング３",
        headingtext1:
          "サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１",
        headingtext2:
          "ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２",
        headingtext3:
          "Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestaseget quam.Vestibulum id ligula porta felis euismod semper.Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
        roadImgUrl: "#",
      },

      {
        coverimg: "./assets/img/norimen_cover.jpg",
        location: "宮崎県道",
        name: "県道５６号",
        description: "損傷多く　補修が必要　法面の高さ高い",
        heading1: "ヘッディング１",
        heading2: "ヘッディング２",
        heading3: "ヘッディング３",
        headingtext1:
          "サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１",
        headingtext2:
          "ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２",
        headingtext3:
          "Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestaseget quam.Vestibulum id ligula porta felis euismod semper.Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
        roadImgUrl: "#",
      },

      {
        coverimg: "./assets/img/norimen_cover.jpg",
        location: "兵庫県道",
        name: "県道７８号",
        description: "損傷多く　補修が必要　法面の高さ高い",
        heading1: "ヘッディング１",
        heading2: "ヘッディング２",
        heading3: "ヘッディング３",
        headingtext1:
          "サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１　サンプル文章１",
        headingtext2:
          "ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２　ヘッディング文章２",
        headingtext3:
          "Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestaseget quam.Vestibulum id ligula porta felis euismod semper.Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
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
