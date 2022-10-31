import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmsNotificationListPageRoutingModule } from './sms-notification-list-routing.module';

import { SmsNotificationListPage } from './sms-notification-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    SmsNotificationListPageRoutingModule
  ],
  declarations: [SmsNotificationListPage]
})
export class SmsNotificationListPageModule {}
