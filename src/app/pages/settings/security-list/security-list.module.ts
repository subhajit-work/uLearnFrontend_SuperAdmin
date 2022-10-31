import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecurityListPageRoutingModule } from './security-list-routing.module';

import { SecurityListPage } from './security-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    SecurityListPageRoutingModule
  ],
  declarations: [SecurityListPage]
})
export class SecurityListPageModule {}
