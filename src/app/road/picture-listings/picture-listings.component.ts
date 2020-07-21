// import { POKEMONS } from '../pokemon/pokemons';
import { RoadService } from '../shared/road.service';
import {
  Component,
  OnInit,
  ViewChildren,
  ElementRef,
  QueryList,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mapService } from '../shared/map.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { ExecFileOptions } from 'child_process';

@Component({
  selector: 'app-picture-listings',
  templateUrl: './picture-listings.component.html',
  styleUrls: ['./picture-listings.component.scss'],
})
export class PictureListComponent implements OnInit {
  road;

  folderName;
  coverPhoto = '../../assets/img/cover_proto_mod.jpg';
  thumbnailsInfo;
  roadExifs;

  form: FormGroup;

  //DEBUG サムネイル（仮）でローカルのポケモンを表示
  // pokemons = POKEMONS;
  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;

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
    private mapService: mapService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      markerList: this.formBuilder.array([], [Validators.required]),
    });
  }

  onCheckboxChange(e) {
    const markerList: FormArray = this.form.get('makerList') as FormArray;
    var fileName = e.target.value;
    if (e.target.checked) {
      var latlng: google.maps.LatLngLiteral = this.mapService.getMarkerLocation(
        fileName,
        this.roadExifs
      );
      var marker = {
        photoKey: e.target.value,
        selected: true,
        location: latlng,
      };
      this.markerList.push(marker);
      this.map_center = this.mapService.getMapCenter(
        this.markerList,
        this.ebinaPosition
      );
    } else {
      console.log('unchecked!');
      for (let i = 0; i < this.markerList.length; i++) {
        if (this.markerList[i]['photoKey'] === fileName) {
          this.markerList.splice(i, 1); //要素を１つ削除
        }
      }
      this.map_center = this.mapService.getMapCenter(
        this.markerList,
        this.ebinaPosition
      );
    }
    console.log('markerList!!', this.markerList);
  }

  showMakerListToMap() {
    console.log(this.form.value);
  }

  allCheckboxChecked() {
    console.log('All Checked!!');
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = true;
    });
    this.markerList.splice(0, this.markerList.length); //一旦全要素を削除
    //全要素を追加
    for (let i = 0; i < this.roadExifs.length; i++) {
      var fileName = this.roadExifs[i]['FileName'];
      var latlng = this.mapService.getMarkerLocation(fileName, this.roadExifs);
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
    }
    console.log('markerList!!', this.markerList);
  }
  allCheckboxUnChecked() {
    console.log('All UnChecked!!');
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.markerList.splice(0, this.markerList.length); //全要素を削除
    console.log('markerList!!', this.markerList);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.folderName = params.get('roadId');
    });

    //localStrageのroadsデータからroadを取得
    var roads = JSON.parse(localStorage.getItem('roads-data'));
    this.road = roads.find((v) => v.folderId === this.folderName);
    console.log('this.road!', this.road);

    // //DEBUG Road情報表示
    // this.route.paramMap.subscribe((params) => {
    //   this.folderName = params.get('roadId');
    //   const roadObservable = this.roadService.getRoadById(params.get('roadId'));
    //   roadObservable.subscribe(
    //     (data) => {
    //       this.road = data[0];
    //       console.log('this.road!!', this.road);
    //       // console.log('road.area!!', this.road.area);
    //     },
    //     (err) => {
    //       console.error('次のエラーが発生しました： ' + err);
    //     }
    //   );
    // });

    // //DEBUG Exif情報
    // this.route.paramMap.subscribe((params) => {
    //   const exifObservable = this.roadService.getExifListById(
    //     params.get('roadId')
    //   );
    //   exifObservable.subscribe(
    //     (data) => {
    //       this.road = data[0];
    //       console.log('this.road!', this.road);
    //     },
    //     (err) => {
    //       console.error('次のエラーが発生しました： ' + err);
    //     }
    //   );
    // });

    //get roadExifs
    this.route.paramMap.subscribe((params) => {
      const exifsObservable = this.roadService.getroadExifsById(
        params.get('roadId')
      );
      exifsObservable.subscribe(
        (data) => {
          this.roadExifs = data;
          console.log('road exifs!', this.roadExifs);
        },
        (err) => {
          console.error('次のエラーが発生しました： ' + err);
        }
      );
    });

    //getInfo from S3

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
