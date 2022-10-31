import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBannersPage } from './add-banners.page';

const routes: Routes = [
  {
    path: '',
    component: AddBannersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBannersPageRoutingModule {}
