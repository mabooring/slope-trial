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

  constructor(
    private route: ActivatedRoute,
    private roadService: RoadService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((map) => {
      const id = +map.get('id');
      this.pokemon = this.pokemons[id - 1];
    });
  }
}
