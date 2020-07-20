import { RoadService } from './../shared/road.service';
import { POKEMONS } from './../pokemon/pokemons';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mapService } from '../shared/map.service';

@Component({
  selector: 'app-picture-detail',
  templateUrl: './picture-detail.component.html',
  styleUrls: ['./picture-detail.component.scss'],
})
export class PictureDetailComponent implements OnInit {
  pokemons = POKEMONS;
  pokemon;
  imagesInfo;
  exifObj;
  exif;
  photoDate;
  photoModifyDate;

  // =========================
  //Map
  //東京新宿の座標
  // tokyoPostion: google.maps.LatLngLiteral = {
  //   lat: 35.697695,
  //   lng: 139.707354,
  // };
  //海老名駅
  ebinaPosition: google.maps.LatLngLiteral = {
    lat: 35.452617,
    lng: 139.390868,
  };
  map_zoom = 16;
  map_center: google.maps.LatLngLiteral = this.ebinaPosition;
  map_options: google.maps.MapOptions = {
    disableDefaultUI: false,
  };
  //Marker
  markerList = new Array<Object>();
  marker_options: google.maps.MarkerOptions = {
    // animation: google.maps.Animation.DROP,
    // icon: {
    //   url: '../../assets/img/mapicons/blue-dot.png',
    //   scaledSize: new google.maps.Size(32, 32),
    // },
  };
  // =========================

  constructor(
    private route: ActivatedRoute,
    private roadService: RoadService,
    private mapService: mapService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      // this.roadId = params.get('roadId'); //Hakone-A1
      // this.id = params.get('id'); //P100026.jpg

      //DEBUG Exif情報
      const exifObservable = this.roadService.getExifById(
        params.get('roadId'),
        params.get('id')
      );
      exifObservable.subscribe(
        (data) => {
          // this.exif = JSON.stringify(Object.create(data)[0]);
          this.exif = Object.create(data)[0];
          this.photoDate = this.exif.exif.DateTimeOriginal;
          this.photoModifyDate = this.exif.image.ModifyDate;
          console.log('this.exif!', this.exif);
          //DEBUG map
          var fileName = this.exif.FileName;

          var location = {
            lat: {
              degree: this.exif.gps.GPSLatitude[0],
              minute: this.exif.gps.GPSLatitude[1],
              second: this.exif.gps.GPSLatitude[2],
            },
            lng: {
              degree: this.exif.gps.GPSLongitude[0],
              minute: this.exif.gps.GPSLongitude[1],
              second: this.exif.gps.GPSLongitude[2],
            },
          };
          // console.log('Location!!!', location);
          //Degreeフォーマット変換
          var latlng: google.maps.LatLngLiteral = this.mapService.degreeMinuteSecond2Degree(
            location
          );
          var marker = {
            photoKey: fileName,
            selected: true,
            location: latlng,
          };
          this.markerList.push(marker);
          this.map_center = this.mapService.getMapCenter(
            this.markerList,
            this.ebinaPosition
          );
        },
        (err) => {
          console.error('次のエラーが発生しました： ' + err);
        }
      );

      // this.pokemon = this.pokemons[id - 1];
      this.pokemon = this.pokemons[3];
    });

    //DEBUG getInfo from S3
    // this.roadService.getS3Info('images', this.roadId).subscribe(
    //   (obj) => {
    //     this.imagesInfo = Object.create(obj);
    //   },
    //   (err) => {
    //     console.error('imagesでエラーが発生しました： ' + err);
    //   }
    // );
    this.route.paramMap.subscribe((params) => {
      this.roadService.getS3Info('images', params.get('id')).subscribe(
        (obj) => {
          this.imagesInfo = Object.create(obj);
          console.log('Image Info!', this.imagesInfo);
        },
        (err) => {
          console.error('imagesでエラーが発生しました： ' + err);
        }
      );
    });
  }
}
