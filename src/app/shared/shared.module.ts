import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonHeaderComponent } from '../common-component/common-header/common-header.component';
// Material module start
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
// Material module end
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select'; // angular dropdown
import { CommonFooterComponent } from '../common-component/common-footer/common-footer.component';
import { NgxTinymceModule } from 'ngx-tinymce';
import { IonicModule } from '@ionic/angular';
import { NgxGaugeModule } from 'ngx-gauge';
import { SafeHtmlPipe } from '../pipe/safe-html.pipe';
import { MustMatchDirective } from '../directives/must-match.directive';
import { EditorModule } from '@tinymce/tinymce-angular';
@NgModule({
  declarations: [
    CommonHeaderComponent, //header component share
    CommonFooterComponent, //footer component share
    SafeHtmlPipe,
    MustMatchDirective
  ],
  imports: [
    CommonModule,
    IonicModule,
    // Material module start
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatButtonModule,
    MatRippleModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    // Material module end
    NgApexchartsModule,
    NgxGaugeModule,
    NgSelectModule, // angular dropdown
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.0/',
    }),
    EditorModule
  ],
  exports: [
    CommonHeaderComponent, //header component share
    CommonFooterComponent, //footer component share
    // Material module start
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatButtonModule,
    MatRippleModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    // Material module end
    NgApexchartsModule,
    NgxGaugeModule,
    NgSelectModule, // angular dropdown
    NgxTinymceModule,
    SafeHtmlPipe,
    MustMatchDirective,
    EditorModule
  ]
})
export class SharedModule { }
