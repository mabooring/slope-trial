import { POKEMONS } from '../pokemon/pokemons';
import { RoadService } from '../shared/road.service';
import {
  Component,
  OnInit,
  ViewChildren,
  ElementRef,
  QueryList,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as AWS from 'aws-sdk';

//DEBUG S3からThumbnailを取得
var albumBucketName = 's-trial-app';
AWS.config.region = 'ap-northeast-1';
// リージョン
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'ap-northeast-1:2e21f7bd-3084-4ae8-9b31-f75df168af97',
});
// Create a new service object
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: albumBucketName },
});

@Component({
  selector: 'app-picture-listings',
  templateUrl: './picture-listings.component.html',
  styleUrls: ['./picture-listings.component.scss'],
})
export class PictureListComponent implements OnInit {
  road;
  exif;

  //　S3

  //DEBUG サムネイル（仮）でローカルのポケモンを表示
  pokemons = POKEMONS;
  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;

  //DEBUG
  zoom = 16;
  // 東新宿駅の座標
  center: google.maps.LatLngLiteral = {
    lat: 35.697695,
    lng: 139.707354,
  };
  // 地図のオプション
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
  };

  constructor(
    private route: ActivatedRoute,
    private roadService: RoadService
  ) {}

  allCheckboxChecked() {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = true;
    });
  }
  allCheckboxUnChecked() {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const roadObservable = this.roadService.getRoadById(params.get('roadId'));
      roadObservable.subscribe(
        (data) => {
          this.road = data;
        },
        (err) => {
          console.error('次のエラーが発生しました： ' + err);
        }
      );
    });

    this.route.paramMap.subscribe((params) => {
      const exifObservable = this.roadService.getExifById(params.get('exifId'));
      exifObservable.subscribe(
        (data) => {
          this.exif = data;
        },
        (err) => {
          console.error('EXIFで次のエラーが発生しました： ' + err);
        }
      );
    });
  }
}
