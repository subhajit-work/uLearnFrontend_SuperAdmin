import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSecurityPage } from './add-security.page';

const routes: Routes = [
  {
    path: '',
    component: AddSecurityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSecurityPageRoutingModule {}
