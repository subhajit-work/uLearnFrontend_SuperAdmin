import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PackageTrackingListPage } from './package-tracking-list.page';

const routes: Routes = [
  {
    path: '',
    component: PackageTrackingListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackageTrackingListPageRoutingModule {}
