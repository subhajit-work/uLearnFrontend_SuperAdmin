import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingViewPageRoutingModule } from './tracking-view-routing.module';

import { TrackingViewPage } from './tracking-view.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    TrackingViewPageRoutingModule
  ],
  declarations: [TrackingViewPage]
})
export class TrackingViewPageModule {}
