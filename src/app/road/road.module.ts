import { PictureDetailComponent } from './picture-detail/picture-detail.component';
import { AuthGuard } from './../auth/shared/auth.guard';
import { RoadComponent } from './road.component';
import { RoadDetailComponent } from './road-detail/road-detail.component';
import { RoadListComponent } from './road-listings/road-listings.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoadService } from './shared/road.service';
import { GoogleMapsModule } from '@angular/google-maps';

const routes: Routes = [
  {
    path: 'roads',
    component: RoadComponent,
    children: [
      { path: '', component: RoadListComponent },
      {
        path: ':roadId',
        component: RoadDetailComponent,
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
    RoadListComponent,
    RoadDetailComponent,
    RoadComponent,
    PictureDetailComponent,
  ],
  //DEBUG
  // imports: [RouterModule.forChild(routes), CommonModule],
  imports: [RouterModule.forChild(routes), CommonModule, GoogleMapsModule],
  providers: [RoadService],
  bootstrap: [],
})
export class RoadModule {}
