//import { roads } from './../../roads';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { nextTick } from 'process';
// import * as AWS from 'aws-sdk';
// import { AWS_ENV } from '../../../environments/environment';

const AWS = require('aws-sdk');
// AWS.config.loadFromPath('./rootkey.json');
// AWS.config.update({ region: 'ap-northeast-1' });
//DEBUG Bucket s-trial-app
var BucketName = 's-trial-app';
// Amazon Cognito 認証情報プロバイダーを初期化します
AWS.config.region = 'ap-northeast-1';
// リージョン
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'ap-northeast-1:2e21f7bd-3084-4ae8-9b31-f75df168af97',
});
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: BucketName },
});
var thumbnailsList = [];

@Injectable()
export class RoadService {
  constructor(private http: HttpClient) {}

  //DEBUG S3
  // getThumbnails = bindNodeCallback(s3.listObjects.bind(s3));
  // getThumbnails = bindNodeCallback(this.getThumbnailsInfo('aaa').bind(s3));
  // s3File(file) {
  //   const params = {
  //     Bucket: 'BUCKET',
  //     Key: 'FOLDER/' + file.name,
  //     Body: file,
  //     ACL: 'public-read',
  //   };
  // }
  //Observableで記述
  getS3Info(folderName, roadId): Observable<Array<Object>> {
    console.log('folderName!', folderName);
    console.log('roadId!', roadId);

    var s3FileList = new Array<Object>();
    var imagePhotosKey = encodeURIComponent(folderName) + '/';

    s3.listObjects({ Prefix: imagePhotosKey }, function (err, data) {
      if (err) {
        return alert('There was an error get image data: ' + err.message);
      }
      // 'this' references the AWS.Response instance that represents the response
      var href = this.request.httpRequest.endpoint.href;
      var bucketUrl = href + BucketName + '/';

      var photos = data.Contents.map(function (photo) {
        var photoKey = photo.Key;
        var photoUrl = bucketUrl + encodeURIComponent(photoKey);
        if (
          photoKey.indexOf(roadId) != -1 &&
          (photoKey.indexOf('jpg') != -1 || photoKey.indexOf('jpeg') != -1)
        ) {
          var array = photoKey.split('/');
          photoKey = array[array.length - 1];
          var imageInfo = { photoKey: photoKey, photoUrl: photoUrl };
          s3FileList.push(imageInfo);
        }
      });
    });
    console.log('s3FileList!', s3FileList);
    return of(s3FileList);
  }

  //Observableで記述
  getImagesInfo(folderName, roadId): Observable<Array<Object>> {
    var s3FileList = new Array<Object>();
    var imagePhotosKey = encodeURIComponent(folderName) + '/';

    s3.listObjects({ Prefix: imagePhotosKey }, function (err, data) {
      if (err) {
        return alert('There was an error get image data: ' + err.message);
      }
      // 'this' references the AWS.Response instance that represents the response
      var href = this.request.httpRequest.endpoint.href;
      var bucketUrl = href + BucketName + '/';

      var photos = data.Contents.map(function (photo) {
        var photoKey = photo.Key;
        var photoUrl = bucketUrl + encodeURIComponent(photoKey);
        if (
          photoKey.indexOf(roadId) != -1 &&
          (photoKey.indexOf('jpg') != -1 || photoKey.indexOf('jpeg') != -1)
        ) {
          var array = photoKey.split('/');
          photoKey = array[array.length - 1];
          var imageInfo = { photoKey: photoKey, photoUrl: photoUrl };
          s3FileList.push(imageInfo);
        }
      });
    });
    console.log('s3FileList!', s3FileList);
    return of(s3FileList);
  }

  //Observableで記述
  getThumbnailsInfo(folderName): Observable<Array<Object>> {
    const s3FileList = new Array<Object>();
    var thumbnailPhotosKey = encodeURIComponent(folderName) + '/';
    s3.listObjects({ Prefix: thumbnailPhotosKey }, function (err, data) {
      if (err) {
        return alert('There was an error get thumbnail data: ' + err.message);
      }
      // 'this' references the AWS.Response instance that represents the response
      var href = this.request.httpRequest.endpoint.href;
      var bucketUrl = href + BucketName + '/';

      var photos = data.Contents.map(function (photo) {
        var photoKey = photo.Key;
        var photoUrl = bucketUrl + encodeURIComponent(photoKey);
        var thumbnails = { photoKey: photoKey, photoUrl: photoUrl };
        s3FileList.push(thumbnails);
      });
    });
    console.log(s3FileList);
    //DEBUG
    // var thumbnailsList = Object.create(s3FileList);
    // var thumbnailsInfo = thumbnailsList.filter(
    //   (item) => item.photoKey.indexOf('Hakone-A1') != -1
    // );
    // var imageNameList = thumbnailsInfo.map((item) => item.photoKey);
    // imageNameList.forEach((data, index) => {
    //   var array = data.split('/');
    //   thumbnailsInfo[index].photoKey = array[array.length - 1];
    // });
    // console.log('S3 thumnailsInfo', thumbnailsInfo);
    // return of(thumbnailsInfo);
    return of(s3FileList);
  }

  //コールバック関数で記述
  getThumbnailsList(folderName, callback) {
    var thumbnailPhotosKey = encodeURIComponent(folderName) + '/';
    s3.listObjects({ Prefix: thumbnailPhotosKey }, function (err, data) {
      if (err) {
        return alert('There was an error get thumbnail data: ' + err.message);
      }
      // 'this' references the AWS.Response instance that represents the response
      var href = this.request.httpRequest.endpoint.href;
      var bucketUrl = href + BucketName + '/';

      var photos = data.Contents.map(function (photo) {
        var photoKey = photo.Key;
        var photoUrl = bucketUrl + encodeURIComponent(photoKey);
        console.log(photoKey);
        console.log(photoUrl);
        var thumbnails = { photoKey: photoKey, phtoUrl: photoUrl };
        thumbnailsList.push(thumbnails);
      });
      callback(err, thumbnailsList);
      // console.log(thumbnailsList, 'thumbnails loaded');
      // next: (response) => {
      //   return thumbnailsList;
      // };
    });
    // return thumbnailsList;
  }

  getRoads(): Observable<any> {
    //return roads;
    return this.http.get('/api/v1/roads');
  }

  getRoadById(roadId: string): Observable<any> {
    // return roads[roadId];
    return this.http.get('/api/v1/roads/' + roadId);
  }
  // //DEBUG
  // getExifs(): Observable<any> {
  //   //return roads;
  //   return this.http.get('/api/v1/exifs');
  // }
  // getExifById(exifId: string): Observable<any> {
  //   // return roads[roadId];
  //   return this.http.get('/api/v1/exifs/' + exifId);
  // }
}
