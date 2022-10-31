import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmsNotificationListPage } from './sms-notification-list.page';

const routes: Routes = [
  {
    path: '',
    component: SmsNotificationListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsNotificationListPageRoutingModule {}
