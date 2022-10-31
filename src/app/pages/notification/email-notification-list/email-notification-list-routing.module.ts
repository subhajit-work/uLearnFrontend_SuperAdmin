import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailNotificationListPage } from './email-notification-list.page';

const routes: Routes = [
  {
    path: '',
    component: EmailNotificationListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailNotificationListPageRoutingModule {}
