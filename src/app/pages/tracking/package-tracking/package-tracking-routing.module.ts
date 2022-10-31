import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PackageTrackingPage } from './package-tracking.page';

const routes: Routes = [
  {
    path: '',
    component: PackageTrackingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackageTrackingPageRoutingModule {}
