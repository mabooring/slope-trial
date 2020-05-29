import { Component, OnInit } from '@angular/core';
import { RoadService } from '../shared/road.service';

@Component({
  selector: 'app-road-listings',
  templateUrl: './road-listings.component.html',
  styleUrls: ['./road-listings.component.scss'],
})
export class RoadListComponent implements OnInit {
  roads: any;

  constructor(private RoadService: RoadService) {}

  ngOnInit(): void {
    this.roads = this.RoadService.getRoads();
  }
}
