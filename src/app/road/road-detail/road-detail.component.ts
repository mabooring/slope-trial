import { roads } from './../../roads';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-road-detail',
  templateUrl: './road-detail.component.html',
  styleUrls: ['./road-detail.component.scss'],
})
export class RoadDetailComponent implements OnInit {
  road;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.road = roads[+params.get('roadId')];
    });
  }
}
