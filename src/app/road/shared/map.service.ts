import { filter } from 'rxjs/operators';
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
export class mapService {
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

  getMarkerLocation(fileName, roadExifs) {
    // console.log('fileNmae!!!', fileName);
    // console.log('roadExifs!!!', roadExifs);
    console.log('loadExifs Length!', roadExifs.length);
    var jsonRoadExifs = JSON.stringify(roadExifs);
    var parsedRoadExifs = JSON.parse(jsonRoadExifs);
    var matchLocation;
    if (roadExifs.length == 1) {
      matchLocation = parsedRoadExifs;
    } else {
      var matchLocation = parsedRoadExifs.filter(function (item, index) {
        if (item.FileName == fileName) {
          // console.log('Json Matched!!!');
          return true;
        }
      });
    }

    var location: PointInDMS = {
      lat: {
        degree: matchLocation[0].gps.GPSLatitude[0],
        minute: matchLocation[0].gps.GPSLatitude[1],
        second: matchLocation[0].gps.GPSLatitude[2],
      },
      lng: {
        degree: matchLocation[0].gps.GPSLongitude[0],
        minute: matchLocation[0].gps.GPSLongitude[1],
        second: matchLocation[0].gps.GPSLongitude[2],
      },
    };
    // console.log('Location!!!', location);
    const deg: PointInDegree = this.degreeMinuteSecond2Degree(location);
    // console.log('Degree!!!', deg);
    return deg;
  }

  getMapCenter(markerList, defaultPosition) {
    // console.log('fileNmae!!!', fileName);
    console.log('markerList!!!', markerList);
    //. 比較関数
    function compare(a, b) {
      var r = 0;
      if (a.age < b.age) {
        r = -1;
      } else if (a.age > b.age) {
        r = 1;
      }
      return r;
    }

    var center_position: google.maps.LatLngLiteral;
    // if (Object.keys(markerList['location'] !== 0)) {
    if (Object.keys(markerList.length !== 0)) {
      var jsonMarkerList = JSON.stringify(markerList);
      var parsedMarkerList = JSON.parse(jsonMarkerList);
      var sortedLocation = parsedMarkerList.sort(compare);
      var center_index = Math.floor(sortedLocation.length / 2);
      console.log('center_index!', center_index);
      console.log(
        'markerList[center_index].location!',
        markerList[center_index].location
      );
      center_position = markerList[center_index].location;
    } else {
      center_position = defaultPosition;
    }
    console.log('center_position!', center_position);
    return center_position;
    // return default_postion;
  }
}
