import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingViewPage } from './tracking-view.page';

const routes: Routes = [
  {
    path: '',
    component: TrackingViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingViewPageRoutingModule {}
