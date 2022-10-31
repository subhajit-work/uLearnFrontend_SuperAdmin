import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RejectedNotificationPage } from './rejected-notification.page';

const routes: Routes = [
  {
    path: '',
    component: RejectedNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RejectedNotificationPageRoutingModule {}
