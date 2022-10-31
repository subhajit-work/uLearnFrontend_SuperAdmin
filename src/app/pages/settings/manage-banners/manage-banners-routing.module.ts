import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageBannersPage } from './manage-banners.page';

const routes: Routes = [
  {
    path: '',
    component: ManageBannersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageBannersPageRoutingModule {}
