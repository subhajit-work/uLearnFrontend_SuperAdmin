import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComposeSmsPage } from './compose-sms.page';

const routes: Routes = [
  {
    path: '',
    component: ComposeSmsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComposeSmsPageRoutingModule {}
