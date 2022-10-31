import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLinksPageRoutingModule } from './add-links-routing.module';

import { AddLinksPage } from './add-links.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    AddLinksPageRoutingModule
  ],
  declarations: [AddLinksPage]
})
export class AddLinksPageModule {}
