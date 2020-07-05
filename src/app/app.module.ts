import { NavbarComponent } from './common/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
