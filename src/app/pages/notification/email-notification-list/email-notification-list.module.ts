import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailNotificationListPageRoutingModule } from './email-notification-list-routing.module';

import { EmailNotificationListPage } from './email-notification-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    EmailNotificationListPageRoutingModule
  ],
  declarations: [EmailNotificationListPage]
})
export class EmailNotificationListPageModule {}
