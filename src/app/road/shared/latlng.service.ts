import { Injectable } from '@angular/core';
import { posix } from 'path';

interface PointInDMS {
  lat: DMS;
  lng: DMS;
}

interface PointInDegree {
  lat: number;
  lng: number;
}

interface DMS {
  degree: number;
  minute: number;
  second: number;
}

@Injectable()
export class LatLngTransService {
  constructor() {}

  degreeMinuteSecond2Degree = (pointInDMS: PointInDMS): PointInDegree => {
    return {
      lat:
        pointInDMS.lat.degree +
        pointInDMS.lat.minute / 60 +
        pointInDMS.lat.second / 60 / 60,

      lng:
        pointInDMS.lng.degree +
        pointInDMS.lng.minute / 60 +
        pointInDMS.lng.second / 60 / 60,
    };
  };

  transToDgree() {
    // 東京
    const tokyoPoint: PointInDMS = {
      lat: { degree: 35, minute: 10, second: 14.750831946755408 },
      lng: { degree: 139, minute: 4, second: 3.843912007846434 },
    };
    console.log({ tokyoPoint });

    const deg: PointInDegree = this.degreeMinuteSecond2Degree(tokyoPoint);
    console.log({ deg });
  }
}
