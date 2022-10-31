import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PackageTrackingPageRoutingModule } from './package-tracking-routing.module';

import { PackageTrackingPage } from './package-tracking.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    PackageTrackingPageRoutingModule
  ],
  declarations: [PackageTrackingPage]
})
export class PackageTrackingPageModule {}
