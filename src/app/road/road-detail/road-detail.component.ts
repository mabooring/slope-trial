import { POKEMONS } from './../pokemon/pokemons';
import { RoadService } from './../shared/road.service';
import {
  Component,
  OnInit,
  ViewChildren,
  ElementRef,
  QueryList,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-road-detail',
  templateUrl: './road-detail.component.html',
  styleUrls: ['./road-detail.component.scss'],
})
export class RoadDetailComponent implements OnInit {
  road;
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
  }
}
