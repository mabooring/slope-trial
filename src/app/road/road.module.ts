// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './../auth/shared/auth.guard';
import { RoadComponent } from './road.component';
import { PictureDetailComponent } from './picture-detail/picture-detail.component';
import { PictureListComponent } from './picture-listings/picture-listings.component';
import { RoadListComponent } from './road-listings/road-listings.component';

import { mapService } from './shared/map.service';
import { RoadService } from './shared/road.service';

const routes: Routes = [
  {
    path: 'roads',
    component: RoadComponent,
    children: [
      { path: '', component: RoadListComponent },
      {
        path: ':roadId',
        component: PictureListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':roadId/:id',
        component: PictureDetailComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    RoadComponent,
    RoadListComponent,
    PictureListComponent,
    PictureDetailComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    GoogleMapsModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  providers: [RoadService, mapService],
  bootstrap: [],
})
export class RoadModule {}
