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
// import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-picture-listings',
  templateUrl: './picture-listings.component.html',
  styleUrls: ['./picture-listings.component.scss'],
})
export class PictureListComponent implements OnInit {
  road;
  exif;
  thumbnailsList;

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

    // //DEBUG BehaviorSubject
    // this.thumbnailsSubject = new BehaviorSubject<object[]>([]);

    this.roadService.getThumbnailsInfo('thumbnails').subscribe((obj) => {
      this.thumbnailsList = obj;
      console.log('ここ');
      console.log(this.thumbnailsList);
      debugger;
    });

    // this.roadService.getThumbnailsList('thumbnails', function (err, data) {
    //   if (err) {
    //     console.log('get thumbnailsList err!');
    //   }
    //   if (data) {
    //   //   // this.thumbnailsList = data;
    //   //   // console.log(this.thumbnailsList);
    //     var thumbnailsList = data;
    //     console.log(data);
    //   }
    //   this.thumbnailsSubject.subscribe((data) => {
    //     this.tumbnailInfo = data;
    //     console.log(this.tumbnailInfo);
    //     debugger;
    //   });
    // });

    // this.route.paramMap.subscribe((params) => {
    //   const exifObservable = this.roadService.getExifById(params.get('exifId'));
    //   exifObservable.subscribe(
    //     (data) => {
    //       this.exif = data;
    //     },
    //     (err) => {
    //       console.error('EXIFで次のエラーが発生しました： ' + err);
    //     }
    //   );
    // });

    //DEBUG
  }
}
