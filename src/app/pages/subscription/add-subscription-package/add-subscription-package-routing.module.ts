import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSubscriptionPackagePage } from './add-subscription-package.page';

const routes: Routes = [
  {
    path: '',
    component: AddSubscriptionPackagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSubscriptionPackagePageRoutingModule {}
