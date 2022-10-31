import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurityListPage } from './security-list.page';

const routes: Routes = [
  {
    path: '',
    component: SecurityListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityListPageRoutingModule {}
