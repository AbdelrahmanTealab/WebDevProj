import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {HttpClientModule} from "@angular/common/http";
import {HTTP} from "@ionic-native/http/ngx";
import { AddingPageModule } from './adding/adding.module';
import { Keyboard } from '@ionic-native/keyboard/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule,AddingPageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },HTTP,Keyboard],
  bootstrap: [AppComponent],
})
export class AppModule {}
