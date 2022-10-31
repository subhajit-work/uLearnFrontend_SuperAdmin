import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PackageDetailsPageRoutingModule } from './package-details-routing.module';

import { PackageDetailsPage } from './package-details.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    PackageDetailsPageRoutingModule
  ],
  declarations: [PackageDetailsPage]
})
export class PackageDetailsPageModule {}
