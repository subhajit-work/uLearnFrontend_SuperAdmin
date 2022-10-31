import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComposeMailPage } from './compose-mail.page';

const routes: Routes = [
  {
    path: '',
    component: ComposeMailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComposeMailPageRoutingModule {}
