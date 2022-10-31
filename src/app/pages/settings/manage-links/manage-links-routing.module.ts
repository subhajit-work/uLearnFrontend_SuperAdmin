import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageLinksPage } from './manage-links.page';

const routes: Routes = [
  {
    path: '',
    component: ManageLinksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageLinksPageRoutingModule {}
