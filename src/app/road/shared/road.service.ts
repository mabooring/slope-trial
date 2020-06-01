//import { roads } from './../../roads';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RoadService {
  constructor(private http: HttpClient) {}

  getRoads(): Observable<any> {
    //return roads;
    return this.http.get('/api/v1/roads');
  }

  getRoadById(roadId: string): Observable<any> {
    // return roads[roadId];
    return this.http.get('/api/v1/roads/' + roadId);
  }
}
