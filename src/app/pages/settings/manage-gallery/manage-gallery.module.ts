import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageGalleryPageRoutingModule } from './manage-gallery-routing.module';

import { ManageGalleryPage } from './manage-gallery.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    ManageGalleryPageRoutingModule
  ],
  declarations: [ManageGalleryPage]
})
export class ManageGalleryPageModule {}
