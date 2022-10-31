import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSmsNotificationPage } from './add-sms-notification.page';

const routes: Routes = [
  {
    path: '',
    component: AddSmsNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSmsNotificationPageRoutingModule {}
