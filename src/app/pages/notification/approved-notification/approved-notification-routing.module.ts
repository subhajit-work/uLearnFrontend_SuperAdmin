import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovedNotificationPage } from './approved-notification.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovedNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovedNotificationPageRoutingModule {}
