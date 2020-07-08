class ExifData {
  constructor() {
    obj = {
      FileName: "Sample",
      image: {
        Make: "Ricoh",
        Model: "GRIII",
        // Orientation: number,
        // XResolution: number,
        // YResolution: number,
        // ModifyDate: date,
      },
      //   exif: {
      //     ExposureTime: number,
      //     Fnumber: number,
      //     ISO: number,
      //     DateTimeOriginal: date,
      //     DateTimeDigitized: date,
      //     MaxApertureValue: number,
      //     WhiteBalance: number,
      //     DigitalZoomRatio: number,
      //     MaxApertureValue: number,
      // },
      gps: {
        GPSLatitudeRef: "",
        GPSLatitude: [],
        GPSLongitudeRef: "",
        GPSLongitude: [],
        // GPSAltitudeRef: number,
        // GPSAltitude: number,
        // GPSTimeStamp: [],
        // GPSSpeedRef: string,
        // GPSSpeed: number,
        // GPSImgDirectionRef: string,
        // GPSImgDirection: number,
        // GPSMapDatum: string,
        // GPSDateStamp: date,
      },
    };
  }
}

module.exports = ExifData.obj;
