import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBannersPageRoutingModule } from './add-banners-routing.module';

import { AddBannersPage } from './add-banners.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    AddBannersPageRoutingModule
  ],
  declarations: [AddBannersPage]
})
export class AddBannersPageModule {}
