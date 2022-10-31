import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SentMailPage } from './sent-mail.page';

const routes: Routes = [
  {
    path: '',
    component: SentMailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SentMailPageRoutingModule {}
