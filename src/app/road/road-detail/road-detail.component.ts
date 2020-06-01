import { RoadService } from './../shared/road.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-road-detail',
  templateUrl: './road-detail.component.html',
  styleUrls: ['./road-detail.component.scss'],
})
export class RoadDetailComponent implements OnInit {
  road;

  constructor(
    private route: ActivatedRoute,
    private roadService: RoadService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      //this.roadObservable  = this.roadService.getRoadById(params.get('roadId'));

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
