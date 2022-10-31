import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLinksPage } from './add-links.page';

const routes: Routes = [
  {
    path: '',
    component: AddLinksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddLinksPageRoutingModule {}
