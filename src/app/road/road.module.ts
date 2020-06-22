import { AuthGuard } from './../auth/shared/auth.guard';
import { RoadComponent } from './road.component';
import { RoadDetailComponent } from './road-detail/road-detail.component';
import { RoadListComponent } from './road-listings/road-listings.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoadService } from './shared/road.service';

const routes: Routes = [
  {
    path: 'roads',
    component: RoadComponent,
    children: [
      { path: '', component: RoadListComponent },
      //{ path: 'detail/:roadId', component: RoadDetailComponent },
      {
        path: ':roadId',
        component: RoadDetailComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [RoadListComponent, RoadDetailComponent, RoadComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
  providers: [RoadService],
  bootstrap: [],
})
export class RoadModule {}
