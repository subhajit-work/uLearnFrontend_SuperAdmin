import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddWebsiteDetailsPageRoutingModule } from './add-website-details-routing.module';

import { AddWebsiteDetailsPage } from './add-website-details.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    AddWebsiteDetailsPageRoutingModule
  ],
  declarations: [AddWebsiteDetailsPage]
})
export class AddWebsiteDetailsPageModule {}
