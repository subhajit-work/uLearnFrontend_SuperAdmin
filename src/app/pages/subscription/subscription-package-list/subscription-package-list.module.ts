import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriptionPackageListPageRoutingModule } from './subscription-package-list-routing.module';

import { SubscriptionPackageListPage } from './subscription-package-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule, //Share module import
    SubscriptionPackageListPageRoutingModule
  ],
  declarations: [SubscriptionPackageListPage]
})
export class SubscriptionPackageListPageModule {}
