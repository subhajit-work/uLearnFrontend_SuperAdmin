import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExamTrackingPageRoutingModule } from './exam-tracking-routing.module';

import { ExamTrackingPage } from './exam-tracking.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    ExamTrackingPageRoutingModule
  ],
  declarations: [ExamTrackingPage]
})
export class ExamTrackingPageModule {}
