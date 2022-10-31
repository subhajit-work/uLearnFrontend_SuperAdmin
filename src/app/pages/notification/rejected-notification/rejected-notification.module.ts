import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RejectedNotificationPageRoutingModule } from './rejected-notification-routing.module';

import { RejectedNotificationPage } from './rejected-notification.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    RejectedNotificationPageRoutingModule
  ],
  declarations: [RejectedNotificationPage]
})
export class RejectedNotificationPageModule {}
