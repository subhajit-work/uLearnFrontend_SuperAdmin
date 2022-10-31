import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceivedMailPageRoutingModule } from './received-mail-routing.module';

import { ReceivedMailPage } from './received-mail.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    ReceivedMailPageRoutingModule
  ],
  declarations: [ReceivedMailPage]
})
export class ReceivedMailPageModule {}
