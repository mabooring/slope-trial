import { Component, OnInit } from '@angular/core';
import { RoadService } from '../shared/road.service';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-road-listings',
  templateUrl: './road-listings.component.html',
  styleUrls: ['./road-listings.component.scss'],
})
export class RoadListComponent implements OnInit {
  roads: any;

  constructor(private RoadService: RoadService) {}

  ngOnInit(): void {
    //this.roads = this.RoadService.getRoads();
    const roadsObservable = this.RoadService.getRoads();
    roadsObservable.subscribe(
      (data) => {
        this.roads = data;
      },
      (err) => {
        console.error('次のエラーが発生しました： ' + err);
      }
    );

    // const observable = new Observable((subscriber) => {
    //   subscriber.next(1);
    //   subscriber.next(2);
    //   subscriber.error('エラー発生');
    //   setTimeout(() => {
    //     subscriber.next(4);
    //     subscriber.complete();
    //   }, 1000);
    // });

    // console.log('subscribe前です');
    // observable.subscribe({
    //   next(x) {
    //     console.log('次のデータが出力されました： ' + x);
    //   },
    //   error(err) {
    //     console.error('次のエラーが発生しました： ' + err);
    //   },
    //   complete() {
    //     console.log('完了しました！');
    //   },
    // });
    // console.log('subscribeから抜けました');
  }
}
