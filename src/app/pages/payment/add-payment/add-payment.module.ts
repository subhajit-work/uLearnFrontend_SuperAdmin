import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPaymentPageRoutingModule } from './add-payment-routing.module';

import { AddPaymentPage } from './add-payment.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    AddPaymentPageRoutingModule
  ],
  declarations: [AddPaymentPage]
})
export class AddPaymentPageModule {}
