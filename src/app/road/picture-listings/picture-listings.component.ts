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
import { BehaviorSubject } from 'rxjs';
import { LatLngTransService } from '../shared/latlng.service';

// import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-picture-listings',
  templateUrl: './picture-listings.component.html',
  styleUrls: ['./picture-listings.component.scss'],
})
export class PictureListComponent implements OnInit {
  road;
  thumbnailsInfo;
  folderName;
  coverPhoto = '../../assets/img/cover_proto_mod.jpg';

  //　S3
  //DEBUG サムネイル（仮）でローカルのポケモンを表示
  pokemons = POKEMONS;
  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;

  //DEBUG Map
  // ============================
  zoom = 16;
  // 東新宿駅の座標
  pointData = {
    lat: { degree: 35, minute: 10, second: 14.750831946755408 },
    lng: { degree: 139, minute: 4, second: 3.843912007846434 },
  };
  center: google.maps.LatLngLiteral = this.latLngTransService.degreeMinuteSecond2Degree(
    this.pointData
  );
  // 地図のオプション
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
  };

  // 現在位置マーカーの座標
  // private latLngTransService: LatLngTransService
  currentPosition: google.maps.LatLngLiteral = this.latLngTransService.degreeMinuteSecond2Degree(
    this.pointData
  );

  // 現在位置マーカーのオプション
  currentPositionMarkerOption: google.maps.MarkerOptions = {
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
    private latLngTransService: LatLngTransService
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
    // this.latLngTransService.transToDgree();

    this.route.paramMap.subscribe((params) => {
      this.folderName = params.get('roadId');
      const roadObservable = this.roadService.getRoadById(params.get('roadId'));
      roadObservable.subscribe(
        (data) => {
          this.road = data[0];
          console.log('this.road!!', this.road);
          console.log('road.area!!', this.road.area);
        },
        (err) => {
          console.error('次のエラーが発生しました： ' + err);
        }
      );
    });
    //DEBUG getInfo from S3
    this.roadService.getS3Info('thumbnails', this.folderName).subscribe(
      (obj) => {
        this.thumbnailsInfo = Object.create(obj);
        console.log('thumbnailsInfo!', this.thumbnailsInfo);
      },
      (err) => {
        console.error('thumbnailsでエラーが発生しました： ' + err);
      }
    );
  }
}
