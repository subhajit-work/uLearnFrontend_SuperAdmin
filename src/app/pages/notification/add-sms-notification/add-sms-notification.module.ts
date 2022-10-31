import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSmsNotificationPageRoutingModule } from './add-sms-notification-routing.module';

import { AddSmsNotificationPage } from './add-sms-notification.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    AddSmsNotificationPageRoutingModule
  ],
  declarations: [AddSmsNotificationPage]
})
export class AddSmsNotificationPageModule {}
