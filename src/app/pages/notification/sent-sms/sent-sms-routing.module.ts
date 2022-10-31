import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SentSmsPage } from './sent-sms.page';

const routes: Routes = [
  {
    path: '',
    component: SentSmsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SentSmsPageRoutingModule {}
