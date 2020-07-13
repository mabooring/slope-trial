//import { roads } from './../../roads';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// const AWS = require('aws-sdk');
// const fs = require('fs');
// const path = require('path');
// AWS.config.loadFromPath('./rootkey.json');
// AWS.config.update({ region: 'ap-northeast-1' });

@Injectable()
export class RoadService {
  constructor(private http: HttpClient) {}

  // Upload something into it

  //DEBUG
  getExifs(): Observable<any> {
    //return roads;
    return this.http.get('/api/v1/exifs');
  }
  getExifById(exifId: string): Observable<any> {
    // return roads[roadId];
    return this.http.get('/api/v1/exifs/' + exifId);
  }

  getRoads(): Observable<any> {
    //return roads;
    return this.http.get('/api/v1/roads');
  }

  getRoadById(roadId: string): Observable<any> {
    // return roads[roadId];
    return this.http.get('/api/v1/roads/' + roadId);
  }
}
