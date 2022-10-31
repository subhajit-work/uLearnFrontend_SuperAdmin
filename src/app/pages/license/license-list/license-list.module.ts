import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicenseListPageRoutingModule } from './license-list-routing.module';

import { LicenseListPage } from './license-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    LicenseListPageRoutingModule
  ],
  declarations: [LicenseListPage]
})
export class LicenseListPageModule {}
