import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SentSmsPageRoutingModule } from './sent-sms-routing.module';

import { SentSmsPage } from './sent-sms.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    SentSmsPageRoutingModule
  ],
  declarations: [SentSmsPage]
})
export class SentSmsPageModule {}
