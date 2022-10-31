import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddWebsiteDetailsPage } from './add-website-details.page';

const routes: Routes = [
  {
    path: '',
    component: AddWebsiteDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddWebsiteDetailsPageRoutingModule {}
