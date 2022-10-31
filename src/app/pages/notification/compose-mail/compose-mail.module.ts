import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComposeMailPageRoutingModule } from './compose-mail-routing.module';

import { ComposeMailPage } from './compose-mail.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    ComposeMailPageRoutingModule
  ],
  declarations: [ComposeMailPage]
})
export class ComposeMailPageModule {}
