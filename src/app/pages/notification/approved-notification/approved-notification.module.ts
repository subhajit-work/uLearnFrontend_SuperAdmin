import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApprovedNotificationPageRoutingModule } from './approved-notification-routing.module';

import { ApprovedNotificationPage } from './approved-notification.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    ApprovedNotificationPageRoutingModule
  ],
  declarations: [ApprovedNotificationPage]
})
export class ApprovedNotificationPageModule {}
