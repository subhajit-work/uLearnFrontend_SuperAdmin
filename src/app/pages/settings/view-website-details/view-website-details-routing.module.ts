import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewWebsiteDetailsPage } from './view-website-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewWebsiteDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewWebsiteDetailsPageRoutingModule {}
