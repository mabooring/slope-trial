import { RoadModule } from './road/road.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [{ path: '', redirectTo: 'roads', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes), RoadModule, AuthModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
