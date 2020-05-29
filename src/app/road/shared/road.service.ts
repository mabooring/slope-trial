import { roads } from './../../roads';
import { Injectable } from '@angular/core';

@Injectable()
export class RoadService {
  getRoads() {
    return roads;
  }

  getRoadById(roadId: number) {
    return roads[roadId];
  }
}
