import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLicensePage } from './add-license.page';

const routes: Routes = [
  {
    path: '',
    component: AddLicensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddLicensePageRoutingModule {}
