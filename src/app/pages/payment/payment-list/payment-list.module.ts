import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentListPageRoutingModule } from './payment-list-routing.module';

import { PaymentListPage } from './payment-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    PaymentListPageRoutingModule
  ],
  declarations: [PaymentListPage]
})
export class PaymentListPageModule {}
