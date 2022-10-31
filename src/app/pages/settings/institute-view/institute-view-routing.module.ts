import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstituteViewPage } from './institute-view.page';

const routes: Routes = [
  {
    path: '',
    component: InstituteViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstituteViewPageRoutingModule {}
