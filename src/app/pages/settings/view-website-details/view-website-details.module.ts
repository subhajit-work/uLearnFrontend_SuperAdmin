import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewWebsiteDetailsPageRoutingModule } from './view-website-details-routing.module';

import { ViewWebsiteDetailsPage } from './view-website-details.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    ViewWebsiteDetailsPageRoutingModule
  ],
  declarations: [ViewWebsiteDetailsPage]
})
export class ViewWebsiteDetailsPageModule {}
