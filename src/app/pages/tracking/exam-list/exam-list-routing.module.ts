import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamListPage } from './exam-list.page';

const routes: Routes = [
  {
    path: '',
    component: ExamListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamListPageRoutingModule {}
