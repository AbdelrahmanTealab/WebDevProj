import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddingPage } from './adding.page';

const routes: Routes = [
  {
    path: '',
    component: AddingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddingPageRoutingModule {}
