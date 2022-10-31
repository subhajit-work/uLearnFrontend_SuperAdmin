import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamTrackingPage } from './exam-tracking.page';

const routes: Routes = [
  {
    path: '',
    component: ExamTrackingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamTrackingPageRoutingModule {}
