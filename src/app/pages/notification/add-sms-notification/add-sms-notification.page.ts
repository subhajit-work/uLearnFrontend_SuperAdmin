import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalPage } from '../../modal/modal.page';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-add-sms-notification',
  templateUrl: './add-sms-notification.page.html',
  styleUrls: ['./add-sms-notification.page.scss'],
})
export class AddSmsNotificationPage implements OnInit {
  model: any = {};
  parms_action_name;
  parms_action_id;
  editApi;
  editForm_api;
  form_api;
  actionHeaderText;
  editLoading = false;
  allEditData;
  formLoading = false;
  templates;
  getTemplateForSMS_api;
  private formSubmitSubscribe: Subscription;
  private editDataSubscribe: Subscription;
  private templateforSMS_get :Subscription;
  private templateTagsGet :Subscription;
  cities = [
    {
        id: 1,
        name: 'Vilnius',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
    { id: 2, name: 'Kaunas', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15' },
    {
        id: 3,
        name: 'Pavilnys',
        avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15'
    },
    {
        id: 4,
        name: 'Siauliai',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
  ];
  headerIds = [
    {id: 1, name: 'DLT ID'},
  ];
  setDefaults = [
    {id: 0, name: 'Not Default'},
    {id: 1, name: 'Default'},
  ];
  selectFieldVariable;
  
  selectedCity = this.cities[0].name;
  selectedHeader = this.headerIds[0].name;
  selectedType = this.setDefaults[0].name;
  constructor(
    public toastController: ToastController,
    private modalController : ModalController,
    private http : HttpClient,
    private commonUtils: CommonUtils, // common functionlity come here
     private router: Router,
    private activatedRoute : ActivatedRoute,
  ) { }

  ngOnInit() {
    this.commonFunction();
  }
  // getTemplatefor start
  getTemplatefor(){
    console.log("HHH");
    this.templateforSMS_get = this.http.get(this.getTemplateForSMS_api).subscribe(
        (res:any) => {
          console.log("Get template for  >", res[0].etAction); 
          console.log("Get template for length",res.length);
          this.templates = res; 
          console.log("Get template for length",this.templates);

        },
        errRes => {
           console.log("Get template for  >", errRes);  
        }
      );
    
  }
  // getTemplatefor end

  // commonFunction start 
  commonFunction(){
    // get active url name
    this.commonUtils.getPathNameFun(this.router.url.split('/')[1]);
    let x = this.commonUtils.getPathNameFun(this.router.url.split('/')[1])
    console.log(this.router.url);
    this.parms_action_name = this.activatedRoute.snapshot.paramMap.get('action');
    this.parms_action_id = this.activatedRoute.snapshot.paramMap.get('id');

    console.log('parms_action_name', this.parms_action_name);
    console.log('parms_action_id', this.parms_action_id);
     this.getTemplateForSMS_api = 'smsTemplate/smsFor/list';
    this.getTemplatefor();
    // edit api
    if(this.parms_action_name == 'edit'){
      this.editApi = 'smsTemplate/list/'+this.parms_action_id;

      // init call
      this.init();

      this.editForm_api = 'smsTemplate/update/'+this.parms_action_id;
    }

    // form_api Api
    this.form_api = 'smsTemplate/add';
  }
  // commonFunction end

  // ---------- init start ----------
  init(){
    if( this.parms_action_name == 'edit'){
      

      this.editLoading = true;

      //edit data call
      this.editDataSubscribe = this.http.get(this.editApi).subscribe(
        (res:any) => {
          console.log("stAction >", res.stAction,this.templates);   
          
          this.editLoading = false;
          console.log("Edit data  res >", res.return_data);
          this.model = {
            stAction : res.stAction,
            stName : res.stName,
            stTempId : res.stTempId,
            setDefault : res.setDefault,
            isPrimary:res.isPrimary,
            stBody:res.stBody,
            stType:res.stType,
          }; 
          
          this.getTags(res.stAction);
          

          // edit data
          this.allEditData = res;
          console.log('this.allEditData', this.allEditData);
          
        },
        errRes => {
          // this.selectLoadingDepend = false;
          this.editLoading = false;
        }
      );

    }else{
      this.actionHeaderText = 'Add';
    }
  }
  // ---------- init end ----------

  // --------on submit start----------
  onSubmitForm(form:NgForm)
  {
    this.formLoading = true;
    let formValue = form.value;
    console.log(form.value);
    // / get form value
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
    if(this.parms_action_name == 'edit'){
      this.formSubmitSubscribe = this.http.put(this.editForm_api, form.value).subscribe(
        (response:any) => {
          this.formLoading = false;
          console.log("add form response >", response);
  
          if(response.status == 200){
            this.commonUtils.presentToast('success', response.message);
            this.router.navigateByUrl('/sms-notification-list');
            form.reset();
          }else {
            this.commonUtils.presentToast('error', response.message);
          }
        },
        errRes => {
          this.formLoading = false;
          console.log("errRes",errRes)
        }
      );
    }
    else if(this.parms_action_name == 'add'){
      this.formSubmitSubscribe = this.http.post(this.form_api, form.value).subscribe(
        (response:any) => {
          this.formLoading = false;
          console.log("add form response >", response);
  
          if(response.status == 200){
            this.commonUtils.presentToast('success', response.message);
            this.router.navigateByUrl('/sms-notification-list');
            form.reset();
          }else {
            this.commonUtils.presentToast('error', response.message);
          }
        },
        errRes => {
          this.formLoading = false;
        }
      );
    }
  }
  // on submit end

  // AddTemplate start
  async AddSmsTemplate(_identifier, _item, _items) {
    // console.log('_identifier >>', _identifier);
    let changePassword_modal;
    changePassword_modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'mymodalClass small',
      componentProps: { 
        identifier: _identifier,
        modalForm_item: _item,
        modalForm_array: _items
      }
    });
    
    // modal data back to Component
    changePassword_modal.onDidDismiss()
    .then((getdata) => {
      console.log('getdata >>>>>>>>>>>', getdata);
      // this.presentToast('Package End', 'success');
      if(getdata.data == 'submitClose'){
        /* this.onListData(this.listing_url, this.displayRecord, this.pageNo, this.api_parms, this.searchTerm, this.cherecterSearchTerm, this.sortColumnName, this.sortOrderName, this.advanceSearchParms, this.urlIdentifire);  */
      }

    });

    return await changePassword_modal.present();
  }
  // AddTemplate end
  // choseHeader start
  async choseHeader(_identifier, _item, _items) {
    console.log('_identifier >>', _identifier);
    let changePassword_modal;
    changePassword_modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'mymodalClass small',
      componentProps: { 
        identifier: _identifier,
        modalForm_item: _item,
        modalForm_array: _items
      }
    });
    
    // modal data back to Component
    changePassword_modal.onDidDismiss()
    .then((getdata) => {
      console.log('getdata >>>>>>>>>>>', getdata);
      // this.presentToast('Package End', 'success');
      if(getdata.data == 'submitClose'){
        /* this.onListData(this.listing_url, this.displayRecord, this.pageNo, this.api_parms, this.searchTerm, this.cherecterSearchTerm, this.sortColumnName, this.sortOrderName, this.advanceSearchParms, this.urlIdentifire);  */
      }

    });

    return await changePassword_modal.present();
  }
  // choseHeader end
  // addSmsDefault start
  async addSmsDefault(_identifier, _item, _items) {
    console.log('_identifier >>', _identifier);
    let changePassword_modal;
    changePassword_modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'mymodalClass small',
      componentProps: { 
        identifier: _identifier,
        modalForm_item: _item,
        modalForm_array: _items
      }
    });
    
    // modal data back to Component
    changePassword_modal.onDidDismiss()
    .then((getdata) => {
      console.log('getdata >>>>>>>>>>>', getdata);
      // this.presentToast('Package End', 'success');
      if(getdata.data == 'submitClose'){
        /* this.onListData(this.listing_url, this.displayRecord, this.pageNo, this.api_parms, this.searchTerm, this.cherecterSearchTerm, this.sortColumnName, this.sortOrderName, this.advanceSearchParms, this.urlIdentifire);  */
      }

    });

    return await changePassword_modal.present();
  }
  // addSmsDefault end 

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your data have been saved.',
      duration: 2000,
      cssClass:"my-tost-custom-classsuccess",
    });
    toast.present();
  }

  // Get selectFieldForMsg start
  selectFieldForMsg(_value){
    console.log('_value', _value);

    if(!this.model.stBody){
      this.model.stBody = _value;
    }else{
      this.model.stBody = this.postionBeforeValue + _value + this.postionAfterValue;
    }
    
    console.log('this.model.stBody', this.model.stBody);
    
  }
  // Get selectFieldForMsg end

  // getCursorPosition start
  postionBeforeValue;
  postionAfterValue;
  getCursorPosition(oField, _value) {
    console.log('_value', _value);
    
    
    if (oField.selectionStart || oField.selectionStart == '0') {

      console.log('oField.selectionStart', oField.selectionStart);

      this.postionBeforeValue = _value.slice(0,oField.selectionStart);
      this.postionAfterValue = _value.slice(oField.selectionStart);
        
      console.log('postionBeforeValue', this.postionBeforeValue);
      console.log('postionAfterValue', this.postionAfterValue);
    }
  }
  // getCursorPosition end

  // get tags start
  getTags(_action){
    console.log('_action', _action);
    this.selectFieldVariable = '';
    this.templateTagsGet = this.http.get('smsTemplate/getTags/'+_action).subscribe(
      (res:any) => {
        console.log('res', res);
        this.selectFieldVariable = res;

      },
      errRes => {
         console.log("Get tags >", errRes);  
         this.selectFieldVariable = '';
      }
    );
  }
  // get tags end

  // ----------- destroy subscription start ---------
  ngOnDestroy() {
    if(this.formSubmitSubscribe !== undefined){
      this.formSubmitSubscribe.unsubscribe();
    }
    if(this.editDataSubscribe !== undefined ){
      this.editDataSubscribe.unsubscribe();
    }
    if(this.templateforSMS_get !== undefined ){
      this.templateforSMS_get.unsubscribe();
    }
    if(this.templateTagsGet !== undefined ){
      this.templateTagsGet.unsubscribe();
    }
  }
  // destroy subscription end
}
