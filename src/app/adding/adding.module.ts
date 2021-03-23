import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddingPageRoutingModule } from './adding-routing.module';

import { AddingPage } from './adding.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddingPageRoutingModule
  ],
  declarations: [AddingPage]
})
export class AddingPageModule {}
