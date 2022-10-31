import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageWebsitePage } from './manage-website.page';

const routes: Routes = [
  {
    path: '',
    component: ManageWebsitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageWebsitePageRoutingModule {}
