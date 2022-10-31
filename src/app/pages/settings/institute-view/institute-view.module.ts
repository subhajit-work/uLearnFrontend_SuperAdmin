import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstituteViewPageRoutingModule } from './institute-view-routing.module';

import { InstituteViewPage } from './institute-view.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    InstituteViewPageRoutingModule
  ],
  declarations: [InstituteViewPage]
})
export class InstituteViewPageModule {}
