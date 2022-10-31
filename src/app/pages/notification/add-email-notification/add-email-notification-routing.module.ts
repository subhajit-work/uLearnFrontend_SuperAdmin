import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEmailNotificationPage } from './add-email-notification.page';

const routes: Routes = [
  {
    path: '',
    component: AddEmailNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEmailNotificationPageRoutingModule {}
