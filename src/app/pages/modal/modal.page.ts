import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  // Variable start
  main_url = environment.apiUrl;
  file_url = environment.fileUrl;
  get_identifier;
  get_item;
  get_array;
  heder_title;
  api_url;
  hide = true;
  hide2 = true;
  hide3 = true;
  model: any = {};
  Validity = [
    {value: 'Years', viewValue: 'Years'},
    {value: 'Months', viewValue: 'Months'},
    {value: 'Days', viewValue: 'Days'},
  ];
  viewLoadData;
  listing_view_url;
  viewData;
  form_api;


  private dashboardDataSubscribe: Subscription;
  private formSubmitSubscribe: Subscription;


  constructor(
    private navParams : NavParams,
    private modalController : ModalController,
    private http : HttpClient,
    private authService:AuthService,
    private router:Router,
    private commonUtils: CommonUtils, // common functionlity come here
  ) { }

  ngOnInit() {
    this.get_identifier =  this.navParams.get('identifier');
    this.get_item =  this.navParams.get('modalForm_item');
    this.get_array =  this.navParams.get('modalForm_array');

    console.log('get_identifier', this.get_identifier);
    console.log('get_item', this.get_item);
    console.log('get_array', this.get_array);

    if(this.get_identifier == 'suspend_package_modal') {
      this.heder_title = 'Package Suspend';
      this.form_api = 'package/suspended/'+this.get_item;
    } else if(this.get_identifier == 'restore_package_modal'){
      this.heder_title = 'Package Restore';
    } else if(this.get_identifier == 'end_package_modal'){
      this.heder_title = 'Package End';
    } else if(this.get_identifier == 'restore_licence_modal'){
      this.heder_title = 'Licence Restore';
    } else if(this.get_identifier == 'end_licence_modal'){
      this.heder_title = 'Licence  Expiry';
    } else if(this.get_identifier == 'renew_licence_modal'){
      this.heder_title = 'Licence  Renewal';
    } else if(this.get_identifier == 'suspend_licence_modal'){
      this.heder_title = 'Licence  Suspension';
      this.form_api = 'license/suspend/'+this.get_item;
    } else if(this.get_identifier == 'extend_licence_modal'){
      this.heder_title = 'Licence  Extension';
    } else if(this.get_identifier == 'changepassword_modal'){
      this.heder_title = 'Change Your Password';
      this.form_api = 'login/changePassword';
    } else if(this.get_identifier == 'AddTemplate_modal'){
      this.heder_title = 'Add Template For';
    } else if(this.get_identifier == 'AddDefault_modal'){
      this.heder_title = 'Add Set Default';
    } else if(this.get_identifier == 'AddSmsTemplate_modal'){
      this.heder_title = 'Add Template For';
    } else if(this.get_identifier == 'choseHeader_modal'){
      this.heder_title = 'Add Header Id';
    } else if(this.get_identifier == 'add_Sms_default_modal'){
      this.heder_title = 'Add Set Default';
    }
  }

  // ================== view data fetch start =====================
  viewPageData(){
    console.log();
    this.viewLoadData = true;
    this.dashboardDataSubscribe = this.http.post(this.listing_view_url,'').subscribe(
      (res:any) => {
        this.viewLoadData = false;
        console.log("view data  res -------------------->", res);
          this.viewData = res;
      },
      errRes => {
        this.viewLoadData = false;
      }
    );
  }
  // view data fetch end

  // =================== Form submit start =======================
  // for License Suspension start
  formLoading = false;
  apiForEmail;
  apiForPhone;
  apiForRole;
  onSubmitForm(form:NgForm){
    console.log("add form submit >", form.value);
    this.formLoading = true;

    // get form value
    let fd = new FormData();


    for (let val in form.value) {
      if(form.value[val] == undefined){
        form.value[val] = '';
      }
      fd.append(val, form.value[val]);
    };

    console.log('value >', fd);

    if(!form.valid){
      return;
    }
      this.formSubmitSubscribe = this.http.post(this.form_api, form.value).subscribe(
      (response:any) => {
        this.formLoading = false;

        console.log("add form response >", response);

        if(response.status == 200){
          this.commonUtils.presentToast('success', response.message);
          // this.get_array.push(response);
          form.reset();
          this.modalController.dismiss('submitClose',response.status );
          
        }else{
          this.commonUtils.presentToast('warning', response.message);
        }
      },
      errRes => {
        this.formLoading = false;
      }
    );
    
    

  }
  // package Suspension start

  // package Suspension end
  // for License Suspension start
  // close modal
  closeModal() {
    // this.modalController.dismiss(this.arrayList);
    this.modalController.dismiss();
  }

  // Date format change start
  changeDateFormat(_identifier, _date){
    console.log('_date', _date);
    console.log('_identifier', _identifier);

    if(_identifier == 'licSusDate') {
      this.model.llEdate = moment(_date).format('YYYY/MM/DD');
    }else if(_identifier == 'plSusDate') {
      this.model.plAdate = moment(_date).format('YYYY/MM/DD');
    }
    console.log('model.llEdate', this.model.llEdate);
  

  }
  // Date format change end


}