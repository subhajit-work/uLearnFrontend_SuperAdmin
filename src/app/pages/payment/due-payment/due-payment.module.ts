import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DuePaymentPageRoutingModule } from './due-payment-routing.module';

import { DuePaymentPage } from './due-payment.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    DuePaymentPageRoutingModule
  ],
  declarations: [DuePaymentPage]
})
export class DuePaymentPageModule {}
