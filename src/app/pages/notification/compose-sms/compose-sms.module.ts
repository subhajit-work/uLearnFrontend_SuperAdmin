import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComposeSmsPageRoutingModule } from './compose-sms-routing.module';

import { ComposeSmsPage } from './compose-sms.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    ComposeSmsPageRoutingModule
  ],
  declarations: [ComposeSmsPage]
})
export class ComposeSmsPageModule {}
