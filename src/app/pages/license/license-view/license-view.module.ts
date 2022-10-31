import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicenseViewPageRoutingModule } from './license-view-routing.module';

import { LicenseViewPage } from './license-view.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    LicenseViewPageRoutingModule
  ],
  declarations: [LicenseViewPage]
})
export class LicenseViewPageModule {}
