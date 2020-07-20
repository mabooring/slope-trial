import { RoadService } from './../shared/road.service';
import { POKEMONS } from './../pokemon/pokemons';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-picture-detail',
  templateUrl: './picture-detail.component.html',
  styleUrls: ['./picture-detail.component.scss'],
})
export class PictureDetailComponent implements OnInit {
  pokemons = POKEMONS;
  pokemon;
  imagesInfo;
  exifObj;
  exif;
  photoDate;
  photoModifyDate;

  constructor(
    private route: ActivatedRoute,
    private roadService: RoadService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      // this.roadId = params.get('roadId'); //Hakone-A1
      // this.id = params.get('id'); //P100026.jpg

      //DEBUG Exif情報
      const exifObservable = this.roadService.getExifById(
        params.get('roadId'),
        params.get('id')
      );
      exifObservable.subscribe(
        (data) => {
          // this.exif = JSON.stringify(Object.create(data)[0]);
          this.exif = Object.create(data)[0];
          this.photoDate = this.exif.exif.DateTimeOriginal;
          this.photoModifyDate = this.exif.image.ModifyDate;
          console.log('this.exif!', this.exif);
        },
        (err) => {
          console.error('次のエラーが発生しました： ' + err);
        }
      );

      // this.pokemon = this.pokemons[id - 1];
      this.pokemon = this.pokemons[3];
    });

    //DEBUG getInfo from S3
    // this.roadService.getS3Info('images', this.roadId).subscribe(
    //   (obj) => {
    //     this.imagesInfo = Object.create(obj);
    //   },
    //   (err) => {
    //     console.error('imagesでエラーが発生しました： ' + err);
    //   }
    // );
    this.route.paramMap.subscribe((params) => {
      this.roadService.getS3Info('images', params.get('id')).subscribe(
        (obj) => {
          this.imagesInfo = Object.create(obj);
          console.log('Image Info!', this.imagesInfo);
        },
        (err) => {
          console.error('imagesでエラーが発生しました： ' + err);
        }
      );
    });
  }
}
