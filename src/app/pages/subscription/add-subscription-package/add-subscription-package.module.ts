import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSubscriptionPackagePageRoutingModule } from './add-subscription-package-routing.module';

import { AddSubscriptionPackagePage } from './add-subscription-package.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    AddSubscriptionPackagePageRoutingModule
  ],
  declarations: [AddSubscriptionPackagePage]
})
export class AddSubscriptionPackagePageModule {}
