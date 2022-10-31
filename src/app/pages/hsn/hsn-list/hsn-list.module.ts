import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HsnListPageRoutingModule } from './hsn-list-routing.module';

import { HsnListPage } from './hsn-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    HsnListPageRoutingModule
  ],
  declarations: [HsnListPage]
})
export class HsnListPageModule {}
