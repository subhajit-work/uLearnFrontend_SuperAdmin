import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceivedMailPage } from './received-mail.page';

const routes: Routes = [
  {
    path: '',
    component: ReceivedMailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceivedMailPageRoutingModule {}
