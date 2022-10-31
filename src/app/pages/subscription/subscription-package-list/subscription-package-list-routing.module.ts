import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionPackageListPage } from './subscription-package-list.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionPackageListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionPackageListPageRoutingModule {}
