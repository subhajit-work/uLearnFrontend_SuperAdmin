import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLicensePageRoutingModule } from './add-license-routing.module';

import { AddLicensePage } from './add-license.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    AddLicensePageRoutingModule
  ],
  declarations: [AddLicensePage]
})
export class AddLicensePageModule {}
