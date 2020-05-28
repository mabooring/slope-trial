import { roads } from './../../roads';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-road-listings',
  templateUrl: './road-listings.component.html',
  styleUrls: ['./road-listings.component.scss'],
})
export class RoadListComponent implements OnInit {
  roads: any;

  constructor() {}

  ngOnInit(): void {
    this.roads = roads;
  }
}
