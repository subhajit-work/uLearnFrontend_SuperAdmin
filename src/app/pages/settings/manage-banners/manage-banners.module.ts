import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageBannersPageRoutingModule } from './manage-banners-routing.module';

import { ManageBannersPage } from './manage-banners.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    ManageBannersPageRoutingModule
  ],
  declarations: [ManageBannersPage]
})
export class ManageBannersPageModule {}
