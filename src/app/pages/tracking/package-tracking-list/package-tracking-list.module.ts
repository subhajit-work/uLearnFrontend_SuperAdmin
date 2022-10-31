import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PackageTrackingListPageRoutingModule } from './package-tracking-list-routing.module';

import { PackageTrackingListPage } from './package-tracking-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    PackageTrackingListPageRoutingModule
  ],
  declarations: [PackageTrackingListPage]
})
export class PackageTrackingListPageModule {}
