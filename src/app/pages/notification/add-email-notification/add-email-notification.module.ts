import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEmailNotificationPageRoutingModule } from './add-email-notification-routing.module';

import { AddEmailNotificationPage } from './add-email-notification.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    AddEmailNotificationPageRoutingModule
  ],
  declarations: [AddEmailNotificationPage]
})
export class AddEmailNotificationPageModule {}
