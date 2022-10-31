import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DuePaymentPage } from './due-payment.page';

const routes: Routes = [
  {
    path: '',
    component: DuePaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DuePaymentPageRoutingModule {}
