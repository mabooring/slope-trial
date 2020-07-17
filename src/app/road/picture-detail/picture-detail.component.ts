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
  roadId;
  id;

  constructor(
    private route: ActivatedRoute,
    private roadService: RoadService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.roadId = params.get('roadId'); //Hakone-A1
      this.id = params.get('id'); //P100026.jpg

      // this.pokemon = this.pokemons[id - 1];
      this.pokemon = this.pokemons[3];
    });

    //DEBUG getInfo from S3
    this.roadService.getS3Info('images', this.roadId).subscribe(
      (obj) => {
        this.imagesInfo = Object.create(obj);
      },
      (err) => {
        console.error('thumbnailsでエラーが発生しました： ' + err);
      }
    );
  }
}
