import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingListPageRoutingModule } from './tracking-list-routing.module';

import { TrackingListPage } from './tracking-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    TrackingListPageRoutingModule
  ],
  declarations: [TrackingListPage]
})
export class TrackingListPageModule {}
