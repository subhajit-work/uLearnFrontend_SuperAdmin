import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicenseViewPage } from './license-view.page';

const routes: Routes = [
  {
    path: '',
    component: LicenseViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicenseViewPageRoutingModule {}
