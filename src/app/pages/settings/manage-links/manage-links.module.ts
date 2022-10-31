import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageLinksPageRoutingModule } from './manage-links-routing.module';

import { ManageLinksPage } from './manage-links.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    ManageLinksPageRoutingModule
  ],
  declarations: [ManageLinksPage]
})
export class ManageLinksPageModule {}
