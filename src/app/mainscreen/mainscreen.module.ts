import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainscreenPageRoutingModule } from './mainscreen-routing.module';

import { MainscreenPage } from './mainscreen.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainscreenPageRoutingModule,
    Ng2SearchPipeModule
    ],
  declarations: [MainscreenPage]
})
export class MainscreenPageModule {}
