import { RoadModule } from './road/road.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'roads', pathMatch: 'full' },
  // { path: 'detail', component: RoadDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RoadModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
